import axios from 'axios';
import { message } from 'antd';

const Sever = axios.create({
  baseURL: '/api',
  withCredentials: true
});

Sever.interceptors.response.use(function (response) {
  const { data } = response;
  if (data.status && data.status !== 200) {
    message.error(data.message);
  }
  return response;
}, function (error) {
  message.error(error);
});

export const ping = (params) => Sever.get('/ping',{ params }).then(resp => resp.data);
export const login = (params) => Sever.post('/login', params).then(resp => resp.data);
export const register = (params) => Sever.post('/register', params).then(resp => resp.data);
