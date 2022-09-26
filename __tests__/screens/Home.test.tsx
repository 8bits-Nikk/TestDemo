import React from 'react';
import {renderWithNavigatorAndRedux} from '../../helpers/renderWithNavigatorAndRedux';
import Home from '../../src/screens/Home/Home';
import {
  cleanup,
  fireEvent,
  screen,
  waitFor,
  within,
} from '@testing-library/react-native';
import {UsersActions} from '../../src/service/users';
import asyncStorage from '../../src/service/async-storage/asyncStorage';

import TestRenderer, {act} from 'react-test-renderer';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import {applyMiddleware, createStore} from 'redux';
import rootReducer from '../../src/App.reducers';
import root from '../../src/App.sagas';

import {useDispatch, useSelector} from 'react-redux';
import {Alert} from 'react-native';

const data = [
  {
    id: 2280,
    name: 'Dhanadeepa Guneta',
    email: 'guneta_dhanadeepa@bayer-schmitt.net',
    gender: 'female',
    status: 'inactive',
  },
  {
    id: 2275,
    name: 'Mani Naik Esq.',
    email: 'naik_esq_mani@bergnaum-labadie.io',
    gender: 'male',
    status: 'inactive',
  },
  {
    id: 2274,
    name: 'Vaijayanthi Mishra',
    email: 'mishra_vaijayanthi@mayert.co',
    gender: 'female',
    status: 'active',
  },
];
const mockNavigation = jest.fn();
const mockResetNavigation = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigation,
    reset: mockResetNavigation,
  }),
}));

const mockReset = jest.spyOn(asyncStorage, 'resetLoginStatus');
const mockAlert = jest.spyOn(Alert, 'alert');

describe('HomeScreen Tests', () => {
  afterEach(() => {
    cleanup();
  });

  test('Render correctly', () => {
    const tree = renderWithNavigatorAndRedux(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should render with data', () => {
    renderWithNavigatorAndRedux(<Home />, store =>
      store.dispatch(UsersActions.addUsers(data)),
    );

    const list = screen.queryByTestId('flatList-user');
    expect(list?.props.data).toBe(data);
    expect(list?.props.data.length).toBe(3);
  });

  it('Should render card with data ', () => {
    renderWithNavigatorAndRedux(<Home />, store =>
      store.dispatch(UsersActions.addUsers(data)),
    );

    const list = screen.queryByTestId('flatList-user');
    expect(list?.props.data).toBe(data);
    expect(list?.props.data.length).toBe(3);
    const card = screen?.queryAllByTestId('card-name');
    card.forEach((ele, index) => {
      expect(ele.props.children).toBe(data[index].name);

      fireEvent.press(ele);
      expect(mockNavigation).toHaveBeenCalled();
      expect(mockNavigation).toHaveBeenCalledWith('PostScreen');
    });
  });
});

describe('Async Redux Test', () => {
  beforeEach(() => {
    asyncStorage.setLoginStatus({userName: 'Test', password: '123'});
    useDispatchMock.mockClear();
    useSelectorMock.mockClear();
  });

  const reactRedux = {useDispatch, useSelector};
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');

  const mockDispatch = jest.fn();
  useSelectorMock.mockReturnValue(data);
  useDispatchMock.mockReturnValue(mockDispatch);

  test('userName test', async () => {
    const sagaMiddleware = createSagaMiddleware();
    let mockStore = createStore(rootReducer, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(root);
    mockStore.dispatch = mockDispatch;
    let tree: TestRenderer.ReactTestRenderer;
    await act(() => {
      tree = TestRenderer.create(
        <NavigationContainer>
          <Provider store={mockStore}>
            <Home />
          </Provider>
        </NavigationContainer>,
      );
    });
    const instance = within(tree!.root);
    const name = instance.queryByTestId('welcome-name');
    expect(name?.props.children).toStrictEqual(['Welcome ', 'Test']);

    expect(mockDispatch).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'GET_USERS',
      payload: {pageNo: 1},
    });
  });

  test('Logout test', async () => {
    mockReset.mockReturnValue(Promise.resolve(true));
    renderWithNavigatorAndRedux(<Home />);

    const logoutButton = screen.getByTestId('logout-btn');

    await waitFor(() => {
      fireEvent.press(logoutButton);
    });

    expect(mockReset).toHaveBeenCalled();
    expect(mockResetNavigation).toHaveBeenCalled();
    expect(mockResetNavigation).toHaveBeenCalledWith({
      routes: [{name: 'LoginScreen'}],
    });
  });
  test('Logout Error test', async () => {
    mockReset.mockReturnValue(Promise.resolve(false));
    renderWithNavigatorAndRedux(<Home />);

    const logoutButton = screen.getByTestId('logout-btn');

    await waitFor(() => {
      fireEvent.press(logoutButton);
    });

    expect(mockReset).toHaveBeenCalled();
    expect(mockAlert).toHaveBeenCalled();
    expect(mockAlert).toHaveBeenCalledWith('Error', 'Something went wrong');
  });
});
