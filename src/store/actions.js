/* =========================================================================================
  File Name: actions.js
  Description: Vuex Store - actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== */

// import connectWallet from '../blockchain/connectWallet';
// var walletInstance = new connectWallet();
import { onBuy, onConnect, onDisconnect } from '../blockchain/connectWallet';
import {
  buyContent,
  publishContent,
  downloadContent,
  getPrice,
  isDownloadable
} from '../blockchain/OceanMarket';

const actions = {
  // /////////////////////////////////////////////
  // COMPONENTS
  // /////////////////////////////////////////////

  // Vertical NavMenu
  updateVerticalNavMenuWidth({ commit }, width) {
    commit('UPDATE_VERTICAL_NAV_MENU_WIDTH', width);
  },

  // VxAutoSuggest
  updateStarredPage({ commit }, payload) {
    commit('UPDATE_STARRED_PAGE', payload);
  },

  // The Navbar
  arrangeStarredPagesLimited({ commit }, list) {
    commit('ARRANGE_STARRED_PAGES_LIMITED', list);
  },
  arrangeStarredPagesMore({ commit }, list) {
    commit('ARRANGE_STARRED_PAGES_MORE', list);
  },

  // /////////////////////////////////////////////
  // UI
  // /////////////////////////////////////////////

  toggleContentOverlay({ commit }) {
    commit('TOGGLE_CONTENT_OVERLAY');
  },
  updateTheme({ commit }, val) {
    commit('UPDATE_THEME', val);
  },

  // /////////////////////////////////////////////
  // User/Account
  // /////////////////////////////////////////////

  updateUserInfo({ commit }, payload) {
    commit('UPDATE_USER_INFO', payload);
  },
  async connectWallet({ commit }) {
    try {
      await onConnect();
    } catch (err) {
      console.log(err);
    }
  },

  async disconnectWallet({ commit }) {
    try {
      await onDisconnect();
      commit('DISCONNECT');
    } catch (err) {
      console.log(err);
    }
  },
  /* async buyContent({ commit }) {
    try {
      await onBuy();
    } catch (err) {
      console.log(err);
    }
  }, */
  async getAssetPrice({ commit }, exchangeId) {
    try {
      const price = await getPrice(exchangeId);
      return price;
    } catch (err) {
      console.log(err);
    }
  },
  async getDownloadStatus({ commit }, payload) {
    return await isDownloadable(
      payload.dataTokenAddress,
      payload.accountAddress
    );
  },
  async publishToOcean({ commit }, payload) {
    try {
      const videoTxData = await publishContent(
        payload.author,
        payload.metaData
      );
      console.log(videoTxData);
      commit('studio/SET_VIDEO_ATTR', {
        key: 'txData',
        value: videoTxData
      });
      return true;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  async initiateBuy({ commit }, exchangeId) {
    try {
      await buyContent(exchangeId);
    } catch (e) {
      console.log({ buyContentError: e });
      throw e;
    }
  },
  async startDownload({ commit }, payload) {
    try {
      await downloadContent(payload.did, payload.dta);
    } catch (e) {
      console.log({ downloadContentErro: e });
      throw e;
    }
  }
};

export default actions;
