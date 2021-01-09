<template>
  <div class="vx-card cursor-default" style="height: 100%">
    <div class="vx-card__collapsible-content">
      <div class="vx-card__body">
        <template>
          <div class="w-full items-center">
            <h6 class="font-semibold mb-base" style="white-space: normal">
              You can add subtitle to your videos
            </h6>
            <vs-button @click="prepareAllScenes">{{
              $t('studio.sidebarPanel.course.c3')
            }}</vs-button>
          </div>
          <div
            v-for="(v, indexv) in selectedVideos"
            :key="indexv"
            class="w-full mb-base"
          >
            <div v-if="indexv > 0">
              <div class="flex justify-between items-center">
                <h5 class="mb-3">Scene {{ indexv }}</h5>
                <div class="flex justify-between w-1/4">
                  <vx-tooltip text="Add Scene">
                    <vs-icon
                      icon="add"
                      size="20px"
                      class="cursor-pointer"
                      @click="addScene(indexv - 1)"
                    />
                  </vx-tooltip>
                  <vx-tooltip text="Delete Scene">
                    <vs-icon
                      icon="delete"
                      size="20px"
                      class="cursor-pointer"
                      @click="deleteScene(indexv - 1)"
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
              <VideoPreview :src="v" v-if="isVideoUrl(v)" />
              <div
                v-else
                class="add-scene-container relative vs-con-loading__container"
                :id="`upload_scene_${indexv}`"
              >
                <VideoNotFound
                  :sceneNum="indexv"
                  @search="loadSearchModal($event)"
                />
              </div>
            </div>
          </div>
          <div class="w-full items-center">
            <vs-button icon="add" @click="addScene(selectedVideos.length - 1)"
              >Add Scene</vs-button
            >
          </div>
        </template>
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
import SearchModal from '@/components/search/SearchModal';
import VideoNotFound from '@/components/VideoNotFound';
import VideoPreview from './components/VideoPreview';
export default {
  name: 'ScenesPanel',
  components: {
    VideoNotFound,
    SearchModal,
    VideoPreview,
  },
  data() {
    return {
      showSearchModal: false,
      currentScene: null,
    };
  },
  computed: {
    selectedVideos() {
      return this.$store.state.studio.selectedFromLibraryVideos;
    },
  },
  methods: {
    isVideoUrl(videoUrl) {
      if (videoUrl) {
        const url = videoUrl.split('.');
        if (url[url.length - 1] === 'gif') return false;
        return true;
      }
      return false;
    },
    loadSearchModal(index) {
      this.showSearchModal = true;
      this.currentScene = index;
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
      if (this.selectedVideos.length > 2) {
        this.$store.commit('studio/deleteScene', index);
      } else {
        this.$vs.notify({
          title: 'Alert',
          text: 'Cannot delete last scene',
          color: 'primary',
        });
      }
    },
  },
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
</style>
