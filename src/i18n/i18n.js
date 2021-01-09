/* =========================================================================================
  File Name:
  Description:
  ----------------------------------------------------------------------------------------
  Item Name: GetBoarded UI Template
  Author: GetBoarded
  Author URL: https://www.getboarded.com
========================================================================================== */

import Vue from 'vue';
import VueI18n from 'vue-i18n';
import i18nData from './i18nData';

Vue.use(VueI18n);

export default new VueI18n({
  locale: 'en', // set default locale
  fallbackLocale: 'en',
  messages: i18nData
});
