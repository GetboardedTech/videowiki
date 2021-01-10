/* =========================================================================================
  File Name: moduleAuthState.js
  Description: Auth Module State
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== */
const getDefaultState = () => {
  return {
    video: {
      title: '',
      description: '',
      script: '',
      srcLang: 'en',
      image: '',
      url: '',
      published_id: null,
      isPaid: false,
      txData: null
    },
    videoScript: '',
    backgroundMusic: {},
    sourceLanguage: 'en',
    panel: {
      text: true,
      style: false,
      library: false,
      music: false,
      scenes: false,
      publish: false
    },
    scenes: {}, // 1
    activeSceneInLibrary: 1,
    activeSceneInScenes: 1,
    keywords: {}, // 2
    videos: {},  // 3
    images: {},
    audioList: {},
    invalidScenes: [],
    searchedVideos: {},
    searchedImages: {},  // 4

    currentActiveScene: 1,

    selectedFromLibraryVideos: [], // 5
    // sceneImage: [],
    uploadedVideos: [], // 6
    videoWidth: null,
    videoHeight: null,
    preparedScenesVideos: [],
    styles: [], // 7
    recordedAudios: [], // 8
    uploadedAudios: [],
    addedAudioVideos: [],
    styleVideos: [],
    previewVideo: null,
    tags: [],
    steps: {
      Script: true,
      Scenes: true,
      Subtitles: false,
      Narration: false
    },
    skipSubtitles: false,
    skipMusic: false
  };
};
export default getDefaultState;
