import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

const setUserType = async () => {
  try {
    await mockAsyncStorage.setItem('@userType', 'Main');
    return true;
  } catch (e) {
    return false;
  }
};

const getUserType = async () => {
  try {
    const result = await mockAsyncStorage.getItem('@userType');
    if (result) {
      return result;
    }
    return [];
  } catch (err) {
    return [];
  }
};

const clear = async () => {
  try {
    await mockAsyncStorage.clear();
    return true;
  } catch (e) {
    return false;
  }
};

describe('checks if Async Storage is used', () => {
  it('geUserType, if result is null return Empty Array', async () => {
    const result = await getUserType();
    expect(result).toEqual([]);
  });

  it('getUserType', async () => {
    await setUserType();
    const result = await getUserType();
    expect(result).toBe('Main');
  });

  it('setUserType', async () => {
    await setUserType();
    expect(mockAsyncStorage.setItem).toBeCalledWith('@userType', 'Main');
  });

  it('clear Storage', async () => {
    await clear();
    expect(mockAsyncStorage.clear).toBeCalledWith();
  });
});
