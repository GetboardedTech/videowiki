/* =========================================================================================
  File Name: moduleAuthState.js
  Description: Auth Module State
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== */

import axios from '../../http/axios/index.js';

const getToken = () => {
  const token = localStorage.getItem('accessToken');
  if (token && token !== 'undefined') {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
  return token;
};

export default {
  accessToken: getToken(),
  isUserLoggedIn: () => {
    const isAuthenticated = true;

    // if (auth.isAuthenticated()) isAuthenticated = true
    // else isAuthenticated = false

    return localStorage.getItem('userInfo') && isAuthenticated;
  }
};
