import {createStore} from 'redux';
import rootReducer from '../../src/App.reducers';
import {UsersActions} from '../../src/service/users';
import {waitFor} from '@testing-library/react-native';

const mockData = [
  {
    id: 1,
    email: 'test@mail.com',
    name: 'test',
    gender: 'male',
    status: 'active',
  },
];
describe('Test Redux store and action', () => {
  const mockStore = createStore(rootReducer);

  test('Test initial value', () => {
    const users = mockStore.getState().UsersReducer.users;
    expect(users).toStrictEqual([]);
  });

  test('Test add action', () => {
    waitFor(() => {
      mockStore.dispatch(UsersActions.addUsers(mockData));
    });
    const users = mockStore.getState().UsersReducer.users;
    expect(users).toBe(mockData);
  });
});
