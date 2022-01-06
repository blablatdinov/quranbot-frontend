import jwtDecode from 'jwt-decode';
import axios from '@/api/backend';
import router from '@/router';

export default {
  namespaced: true,
  state: () => ({
    loginErrors: [],
  }),
  mutations: {
    SET_LOGIN_ERRORS(state, errors) {
      state.loginErrors = errors;
    },
  },
  actions: {
    login(_, data) {
      axios
        .post('/api/v1/token/', data)
        .then((response) => {
          localStorage.setItem('refreshToken', response.data.refresh);
          localStorage.setItem('token', response.data.access);
          const path = new URL(window.location).search.slice(1).replaceAll('next=', '');
          router.push(path);
        })
        .catch(() => {});
    },
    logout() {
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('token');
    },
    refreshToken() {
      axios.post('/api/v1/token/refresh/', {
        refresh: localStorage.getItem('refreshToken'),
      })
        .then((response) => {
          localStorage.setItem('token', response.data.access);
        });
    },
  },
  getters: {
    isAccessTokenValid: () => {
      const token = localStorage.getItem('token');
      if (token === null) {
        return false;
      }
      const { exp } = jwtDecode(token);
      const nowDate = new Date().valueOf();
      const expirationDate = new Date(exp * 1000);
      return nowDate < expirationDate;
    },
    isRefreshTokenValid: () => {
      const token = localStorage.getItem('refreshToken');
      if (token === null) {
        return false;
      }
      const { exp } = jwtDecode(token);
      const nowDate = new Date().valueOf();
      const expirationDate = new Date(exp * 1000);
      return nowDate < expirationDate;
    },
  },
};
