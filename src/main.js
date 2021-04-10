/* =========================================================================================
  File Name: main.js
  Description: main vue(js) file
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== */

import Vue from 'vue';
import App from './App.vue';
import Rollbar from 'rollbar';

// Vuesax Component Framework
import Vuesax from 'vuesax';
import 'material-icons/iconfont/material-icons.css'; // Material Icons
import 'vuesax/dist/vuesax.css';

// axios
import axios from './axios.js';

// ACL
import acl from './acl/acl';

// i18n
import i18n from './i18n/i18n';

// Theme Configurations
import '../themeConfig.js';

// Globally Registered Components
import './globalComponents.js';

// Styles: SCSS
import './assets/scss/main.scss';

// Tailwind
import '@/assets/css/main.css';

// Vue Router
import router from './router';

// Vuex Store
import store from './store/store';

// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from 'vue2-hammer';

// VeeValidate
import VeeValidate from 'vee-validate';

import 'vue-loaders/dist/vue-loaders.css';
import VueLoaders from 'vue-loaders';

import 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';

// vue progress bar
import VueProgressBar from 'vue-progressbar'; // Vuesax

// vue-gtm
import VueGtm from 'vue-gtm';

import constant from '../constant';

Vue.use(VueGtm, {
  id: 'GTM-M3DXDTZ', // Your GTM single container ID or array of container ids ['GTM-xxxxxx', 'GTM-yyyyyy'] or array of objects [{id: 'GTM-xxxxxx', queryPararms: { gtm_auth: 'abc123', gtm_preview: 'env-4', gtm_cookies_win: 'x'}}, {id: 'GTM-yyyyyy', queryParams: {gtm_auth: 'abc234', gtm_preview: 'env-5', gtm_cookies_win: 'x'}}]
  /* queryParams: {
    // Add url query string when load gtm.js with GTM ID (optional)
    gtm_auth: 'AB7cDEf3GHIjkl-MnOP8qr',
    gtm_preview: 'env-4',
    gtm_cookies_win: 'x'
  }, */
  defer: false, // defaults to false. Script can be set to `defer` to increase page-load-time at the cost of less accurate results (in case visitor leaves before script is loaded, which is unlikely but possible)
  enabled: constant.url === 'https://videowiki.pt', // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
  debug: false, // Whether or not display console logs debugs (optional)
  loadScript: constant.url === 'https://videowiki.pt', // Whether or not to load the GTM Script (Helpful if you are including GTM manually, but need the dataLayer functionality in your components) (optional)
  vueRouter: router, // Pass the router instance to automatically sync with router (optional)
  // ignoredViews: ["homepage"], // Don't trigger events for specified router names (case insensitive) (optional)
  trackOnNextTick: false // Whether or not call trackView in Vue.nextTick
});

Vue.use(VueLoaders);

// PrismJS
Vue.use(Vuesax);
Vue.prototype.$http = axios;
Vue.use(VueHammer);
Vue.use(VeeValidate);
Vue.use(VueProgressBar, {
  color: '#7367F0',
  failedColor: 'red',
  thickness: '0.5rem',
  autoFinish: false
});

// Set the Rollbar instance in the Vue prototype
// before creating the first Vue instance.
// This ensures it is available in the same way for every
// instance in your app.
Vue.prototype.$rollbar = new Rollbar({
  accessToken: 'cc587879d761415ea6a5bd55b43521f5',
  captureUncaught: true,
  captureUnhandledRejections: true
});

// If you have already set up a global error handler,
// just add `vm.$rollbar.error(err)` to the top of it.
// If not, this simple example will preserve the app’s existing
// behavior while also reporting uncaught errors to Rollbar.
Vue.config.errorHandler = (err, vm, info) => {
  vm.$rollbar.error(err);
  throw err; // rethrow
};

// Feather font icon
require('./assets/css/iconfont.css');

// Vue select css
// Note: In latest version you have to add it separately
// import 'vue-select/dist/vue-select.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  acl,
  render: h => h(App)
}).$mount('#app');
