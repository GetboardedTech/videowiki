/* =========================================================================================
  File Name: moduleAuthActions.js
  Description: Auth Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== */

import jwt from '../../http/requests/auth/jwt/index.js';
import router from '@/router';

export default {
  // updateUsername ({ commit }, payload) {
  //   payload.user.updateProfile({
  //     displayName: payload.displayName
  //   }).then(() => {
  //
  //     // If username update is success
  //     // update in localstorage
  //     const newUserData = Object.assign({}, payload.user.providerData[0])
  //     newUserData.displayName = payload.displayName
  //     commit('UPDATE_USER_INFO', newUserData, {root: true})
  //
  //     // If reload is required to get fresh data after update
  //     // Reload current page
  //     if (payload.isReloadRequired) {
  //       router.push(router.currentRoute.query.to || '/')
  //     }
  //   }).catch((err) => {
  //     payload.notify({
  //       time: 8800,
  //       title: 'Error',
  //       text: err.message,
  //       iconPack: 'feather',
  //       icon: 'icon-alert-circle',
  //       color: 'danger'
  //     })
  //   })
  // },

  login({ commit }, payload) {
    return new Promise((resolve, reject) => {
      jwt
        .login(payload.userDetails.email, payload.userDetails.password)
        .then(response => {
          // If there's user data in response
          if (response.data.userData) {
            // Navigate User to homepage
            //router.push(router.currentRoute.query.to || '/');

            // Set accessToken
            localStorage.setItem('accessToken', response.data.accessToken);

            // Update user details
            /*const userData = {
              uid: 0,
              displayName: response.data.userData.profile.display_name,
              about: ''
            };*/
            const userData = response.data.userData;
            commit('UPDATE_USER_INFO', userData, { root: true });

            // Set bearer token in axios
            commit('SET_BEARER', response.data.accessToken);

            resolve(response);
          } else {
            reject({ message: 'Wrong Email or Password' });
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  registerUser({ commit }, payload) {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    } = payload.userDetails;

    return new Promise((resolve, reject) => {
      // Check confirm password
      if (password !== confirmPassword) {
        reject({ message: "Password doesn't match. Please try again." });
      }

      jwt
        .registerUser(firstName, lastName, email, password)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  logOut({ commit }) {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('accessToken');

    window.location.reload();
    // find a way to logout without refresh
    commit('LOGOUT', null, { root: true });
  },

  fetchAccessToken() {
    return new Promise(resolve => {
      jwt.refreshToken().then(response => {
        resolve(response);
      });
    });
  }
};
