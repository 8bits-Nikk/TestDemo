import asyncStorage from '../../src/service/async-storage/asyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

describe('Test async-storage', () => {
  const user = {
    userName: 'Test',
    password: 'test123',
  };

  afterEach(() => {
    AsyncStorage.clear();
    jest.clearAllMocks();
  });

  it('should return null getLoginStatus', async () => {
    const result = await asyncStorage.getLoginStatus();
    expect(AsyncStorage.getItem).toBeCalledWith('@login_status');
    expect(result).toBe(null);
  });

  it('should return user object, getLoginStatus', async () => {
    const result = await asyncStorage.setLoginStatus(user);
    expect(result).toBe(true);
    if (result) {
      const response = await asyncStorage.getLoginStatus();
      expect(response).toStrictEqual(user);
    } else {
      expect(result).toBe(false);
    }
  });

  it('should return true, setLoginStatus', async () => {
    const result = await asyncStorage.setLoginStatus(user);
    expect(AsyncStorage.setItem).toBeCalledWith(
      '@login_status',
      JSON.stringify(user),
    );
    expect(result).toBe(true);
  });

  it('should return true, addUser', async () => {
    const result = await asyncStorage.addUser(user);
    expect(result).toBe(true);
  });

  it('should return users, getUsers', async () => {
    const result = await asyncStorage.addUser(user);
    expect(AsyncStorage.getItem).toBeCalledWith('@users_info');
    expect(result).toBe(true);
    if (result) {
      const res = await asyncStorage.getUsers();
      expect(res).toStrictEqual([user]);
    }
  });

  it('should return empty Array, getUsers', async () => {
    const result = await asyncStorage.getUsers();
    expect(result).toStrictEqual([]);
  });

  it('should return true onValidation, validateUser', async () => {
    const addRes = await asyncStorage.addUser(user);
    expect(addRes).toBe(true);
    if (addRes) {
      const result = await asyncStorage.validateUser(user);
      expect(result).toBe(true);
    }
  });

  it('should return false onValidation, validateUser', async () => {
    const result = await asyncStorage.validateUser(user);
    expect(result).toBe(false);
  });

  it('should return true onReset, resetLoginStatus', async () => {
    const result = await asyncStorage.resetLoginStatus();
    expect(AsyncStorage.removeItem).toBeCalledWith('@login_status');
    expect(result).toBe(true);
  });
});
