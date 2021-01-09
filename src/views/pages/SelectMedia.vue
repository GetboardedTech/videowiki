<template>
  <div class="select-media">
    <template v-for="(s, indexs) in $store.state.studio.scenes">
      <vx-card
        :key="indexs"
        :id="'scene_card_' + indexs"
        class="scene-card"
        :class="{
          activeScene:
            $store.state.studio.currentActiveScene === parseInt(indexs) + 1,
        }"
      >
        <p class="font-semibold items-left mb-base" style="white-space: normal">
          {{ s }}
        </p>
        <div>
          <!--v-if="selectedFromLibraryVideos[parseInt(indexs) + 1] !== undefined"-->
          <!--video
          v-show="!sceneImage[parseInt(indexs)]"
          width="100%"
          height="auto"
          controls
          preload="auto"
          id="link"
          :src="
            selectedFromLibraryVideos[parseInt(indexs) + 1] ||
            initialVideo(indexs)
          "
          @loadstart="callSetSceneImage(indexs, false)"
          @error="callSetSceneImage(indexs, true)"
        >
          {{ $t('studio.errors.e1') }}
        </video>
        <img
          v-show="sceneImage[parseInt(indexs)]"
          width="100%"
          height="auto"
          src="https://oldweb.dyu.edu.tw/english/design/no-video.gif"
        /-->
          <video
            width="100%"
            height="auto"
            controls
            preload="auto"
            :id="`library_item_${indexs}`"
            :src="selectedFromLibraryVideos[parseInt(indexs) + 1]"
            v-if="isVideoUrl(indexs)"
          >
            {{ $t('studio.errors.e1') }}
          </video>
          <div
            v-else
            class="bg-box relative vs-con-loading__container"
            :id="`upload_scene_${parseInt(indexs) + 1}`"
          >
            <VideoNotFound
              :sceneNum="parseInt(indexs) + 1"
              @search="loadSearchModal($event)"
            />
          </div>
        </div>
        <!--div v-else>
        <video
          width="100%"
          height="auto"
          id="initialVideo"
          preload="auto"
          controls
          :src="initialVideo(indexs)"
          $commit('studio/setSceneImage',true)
          $commit('studio/setSceneImage',false)
        >
          {{ $t('studio.errors.e1') }}
        </video>
      </div-->
      </vx-card>
    </template>
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
import VxCard from '../../components/vx-card/VxCard.vue';
export default {
  name: 'SelectVideos',
  components: {
    VxCard,
    VideoNotFound,
    SearchModal,
  },
  // data() {
  //   return {
  //     customTxtvalue: ''
  //   };
  // },
  data() {
    return {
      selectedFile: null,
      showSearchModal: false,
      currentScene: null,
    };
  },
  computed: {
    selectedFromLibraryVideos() {
      return this.$store.state.studio.selectedFromLibraryVideos;
    },
    /* sceneImage() {
      return this.$store.state.studio.sceneImage;
    }, */
  },
  methods: {
    /* callSetSceneImage(index, value) {
      this.$store.commit('studio/setSceneImage', {
        index: parseInt(index),
        value: value,
      });
    }, */
    isVideoUrl(indexs) {
      const videoUrl = this.selectedFromLibraryVideos[parseInt(indexs) + 1];
      if (!videoUrl) {
        const payload = this.initialVideo(indexs);
        if (payload.value) {
          this.$store.commit('studio/setInitialVideo', payload);
          return true;
        }
        return false;
      }
      return true;
    },
    loadSearchModal(index) {
      this.showSearchModal = true;
      this.currentScene = index;
    },
    initialVideo(indexs) {
      const dataObj = {
        indexs: parseInt(indexs),
        value: null,
      };
      if (
        Object.keys(this.$store.state.studio.videos[parseInt(indexs)]).length >
        0
      ) {
        const videoUrl = this.$store.state.studio.videos[
          parseInt(indexs)
        ][0][1];
        const url = videoUrl.split('.');
        if (url[url.length - 1] !== 'gif') dataObj.value = videoUrl;
      }
      return dataObj;

      // return this.selectedFromLibraryVideos[parseInt(indexs) + 1];
    },
    updateScroll() {
      // let scrollPosition = window.scrollY
      // console.log(scrollPosition)
      for (const s in this.$store.state.studio.scenes) {
        const rect = document
          .getElementById('scene_card_' + s)
          .getBoundingClientRect();
        // console.log(s, "bounding client", rect.top, rect.bottom);

        if (rect.top < 200 && rect.bottom > 500) {
          // console.log(s+" is active")
          // this.$store.commit('studio/removeSearchedVideos');
          this.$store.commit('studio/setActiveScene', parseInt(s) + 1);
        }
      }
    },
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll);
    const el = document.getElementById(
      `scene_card_${this.$store.state.studio.currentActiveScene - 1}`
    );
    el.scrollIntoView({ block: 'center' });
  },
  destroyed() {
    window.removeEventListener('scroll', this.updateScroll);
  },
};
</script>

<style scoped>
.select-media {
  margin-bottom: 12rem;
}
.scene-card {
  min-height: 30rem;
  /*background: #7367F0;
    color: white;*/
  opacity: 0.2;
  box-shadow: none;
  margin-bottom: 10rem;
}
.activeScene {
  box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.1) !important;
  -webkit-box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.1) !important;
  opacity: 1 !important;
}
.group-card {
  position: relative;
}
.scene-edit-card {
  position: absolute;
  opacity: 0.2;
  box-shadow: none;
  height: 45px;
  width: 100px;
  bottom: -60px;
  right: 43%;
}
.bg-box {
  height: 336px;
  display: flex;
  justify-content: center;
  background: #b9b9b9;
}
</style>
