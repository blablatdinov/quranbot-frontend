import axios from 'axios';
import store from '@/store';
import router from '@/router';
import { addQueryParam } from '@/utils/getPageNum';

const instance = axios.create({
  baseURL: 'http://localhost:8000/',
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
    const isAccessTokenValid = store.getters['auth/isAccessTokenValid'];
    const isRefreshTokenValid = store.getters['auth/isRefreshTokenValid'];
    if (!isAccessTokenValid && isRefreshTokenValid) {
      store.dispatch('auth/refreshToken');
    } else if (
      error.response.status === 401
      && error.response.data.detail === invalidLoginCredentialsErrorText
    ) {
      store.commit('auth/SET_LOGIN_ERRORS', ['Неверное имя пользователя или пароль']);
    } else if (error.response.status === 401) {
      let relativePath = window.location.toString().split('/').slice(3).join('/');
      relativePath = `/${relativePath}`;
      const queryParams = addQueryParam('next', relativePath);
      router.push(`/login${queryParams}`);
    }
  },
);

export default instance;
