import api from '../../src/service/api';
import axios from 'axios';

describe('API tests', () => {
  it('Should return users', async () => {
    const response = await api.getUsers(1);

    // @ts-ignore
    const data: any[] = response.data;
    expect(response.ok).toBe(true);
    expect(response.status).toBe(200);
    expect(data.length).not.toBe(0);
  });
});

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const fetchUsersDummy = async () => {
  try {
    return await axios.get(`${BASE_URL}/users`);
  } catch (e) {
    return [];
  }
};
describe('Dummy API Test', () => {
  const mockApi = jest.spyOn(axios, 'get');
  it('should return users list', async () => {
    // given
    const users = [{name: 'Bob'}];
    const resp = [{name: 'Bob'}];

    mockApi.mockImplementationOnce(() => Promise.resolve(resp));
    // when
    const result = await fetchUsersDummy();

    // then
    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/users`);
    expect(result).toEqual(users);
  });
});
