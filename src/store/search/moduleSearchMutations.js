/* =========================================================================================
  File Name: moduleAuthMutations.js
  Description: Auth Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== */

export default {
  SET_TEXT(state, payload) {
    state.text = payload;
  },
  SET_LOADING(state, payload) {
    state.isSearchStalled = payload;
  },
  SET_VIDEOS(state, payload) {
    state.videos = payload;
  },
  SET_FILTERS_ATTR(state, payload) {
    state.filters[payload.key] = payload.value;
  }
};
