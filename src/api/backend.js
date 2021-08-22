import axios from 'axios';
import store from '@/store';
import router from '@/router';

const instance = axios.create({
  baseURL: '/',
});

instance.interceptors.request.use(
  (config) => {
    const { headers } = config;
    const token = localStorage.getItem('token');
    headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const invalidLoginCredentialsErrorText = 'No active account found with the given credentials';
    if (error.response.status === 401 && error.response.data.detail === invalidLoginCredentialsErrorText) {
      store.commit('auth/SET_LOGIN_ERRORS', ['Неверное имя пользователя или пароль']);
    } else if (error.response.status === 401) {
      router.push('/login');
    }
  },
);

export default instance;
