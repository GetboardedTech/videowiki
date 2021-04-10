<template>
  <div class="vx-card cursor-default" style="height: 100%">
    <div class="vx-card__collapsible-content">
      <div class="vx-card__body">
        <div class="-mr-4">
          <div class="w-full items-center mb-base">
            <h6 class="font-semibold mb-base" style="white-space: normal">
              You can add subtitle to your videos
            </h6>
            <vs-button @click="prepareAllScenes">{{
              $t('studio.sidebarPanel.course.c3')
            }}</vs-button>
          </div>
          <component
            :is="scrollbarTag"
            ref="verticalNavMenuPs"
            class="scroll-area pr-3"
            :settings="settings"
            :key="$vs.rtl"
          >
            <div
              v-for="(v, indexv) in selectedVideos"
              :key="indexv"
              class="w-full mb-base"
            >
              <div class="flex justify-between items-center">
                <h5 class="mb-3">Scene {{ indexv + 1 }}</h5>
                <div class="flex justify-end w-1/2">
                  <div v-if="indexv + 1 < sceneLength" class="w-1/3">
                    <CustomDropdown
                      :options="transitionList"
                      @input="setTransition(indexv, $event)"
                      :value="getTransition(indexv)"
                    />
                  </div>
                  <vx-tooltip text="Add Scene" class="w-1/3">
                    <vs-icon
                      icon="add"
                      size="20px"
                      class="cursor-pointer"
                      @click="addScene(indexv)"
                    />
                  </vx-tooltip>
                  <vx-tooltip text="Delete Scene">
                    <vs-icon
                      icon="delete"
                      size="20px"
                      class="cursor-pointer"
                      @click="deleteScene(indexv)"
                    />
                  </vx-tooltip>
                </div>
              </div>
              <!--video
                width="100%"
                height="auto"
                v-if="isVideoUrl(v)"
                :src="v"
                @mouseenter="playScene"
                @mouseleave="pauseScene"
              >
                <!--<source :src="v[1]" type="video/mp4">-->
              <!--{{ $t('studio.sidebarPanel.course.c2') }}
              </video-->
              <template v-if="v">
                <img
                  v-if="isImageUrl(v)"
                  width="100%"
                  height="auto"
                  class="cursor-pointer"
                  @click="scrollToScene(indexv)"
                  :src="v"
                />
                <VideoPreview
                  :src="v"
                  class="cursor-pointer"
                  v-else
                  @click.native="scrollToScene(indexv)"
                />
              </template>
              <div
                v-else
                class="add-scene-container relative vs-con-loading__container"
                :id="`upload_scene_${indexv + 1}`"
              >
                <VideoNotFound
                  :sceneNum="indexv + 1"
                  @click.native="scrollToScene(indexv)"
                  @search="loadSearchModal($event)"
                />
              </div>
            </div>
            <div class="w-full items-center">
              <vs-button icon="add" @click="addScene(selectedVideos.length)"
                >Add Scene</vs-button
              >
            </div>
          </component>
        </div>
      </div>
    </div>
    <SearchModal
      :showModal.sync="showSearchModal"
      :sceneNum="currentScene"
      @close="showSearchModal = false"
    />
  </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import SearchModal from '@/components/search/SearchModal';
import VideoNotFound from '@/components/VideoNotFound';
import VideoPreview from './components/VideoPreview';
import CustomDropdown from './components/CustomDropdown';
export default {
  name: 'ScenesPanel',
  components: {
    VideoNotFound,
    SearchModal,
    VideoPreview,
    VuePerfectScrollbar,
    CustomDropdown
  },
  data() {
    return {
      showSearchModal: false,
      currentScene: null,
      pptImage: false,
      settings: {
        // perfectScrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: 1,
        swipeEasing: true,
        scrollXMarginOffset: 100
      },
      transitionList: [
        { value: 'no_motion', label: 'No Motion' },
        { value: 'slide_in_right', label: 'Slide in Right' },
        { value: 'slide_in_left', label: 'Slide in Left' },
        { value: 'slide_in_bottom', label: 'Slide in Bottom' },
        { value: 'slide_in_top', label: 'Slide in top' },
        { value: 'fade_in', label: 'Fade In' },
        { value: 'fade_out', label: 'Fade Out' }
      ]
    };
  },
  computed: {
    selectedVideos() {
      return this.$store.state.studio.selectedFromLibraryVideos.slice(1);
    },
    scrollbarTag() {
      return this.$store.getters.scrollbarTag;
    },
    sceneLength() {
      return Object.keys(this.$store.state.studio.scenes).length;
    },
    sceneTransitionList() {
      return this.$store.state.studio.sceneTransition;
    }
  },
  methods: {
    isImageUrl(urlString) {
      const imgExtentions = ['jpg', 'png', 'jpeg'];
      urlString = new URL(urlString);
      return imgExtentions.includes(urlString.pathname.split('.')[1]);
    },
    loadSearchModal(index) {
      this.showSearchModal = true;
      this.currentScene = index;
    },
    setTransition(idx, value) {
      this.$store.commit('studio/setTransition', {
        sceneNum: idx,
        value
      });
    },
    getTransition(idx) {
      if (this.sceneTransitionList[idx]) {
        return this.sceneTransitionList[idx];
      }
      this.setTransition(idx, 'no_motion');
      return 'No Motion';
    },
    scrollToScene(sceneNumber) {
      var element = document.getElementById(`scene_card_${sceneNumber}`);
      const headerOffset = 80;
      var elementPosition = element.getBoundingClientRect().top;
      var offsetPosition = elementPosition - headerOffset + window.pageYOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    },
    prepareAllScenes() {
      /* this.$store.commit(
        'studio/setPrepareAllScenes',
        this.$store.state.studio.selectedFromLibraryVideos
      ); */
      this.$store.commit('studio/skipSubtitles');
      this.$store.commit('studio/toggleMusic');
    },
    addScene(index) {
      this.$store.commit('studio/addScene', index);
    },
    deleteScene(index) {
      if (this.selectedVideos.length > 1) {
        this.$store.commit('studio/deleteScene', index);
      } else {
        this.$vs.notify({
          title: 'Alert',
          text: 'Cannot delete last scene',
          color: 'primary'
        });
      }
    }
  }
};
</script>

<style scoped>
.items-center {
  text-align: center;
  text-align: -moz-center;
  text-align: -webkit-center;
}
.add-scene-container {
  width: 100%;
  height: 133px;
  display: flex;
  justify-content: center;
  background: #b9b9b9;
}
.image-frame {
  width: 100%;
  height: auto;
}
.scroll-area {
  position: relative;
  width: 100%;
  height: 60vh;
}
</style>
