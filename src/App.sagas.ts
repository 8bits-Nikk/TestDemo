import {all} from 'redux-saga/effects';
import {UsersSagas} from './service/users';

export default function* root() {
  yield all([UsersSagas()]);
}
