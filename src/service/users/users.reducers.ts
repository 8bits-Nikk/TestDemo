import {Action, IUsersPayload, IUserState} from './users';
import UsersTypes from './users.types';

const initialState: IUserState = {
  users: [],
};

export default (
  state: IUserState = initialState,
  action: Action<IUsersPayload>,
) => {
  switch (action.type) {
    case UsersTypes.GetUsersSuccess:
      return {
        ...state,
        users: action.payload?.users,
      };
    default:
      return state;
  }
};
