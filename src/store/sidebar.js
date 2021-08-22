export default {
  namespaced: true,
  state: () => ({
    collapsed: false,
  }),
  mutations: {
    toggleSidebar(state) {
      state.collapsed = !state.collapsed;
    },
  },
  actions: {
    toggleSidebar({ commit }) {
      commit('toggleSidebar');
    },
  },
};
