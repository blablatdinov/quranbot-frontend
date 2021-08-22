import axios from '@/api/backend';

export default {
  namespaced: true,
  state: () => ({
    mailings: [],
  }),
  mutations: {
    SET_MAILINGS(state, mailings) {
      state.mailings = mailings;
    },
  },
  actions: {
    getMailings({ commit }) {
      axios.get('/api/v1/mailings/')
        .then((response) => {
          commit('SET_MAILINGS', response.data.results);
        });
    },
    sendToAdmin(_, text) {
      axios.post('/api/v1/send-message-to-admin/', {
        text,
      });
    },
    send(_, text) {
      axios.post('/api/v1/mailings/', {
        text,
      });
    },
    deleteMailing(_, mailingId) {
      axios.delete(`/api/v1/mailings/${mailingId}/`);
    },
  },
};
