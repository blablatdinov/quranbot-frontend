import { createStore } from 'vuex';
import contentGenerator from './contentGenerator';
import auth from './auth';
import charts from './charts';
import sidebar from './sidebar';
import ayats from './ayats';
import mailings from './mailings';

export default createStore({
  modules: {
    contentGenerator,
    auth,
    charts,
    sidebar,
    ayats,
    mailings,
  },
});
