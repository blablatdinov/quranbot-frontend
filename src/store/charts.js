import axios from '@/api/backend';

export default {
  namespaced: true,
  state: () => ({
    activeSubscribers: 0,
    allSubscribers: 0,
    usageChartLabels: [],
    usageChartValues: [],
  }),
  mutations: {
    setActiveSubscribers(state, activeSubscribersCount) {
      state.activeSubscribers = activeSubscribersCount;
    },
    setAllSubscribers(state, allSubscribersCount) {
      state.allSubscribers = allSubscribersCount;
    },
    setUsageChartValues(state, usageChartValues) {
      state.usageChartValues = usageChartValues;
    },
    setUsageChartLabels(state, usageChartLabels) {
      state.usageChartLabels = usageChartLabels;
    },
  },
  getters: {},
  actions: {
    async getSubscribersCount({ commit }) {
      const response = await axios.get('/api/v1/bot/get-subscribers-count/');
      const { data } = response;
      commit('setActiveSubscribers', data.active);
      commit('setAllSubscribers', data.all);
    },
    async getUsageChartData({ commit }) {
      const response = await axios.get('/api/v1/bot/get-data-for-usage-graphic/');
      const { data } = response;
      commit('setUsageChartValues', data.map((elem) => elem.message_count));
      commit('setUsageChartLabels', data.map((elem) => elem.date));
    },
  },
};
