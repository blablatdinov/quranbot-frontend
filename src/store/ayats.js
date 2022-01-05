import axios from '@/api/backend';
import { getPageNumFromQuery } from '@/utils/getPageNum';

export default {
  namespaced: true,
  state: () => ({
    ayats: [],
    pageNum: 1,
    pageSize: 50,
  }),
  mutations: {
    SET_AYATS(state, ayats) {
      state.ayats = ayats;
    },
    SET_PAGE(state, pageNum) {
      state.pageNum = pageNum;
    },
  },
  actions: {
    async getAyats({ commit, getters }) {
      await axios.get(`/api/v1/content/ayats/?page=${getters.pageNum}`)
        .then((response) => {
          commit('SET_AYATS', response.data.results);
        })
        .catch(() => {});
    },
  },
  getters: {
    pageCount: (state) => state.ayats.length / state.pageSize,
    pageNum: (state) => getPageNumFromQuery() || state.pageNum,
  },
};
