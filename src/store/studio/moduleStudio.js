/* =========================================================================================
  File Name: moduleStudio.js
  Description: Studio Module
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Studioor: Pixinvent
  Studioor URL: http://www.themeforest.net/user/pixinvent
========================================================================================== */

// import state from './moduleStudioState.js';
import mutations from './moduleStudioMutations.js';
import actions from './moduleStudioActions.js';
import getters from './moduleStudioGetters.js';
import getDefaultState from './moduleStudioState.js';

export default {
  namespaced: true,
  state: getDefaultState(),
  mutations,
  actions,
  getters
};
