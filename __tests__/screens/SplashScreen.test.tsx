import React from 'react';
import Splash from '../../src/screens/Splash/Splash';
import {renderWithNavigatorAndRedux} from '../../helpers/renderWithNavigatorAndRedux';
import {act, cleanup, screen} from '@testing-library/react-native';
import asyncStorage from '../../src/service/async-storage/asyncStorage';

const mockDispatch = jest.fn().mockImplementation(args => args);
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    dispatch: mockDispatch,
  }),
}));

const mockStatus = jest.spyOn(asyncStorage, 'getLoginStatus');

describe('<Splash/> test', () => {
  afterEach(() => {
    cleanup();
  });

  test('Render Correctly', () => {
    const tree = renderWithNavigatorAndRedux(<Splash />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('render Image View', () => {
    renderWithNavigatorAndRedux(<Splash />);
    const imgView = screen.queryByTestId('logo-img');
    expect(imgView?.type).toBe('Image');
    expect(imgView?.props.source).not.toBe(null);
  });
});

describe('Navigation Test', () => {
  jest.useFakeTimers();
  test('navigation to Home', () => {
    mockStatus.mockReturnValue(
      Promise.resolve({
        userName: 'Test',
        password: 'test123',
      }),
    );
    renderWithNavigatorAndRedux(<Splash />);
    act(() => {
      jest.runAllTimers();
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: {name: 'HomeScreen', params: undefined},
      type: 'REPLACE',
    });
  });

  test('navigation to Login', () => {
    mockStatus.mockReturnValue(Promise.resolve(null));
    renderWithNavigatorAndRedux(<Splash />);
    act(() => {
      jest.runAllTimers();
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: {name: 'LoginScreen', params: undefined},
      type: 'REPLACE',
    });
  });
});
