import ApiInstance from './api';

const getUsers = (pageNo: number = 1) => {
  return ApiInstance.get(`/users?page=${pageNo}`);
};

const getUserDetails = (userId: number = 0) => {
  return ApiInstance.get(`/users/${userId}`);
};

export default {
  getUsers,
  getUserDetails,
};
