import axios from '@/api/backend';
import getPageNumFromQuery from '@/utils/getPageNum';

export default {
  namespaced: true,
  state: () => ({
    ayats: [],
    page: null,
    pageSize: 50,
  }),
  mutations: {
    SET_AYATS(state, ayats) {
      state.ayats = ayats;
    },
    SET_PAGE(state, pageNum) {
      state.page = pageNum;
    },
  },
  actions: {
    async getAyats({ commit, getters }) {
      const response = await axios.get(`/api/v1/ayats/?page=${getters.pageNum}`);
      const ayats = await response.data;
      commit('SET_AYATS', ayats.results);
    },
  },
  getters: {
    pageCount: (state) => state.ayats.length / state.pageSize,
    pageNum: (state) => state.page || getPageNumFromQuery() || 1,
  },
};
