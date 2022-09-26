import {fetchUsers} from '../../src/service/users/users.sagas';
import {Action} from '../../src/service/users/users';
import {UsersActions, UsersTypes} from '../../src/service/users';

import {call, put} from 'redux-saga/effects';
import api from '../../src/service/api';
// @ts-ignore
import * as assert from 'assert';

const action: Action<any> = {
  type: UsersTypes.GetUsers,
  payload: {
    pageNo: 1,
  },
};
const getUsersGenFun = fetchUsers(action);

describe('Redux-Saga Tests', () => {
  test('Generator function tests', async () => {
    const pageNo = action.payload.pageNo;
    const response = await api.getUsers(1);

    assert.deepEqual(
      getUsersGenFun.next().value,
      call(api.getUsers, pageNo),
      'it should wait for a users ',
    );
    assert.deepEqual(
      getUsersGenFun.next(response).value,
      put(UsersActions.addUsers(response.data)),
      'it should put response of users in redux',
    );
    assert.deepEqual(
      getUsersGenFun.next().done,
      true,
      'it should complete saga function',
    );
  });

  test('if branch test', async () => {
    const response = await api.getUsers(1);
    response.ok = false;
    response.status = 400;
    getUsersGenFun.next();
    assert.deepEqual(getUsersGenFun.next(response).done, true, 'Message');
  });
});
