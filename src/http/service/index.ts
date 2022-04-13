import axios from 'axios';
import Cookies from 'js-cookie';
import { USER_AUTH_COOKIE_KEY } from '../../constans';
import { HttpBaseService } from './base-service';

export class HttpService extends HttpBaseService {}

const instance = axios.create({
  baseURL: 'https://localhost:44397/api/',
});

instance.interceptors.request.use(async config => {
  if (!config.headers['Authorization']) {
    const token = Cookies.get(USER_AUTH_COOKIE_KEY);
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return config;
});

export const httpService: HttpService = new HttpService(instance);