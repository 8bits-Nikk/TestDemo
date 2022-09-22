import UsersTypes from './users.types';

const addUsers = (users: any) => ({
  type: UsersTypes.GetUsersSuccess,
  payload: {users},
});

const getUsers = (pageNo: number) => ({
  type: UsersTypes.GetUsers,
  payload: {pageNo},
});

export default {
  addUsers,
  getUsers,
};
