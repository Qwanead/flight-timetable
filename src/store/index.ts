import { createStore } from 'vuex';

export default createStore({
  state: {
    title: '',
  },

  getters: {
    getTitle: (state) => state.title,
  },

  mutations: {
    setTitle(state, title) {
      state.title = title;
    },
  },

  actions: {
  },
});
