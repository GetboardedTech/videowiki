/* =========================================================================================
  File Name: moduleAuthMutations.js
  Description: Auth Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== */

// import state from '../state';
import Vue from 'vue';
import getDefaultState from './moduleStudioState.js';
export default {
  setInitialState(state) {
    Object.assign(state, getDefaultState());
  },
  SET_VIDEO(state, payload) {
    state.video = payload;
  },
  SET_VIDEO_ATTR(state, payload) {
    state.video[payload.key] = payload.value;
  },
  toggleText(state) {
    state.panel.text = true;
    state.panel.style = false;
    state.panel.library = false;
    state.panel.music = false;
    state.panel.scenes = false;
    state.panel.publish = false;
  },
  toggleStyle(state) {
    state.panel.text = false;
    state.panel.style = true;
    state.panel.library = false;
    state.panel.music = false;
    state.panel.scenes = false;
    state.panel.publish = false;
  },
  toggleLibrary(state) {
    state.panel.text = false;
    state.panel.style = false;
    state.panel.library = true;
    state.panel.music = false;
    state.panel.scenes = false;
    state.panel.publish = false;
  },
  toggleMusic(state) {
    state.panel.text = false;
    state.panel.style = false;
    state.panel.library = false;
    state.panel.music = true;
    state.panel.scenes = false;
    state.panel.publish = false;
  },
  toggleScenes(state) {
    state.panel.text = false;
    state.panel.style = false;
    state.panel.library = false;
    state.panel.music = false;
    state.panel.scenes = true;
    state.panel.publish = false;
  },
  togglePublish(state) {
    state.panel.text = false;
    state.panel.style = false;
    state.panel.library = false;
    state.panel.music = false;
    state.panel.scenes = false;
    state.panel.publish = true;
  },
  setScript(state, value) {
    state.videoScript = value;
  },
  setSentences(state, value) {
    state.scenes = value;
  },
  setSourceLanguage(state, value) {
    state.sourceLanguage = value;
  },
  editSceneScript(state, value) {
    state.scenes[state.currentActiveScene - 1] = value;
  },
  setKeywords(state, value) {
    state.keywords = value;
  },
  addKeyword(state, payload) {
    state.keywords[payload.sceneNum].unshift(payload.keyword);
  },
  setAudios(state, value) {
    state.audioList = value;
  },
  setVideos(state, value) {
    state.videos = value;
    state.invalidScenes = [];
    Object.entries(state.videos).forEach(([key, value]) => {
      if (value[0][3] === '') {
        state.invalidScenes.splice(parseInt(key), 1, true);
      } else {
        state.invalidScenes.splice(parseInt(key), 1, false);
      }
    });
  },
  setImages(state, value) {
    state.images = value;
  },
  resetState(state) {
    state.selectedFromLibraryVideos = [];
    state.uploadedVideos = [];
    state.searchedVideos = {};
    state.preparedScenesVideos = [];
    state.addedAudioVideos = [];
    state.currentActiveScene = 1;
    state.recordedAudios = [];
    state.styles = [];
  },
  /* setSceneImage(state, payload) {
    state.sceneImage.splice(parseInt(payload.index), 1, payload.value)
  }, */
  addScene(state, indexs) {
    state.selectedFromLibraryVideos.splice(indexs + 1, 0, '');
    const sArray = Object.values(state.scenes);
    const kArray = Object.values(state.keywords);
    const vArray = Object.values(state.videos);
    const svArray = Object.values(state.searchedVideos);
    const siArray = Object.values(state.searchedImages);
    const iArray = Object.values(state.images);
    sArray.splice(indexs, 0, '');
    kArray.splice(indexs, 0, []);
    vArray.splice(indexs, 0, {});
    iArray.splice(indexs, 0, {});
    svArray.splice(indexs, 0, {});
    siArray.splice(indexs, 0, {});
    state.scenes = { ...sArray };
    state.keywords = { ...kArray };
    state.videos = { ...vArray };
    state.images = { ...iArray };
    state.searchedVideos = { ...svArray };
    state.searchedImages = { ...siArray };
    state.uploadedVideos.splice(indexs, 0, null);
    state.styles.splice(indexs, 0, {});
    state.recordedAudios.splice(indexs, 0, null);
  },
  deleteScene(state, indexs) {
    state.selectedFromLibraryVideos.splice(indexs + 1, 1);
    const sArray = Object.values(state.scenes);
    const kArray = Object.values(state.keywords);
    const vArray = Object.values(state.videos);
    const svArray = Object.values(state.searchedVideos);
    const siArray = Object.values(state.searchedImages);
    const iArray = Object.values(state.images);
    sArray.splice(indexs, 1);
    kArray.splice(indexs, 1);
    vArray.splice(indexs, 1);
    iArray.splice(indexs, 1);
    svArray.splice(indexs, 1);
    siArray.splice(indexs, 1);
    state.scenes = { ...sArray };
    state.keywords = { ...kArray };
    state.videos = { ...vArray };
    state.images = { ...iArray };
    state.searchedVideos = { ...svArray };
    state.searchedImages = { ...siArray };
    state.uploadedVideos.splice(indexs, 1);
    state.styles.splice(indexs, 1);
    state.recordedAudios.splice(indexs, 1);
  },
  setInitialVideo(state, dataObj) {
    state.selectedFromLibraryVideos[dataObj.indexs + 1] = dataObj.value;
  },
  setSearchedVideos(state, payload) {
    Vue.set(state.searchedVideos, payload.sceneNum, payload.value);
  },
  setSearchedImages(state, payload) {
    Vue.set(state.searchedImages, payload.sceneNum, payload.value);
  },
  setUploadedVideos(state, payload) {
    if (!state.uploadedVideos[payload.sceneNum]) {
      Vue.set(state.uploadedVideos, payload.sceneNum, []);
    }
    const uploadedVideosList = state.uploadedVideos[payload.sceneNum];
    uploadedVideosList.push(payload.value);
    Vue.set(state.uploadedVideos, payload.sceneNum, uploadedVideosList);
  },
  removeSearchedVideos(state) {
    state.searchedVideos = {};
  },
  setVideoWidth(state, value) {
    state.videoWidth = value;
  },
  setVideoHeight(state, value) {
    state.videoHeight = value;
  },
  setStyles(state, payload) {
    if (!state.styles[payload.sceneNum]) {
      Vue.set(state.styles, payload.sceneNum, {});
    }
    Vue.set(state.styles[payload.sceneNum], payload.prop, payload.value);
  },
  setRecordedAudio(state, payload) {
    Vue.set(state.recordedAudios, payload.sceneNum, payload.value);
  },
  setUploadedAudio(state, audio) {
    state.uploadedAudios.push(audio);
  },
  setVideoWithAudio(state, payload) {
    state.addedAudioVideos[payload.sceneNum] = payload.value;
  },
  setScriptSceneVideo(state, payload) {
    state.preparedScenesVideos[payload.sceneNum] = payload.value;
    if (state.addedAudioVideos[payload.sceneNum]) {
      state.addedAudioVideos[payload.sceneNum] = null;
    }
    if (state.recordedAudios[payload.sceneNum - 1]) {
      state.recordedAudios[payload.sceneNum - 1] = null;
    }
  },
  setPrepareAllScenes(state, value) {
    state.preparedScenesVideos = value;
  },
  setPrepareAllAudios(state, value) {
    state.addedAudioVideos = value;
  },
  setActiveScene(state, value) {
    state.currentActiveScene = value;
  },
  selectVideo(state, payload) {
    state.selectedFromLibraryVideos[0] = -1;
    state.selectedFromLibraryVideos.splice(payload.sceneNum, 1);
    state.selectedFromLibraryVideos.splice(payload.sceneNum, 0, payload.value);
    if (state.preparedScenesVideos[payload.sceneNum]) {
      state.preparedScenesVideos[payload.sceneNum] = null;
    }
  },
  selectAudio(state, a) {
    // state.recordedAudios[0] = -1;
    // state.recordedAudios.splice(state.currentActiveScene, 1);
    // state.recordedAudios.splice(state.currentActiveScene, 0, a);
    state.backgroundMusic = a;
  },
  clearAudio(state) {
    state.backgroundMusic = {};
  },
  setPreviewVideo(state, v) {
    state.previewVideo = v;
  },
  setTags(state, tags) {
    state.tags = tags;
  },
  addTag(state, t) {
    state.tags.push(t);
  },
  removeTag(state, item) {
    state.tags.splice(state.tags.indexOf(item), 1);
  },
  setActionPerformed(state, key) {
    state.steps[key] = true;
  },
  skipSubtitles(state) {
    state.skipSubtitles = true;
  },
  skipMusic(state) {
    state.skipMusic = true;
  }
};
