import axios from '@/api/backend';
import { getPageNumFromQuery } from '@/utils/getPageNum';

export default {
  namespaced: true,
  state: () => ({
    mailings: [],
    pageNum: 1,
  }),
  mutations: {
    SET_MAILINGS(state, mailings) {
      state.mailings = mailings;
    },
    SET_PAGE(state, pageNum) {
      state.pageNum = pageNum;
    },
  },
  actions: {
    getMailings({ commit, getters }) {
      axios.get(`/api/v1/bot/mailings/?page=${getters.pageNum}`)
        .then((response) => {
          commit('SET_MAILINGS', response.data.results);
        });
    },
    sendToAdmin(_, text) {
      axios.post('/api/v1/bot/send-message-to-admin/', {
        text,
      });
    },
    send(_, text) {
      axios.post('/api/v1/bot/mailings/', {
        text,
      });
    },
    deleteMailing({ state, commit }, mailingId) {
      axios.delete(`/api/v1/bot/mailings/${mailingId}/`);
      const reformattedMailings = [];
      state.mailings.forEach((elem) => {
        const newElem = elem;
        if (elem.id === mailingId) {
          newElem.is_deleted = true;
        }
        reformattedMailings.push(newElem);
      });
      commit('SET_MAILINGS', reformattedMailings);
    },
  },
  getters: {
    pageCount: (state) => state.mailings.length / state.pageSize,
    pageNum: (state) => getPageNumFromQuery() || state.pageNum,
  },
};
