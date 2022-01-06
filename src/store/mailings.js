import axios from '@/api/backend';
import { getPageNumFromQuery } from '@/utils/getPageNum';

export default {
  namespaced: true,
  state: () => ({
    mailings: [],
    pageNum: 1,
    pageSize: 50,
    count: 0,
  }),
  mutations: {
    SET_MAILINGS(state, mailings) {
      state.mailings = mailings;
    },
    SET_PAGE(state, pageNum) {
      state.pageNum = pageNum;
    },
    SET_ELEMENTS_COUNT(state, elementsCount) {
      state.count = elementsCount;
    },
  },
  actions: {
    getMailings({ commit, getters }, pageNum) {
      axios.get(`/api/v1/bot/mailings/?page=${pageNum || getters.pageNum}`)
        .then((response) => {
          commit('SET_MAILINGS', response.data.results);
          commit('SET_ELEMENTS_COUNT', response.data.count);
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
          newElem.is_cleaned = true;
        }
        reformattedMailings.push(newElem);
      });
      commit('SET_MAILINGS', reformattedMailings);
    },
  },
  getters: {
    pageCount: (state) => {
      const result = state.count / state.pageSize;
      return Math.ceil(result);
    },
    pageNum: (state) => {
      const pageNum = getPageNumFromQuery() || state.pageNum;
      return Number(pageNum);
    },
  },
};
