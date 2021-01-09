import axios from 'axios';
import constants from '../../constant';

const HTTP = axios.create({
  baseURL: constants.apiUrl,
  crossDomain: true,
  headers: {}
});

export const ajaxCallMixin = {
  response: {},
  methods: {
    ajaxCall: async function (url, data, callBack = null, extraFields = []) {
      var form = new FormData();
      var params = JSON.stringify(data);
      form.append('body', params);
      for (let [key, value] of Object.entries(extraFields)) {
        form.append(key, value);
      }

      this.response = await HTTP.post(url, form);

      if (callBack != null) {
        return callBack(this.response.data);
      }
    },
    getRequest: async function (url, callBack = null) {
      this.response = await HTTP.get(url);
      if (callBack != null) {
        return callBack(this.response.data);
      }
    },
    /* downloadMedia: async function (url, callback = null) {
      try {
        this.response.data = await HTTP.get(url, { responseType: 'blob' });
      } catch (err) {
        this.response.error = true;
      }
      if (callback !== null) {
        return callback(this.response);
      }
    } */
  }
};
