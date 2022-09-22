import {createSelector} from 'reselect';

const _selectState = (state: any) => state.UsersReducer;

const getUsers = createSelector(_selectState, fstate => fstate?.users);

export default {
  getUsers,
};
