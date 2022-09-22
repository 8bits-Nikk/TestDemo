import {combineReducers} from 'redux';
import {UsersReducer} from './service/users';

const rootReducer = combineReducers({
  UsersReducer: UsersReducer,
});

export default rootReducer;
