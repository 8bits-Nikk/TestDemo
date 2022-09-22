import AsyncStorage from '@react-native-async-storage/async-storage';

const getLoginStatus = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@login_status');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    return null;
  }
};

const getUsers = async () => {
  try {
    const jsonArray = await AsyncStorage.getItem('@users_info');
    return jsonArray !== null ? JSON.parse(jsonArray) : [];
  } catch (e) {
    return [];
  }
};

const addUser = async (user: {userName: string; password: string}) => {
  try {
    const prevUsers = await getUsers();
    const json = JSON.stringify(prevUsers.concat(user));
    await AsyncStorage.setItem('@users_info', json);
    return true;
  } catch (e) {
    return false;
  }
};

const validateUser = async (user: {userName: string; password: string}) => {
  try {
    const prevUsers = await getUsers();
    return prevUsers.some(
      (value: {userName: string; password: string}) =>
        user.userName === value.userName && user.password === value.password,
    );
  } catch (e) {
    return false;
  }
};

const setLoginStatus = async (user: {userName: string; password: string}) => {
  try {
    const userString = JSON.stringify(user);
    await AsyncStorage.setItem('@login_status', userString);
    return true;
  } catch (e) {
    return false;
  }
};
const resetLoginStatus = async () => {
  try {
    const userString = JSON.stringify(null);
    await AsyncStorage.setItem('@login_status', userString);
    return true;
  } catch (e) {
    return false;
  }
};

export default {
  getLoginStatus,
  getUsers,
  addUser,
  validateUser,
  setLoginStatus,
  resetLoginStatus,
};
