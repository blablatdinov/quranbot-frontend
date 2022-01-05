import axios from '@/api/backend';

export default {
  state: () => ({
    unusedAyats: [],
    checkedAyats: [],
    existsContent: [],
    nextDay: 0,
    contentLength: 0,
    errors: [],
  }),
  mutations: {
    setUnusedAyats(state, ayats) {
      state.unusedAyats = ayats;
    },
    setExistsContent(state, contents) {
      state.existsContent = contents;
    },
    setNextDay(state, day) {
      state.nextDay = day;
    },
    pushContent(state, content) {
      state.existsContent.splice(0, 0, content);
    },
    setCheckedAyats(state, ayatIds) {
      state.checkedAyats = ayatIds;
    },
    setErrors(state, errors) {
      state.errors = errors;
    },
  },
  getters: {
    nextDay(state) {
      return state.nextDay;
    },
    getExistsContent(state) {
      return state.existsContent;
    },
    getErrors(state) {
      return state.errors;
    },
  },
  actions: {
    async getUnusedAyats({ commit }) {
      await axios.get('/api/v1/content/get-not-used-ayats/')
        .then((response) => {
          commit('setUnusedAyats', response.data.results);
          const checkedAyats = [];
          response.data.results.slice(0, 5).forEach((element) => {
            checkedAyats.push(element.id);
          });
          commit('setCheckedAyats', checkedAyats);
        });
    },
    async getContents({ commit }) {
      await axios.get('/api/v1/content/morning-contents/?page_size=5')
        .then((response) => {
          commit('setExistsContent', response.data.results);
          commit('setNextDay', response.data.results[0].day + 1);
        });
    },
    async postContent({ state, commit, dispatch }) {
      await axios.post('/api/v1/content/morning-contents/', {
        day: state.nextDay,
        ayats_ids: state.checkedAyats,
      })
        .then((response) => {
          commit('pushContent', response.data);
          dispatch('getUnusedAyats');
          commit('setErrors', []);
          commit('setNextDay', state.nextDay + 1);
        })
        .catch((error) => {
          commit('setErrors', error.response.data.content);
        });
    },
  },
  namespaced: true,
};
