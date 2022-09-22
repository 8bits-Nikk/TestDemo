import apisauce from 'apisauce';

const ApiInstance = apisauce.create({
  baseURL: 'https://gorest.co.in/public/v2/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default ApiInstance;
