/* =========================================================================================
  File Name: moduleAuthActions.js
  Description: Auth Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== */

import axios from '../../axios';
import constants from '../../../constant';

export default {
  searchVideos({ commit }, { text, notify }) {
    return new Promise((resolve, reject) => {
      axios
        .get(constants.apiUrl + '/api/videos/search', {
          params: { text }
        })
        .then(response => {
          response = response.data || response;
          commit('SET_VIDEOS', response);
          resolve(response);
        })
        .catch(error => {
          notify({
            title: 'Search Failed',
            text: error,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          });
          reject(error);
        });
    });
  },
  getVideos({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get(constants.apiUrl + '/api/home_videos')
        .then(response => {
          response = response.data.data || response;
          commit('SET_VIDEOS', response);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
