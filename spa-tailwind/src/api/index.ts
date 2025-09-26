import axios from 'axios';
import { env } from '../config';

const api = axios.create({ baseURL: env.API_BASE_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@firebase:authtoken');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

export { api };
