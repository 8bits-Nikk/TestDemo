import {call, put, takeLatest} from 'redux-saga/effects';
import {UsersActions} from '.';
import api from '../api';
import {Action} from './users';
import UsersTypes from './users.types';

function* fetchUsers(action: Action<any>): any {
  try {
    const pageNo = action.payload?.pageNo || 1;
    const response = yield call(api.getUsers, pageNo);
    if (response?.ok) {
      const data = response?.data;
      yield put(UsersActions.addUsers(data));
    } else {
      console.log('*GetUsers Error => ', response.status);
    }
  } catch (error) {
    console.log('*GetUsers Error => ', error);
  }
}

export default function* root() {
  yield takeLatest(UsersTypes.GetUsers, fetchUsers);
}
