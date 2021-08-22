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
          router.push('/');
        })
        .catch(() => {});
    },
    logout() {
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('token');
    },
  },
};
