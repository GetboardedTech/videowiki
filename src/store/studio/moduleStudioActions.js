/* =========================================================================================
  File Name: moduleAuthActions.js
  Description: Auth Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== */

import store from '../store';
import axios from '../../axios';
import constants from '../../../constant';

export default {
  // /////////////////////////////////////////////
  // VideoWiki
  // /////////////////////////////////////////////

  breakVideoIntoScenes({ commit }, reuqestBody) {
    return new Promise((resolve, reject) => {
      axios
        .post(constants.apiUrl + '/api/video-chunks/', reuqestBody)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  extractInfoFromUrl({ commit }, requestBody) {
    return new Promise((resolve, reject) => {
      axios
        .post(constants.apiUrl + '/api/extract_info_url', requestBody)
        .then(res => {
          resolve(res.data.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  uploadDoc({ commit }, documentFile) {
    var form = new FormData();
    form.append('file', documentFile);
    return new Promise((resolve, reject) => {
      axios
        .post(constants.apiUrl + '/api/extract_info_file', form)
        .then(res => {
          // commit('selectVideo', res.data.video_url);
          resolve(res.data.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  summarizeScript({ commit }) {
    return new Promise((resolve, reject) => {
      const dataObj = {
        text: store.state.studio.videoScript,
        srcLang: store.state.studio.video.srcLang
      };
      axios
        .post(constants.apiUrl + '/smz/new', dataObj)
        .then(res => {
          /* let script = '';
          for (const s in res.data) {
            script = script + res.data[s] + ' ';
          }
          commit('setScript', script); */
          commit('SET_VIDEO_ATTR', {
            key: 'description',
            value: res.data.summary
          });
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  generateTags({ commit }) {
    return new Promise((resolve, reject) => {
      const dataObj = {
        title: store.state.studio.video.title,
        keywords: []
      };
      Object.values(store.state.studio.keywords).forEach(arr => {
        dataObj.keywords.push(...arr);
      });
      axios
        .post(constants.apiUrl + '/ke/tags', dataObj)
        .then(res => {
          /* let script = '';
          for (const s in res.data) {
            script = script + res.data[s] + ' ';
          } 
          commit('setScript', script); */
          commit('setTags', res.data.tags);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  sentenceDetection({ commit }, value) {
    return new Promise((resolve, reject) => {
      const dataObj = {
        text: store.state.studio.videoScript,
        /* srcLang: store.state.studio.video.srcLang, */
        break_type: value
      };
      axios
        .post(constants.apiUrl + '/sd/', dataObj)
        .then(res => {
          commit('setSentences', res.data.sentences);
          // commit('setKeywords', res.data.keywords);
          commit('setSourceLanguage', res.data.srcLang);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  keywordExtraction({ commit }) {
    return new Promise((resolve, reject) => {
      const dataObj = {
        text: store.state.studio.videoScript,
        srcLang: store.state.studio.video.srcLang
      };
      axios
        .post(constants.apiUrl + '/ke/', dataObj)
        .then(res => {
          commit('setKeywords', res.data);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  audioSuggestions({ commit }) {
    return new Promise((resolve, reject) => {
      const dataObj = {
        keywords: store.state.studio.keywords,
        srcLang: store.state.studio.video.srcLang
      };
      axios
        .post(constants.apiUrl + '/al/', dataObj)
        .then(res => {
          // console.log('audio suggestions', res);
          commit('setAudios', res.data);
          resolve(res);
        })
        .catch(err => {
          console.log('error in audio suggestion', err);
          reject(err);
        });
    });
  },
  audioVideoMerge({ commit }, dataObj) {
    return new Promise((resolve, reject) => {
      /* const headers = {
        'Content-Type': 'multipart/form-data'
      }; */
      axios
        .post(constants.apiUrl + '/avm/', dataObj)
        .then(res => {
          // commit('setVideoWithAudio', res.data.url);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  videoSuggestions({ commit }) {
    return new Promise((resolve, reject) => {
      const dataObj = {
        keywords: store.state.studio.keywords,
        srcLang: store.state.studio.video.srcLang
      };
      axios
        .post(constants.apiUrl + '/vl/', dataObj)
        .then(res => {
          commit('setVideos', res.data.videos);
          commit('setImages', res.data.images);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  searchMedia({ commit }, dataObj) {
    return new Promise((resolve, reject) => {
      axios
        .post(constants.apiUrl + '/vs/', dataObj)
        .then(res => {
          // commit('setSearchedVideos', res.data);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  addMotionToImage({ commit }, dataObj) {
    return new Promise((resolve, reject) => {
      axios
        .post(constants.apiUrl + '/image/zoom', dataObj)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  editSceneScript({ commit }, sceneScriptData) {
    return new Promise((resolve, reject) => {
      axios
        .post(constants.apiUrl + '/vsrt/', sceneScriptData)
        .then(res => {
          // commit("setVideos", res.data)
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  concatenateVideos({ commit }, videoWikiData) {
    return new Promise((resolve, reject) => {
      /* const dataObj = {
        videos
      } */
      axios
        .post(constants.apiUrl + '/vc/', videoWikiData)
        .then(res => {
          // commit("setVideos", res.data)
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  uploadMedia({ commit }, mediaFile) {
    var form = new FormData();
    form.append('media', mediaFile);
    return new Promise((resolve, reject) => {
      axios
        .post(constants.apiUrl + '/videoapi/upload_media', form)
        .then(res => {
          // commit('selectVideo', res.data.video_url);
          resolve(res.data.media_url);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  publishVideo({ commit }, videoUploadData) {
    return new Promise((resolve, reject) => {
      /* const dataObj = {
        videos
      } */
      axios
        .post(constants.apiUrl + '/videoapi/publish_video', videoUploadData)
        .then(res => {
          // commit("setVideos", res.data)
          // commit('setPublishStatus', true);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  getVideoData({ commit }, videoId) {
    return new Promise((resolve, reject) => {
      axios
        .get(constants.apiUrl + '/videoapi/get_saved_video?id=' + videoId)
        .then(res => {
          commit('setInitialState');
          const apiResponse = res.data;
          commit('SET_VIDEO_ATTR', {
            key: 'title',
            value: apiResponse.info.title
          });
          commit('setScript', apiResponse.info.script);
          commit('SET_VIDEO_ATTR', {
            key: 'srcLang',
            value: apiResponse.info.language
          });
          commit('setTags', apiResponse.tags);
          commit('SET_VIDEO_ATTR', {
            key: 'description',
            value: apiResponse.info.description
          });
          commit('SET_VIDEO_ATTR', {
            key: 'published_id',
            value: apiResponse.published_id
          });
          const sentences = {};
          const keywords = {};
          Object.entries(apiResponse.scenes).forEach(([key, value]) => {
            const sceneNum = parseInt(key);
            const sceneUrl = value.online_url
              ? value.online_url
              : value.uploaded_video;
            sentences[key] = value.text;
            keywords[key] = value.keywords;
            commit('setInitialVideo', {
              indexs: sceneNum,
              value: sceneUrl
            });
            commit('setStyles', {
              prop: 'sceneScriptColor',
              value: value.font_color,
              sceneNum
            });
            commit('setStyles', {
              prop: 'sceneScriptPosition',
              value: parseInt(value.position),
              sceneNum
            });
            commit('setStyles', {
              prop: 'sceneBackgroundColor',
              value: value.background_color,
              sceneNum
            });
            /* commit('setScriptSceneVideo', {
              sceneNum: sceneNum + 1,
              value: sceneUrl
            }); */
            commit('setRecordedAudio', {
              sceneNum,
              value: value.audio
            });
          });
          commit('setSentences', sentences);
          commit('setKeywords', keywords);
          commit('skipSubtitles');
          commit('skipMusic');
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  resetState({ commit }) {
    commit('setInitialState');
  },
  postTxData({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(constants.apiUrl + '/transaction/oceanbuy', payload)
        .then(res => {
          console.log(res);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
