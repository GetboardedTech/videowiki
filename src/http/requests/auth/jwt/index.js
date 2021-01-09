import axios from '../../../axios/index.js';
import store from '../../../../store/store.js';
import Constant from '../../../../../constant';

// Token Refresh
let isAlreadyFetchingAccessToken = false;
let subscribers = [];

function onAccessTokenFetched(access_token) {
  subscribers = subscribers.filter(callback => callback(access_token));
}

function addSubscriber(callback) {
  subscribers.push(callback);
}

export default {
  init() {
    axios.interceptors.response.use(
      function(response) {
        return response;
      },
      function(error) {
        // const { config, response: { status } } = error
        const { config, response } = error;
        const originalRequest = config;

        // if (status === 401) {
        if (response && response.status === 401) {
          if (!isAlreadyFetchingAccessToken) {
            isAlreadyFetchingAccessToken = true;
            store.dispatch('auth/fetchAccessToken').then(access_token => {
              isAlreadyFetchingAccessToken = false;
              onAccessTokenFetched(access_token);
            });
          }

          const retryOriginalRequest = new Promise(resolve => {
            addSubscriber(access_token => {
              originalRequest.headers.Authorization = `Bearer ${access_token}`;
              resolve(axios(originalRequest));
            });
          });
          return retryOriginalRequest;
        }
        return Promise.reject(error);
      }
    );
  },
  login(email, pwd) {
    return axios.post(Constant.apiUrl + '/api/auth/login/', {
      username: email,
      password: pwd
    });
  },
  registerUser(firstName, lastName, email, pwd) {
    return axios.post(Constant.apiUrl + '/api/users/', {
      first_name: firstName,
      last_name: lastName,
      username: email,
      email,
      password: pwd,
      profile: {
        display_name: firstName + ' ' + lastName,
        active: true
      }
    });
  },
  refreshToken() {
    return axios.post(Constant.apiUrl + '/api/auth/refresh-token/', {
      accessToken: localStorage.getItem('accessToken')
    });
  }
};
