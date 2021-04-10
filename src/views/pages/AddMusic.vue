<template>
  <div>
    <vx-card
      v-for="(s, indexs) in $store.state.studio.scenes"
      :key="indexs"
      :id="'scene_card_' + indexs"
      class="scene-card vs-con-loading__container"
      :class="{
        activeScene:
          $store.state.studio.currentActiveScene === parseInt(indexs) + 1,
      }"
    >
      <p class="font-semibold items-left mb-base" style="white-space: normal">
        {{ s }}
      </p>
      <div v-if="!!addedAudioVideos[parseInt(indexs) + 1]" class="mb-base">
        <video
          width="100%"
          height="auto"
          controls
          muted
          :id="'video_' + indexs"
          :src="addedAudioVideos[parseInt(indexs) + 1]"
        >
          {{ $t('studio.errors.e1') }}
        </video>
      </div>
      <div
        v-else-if="!!preparedScenesVideos[parseInt(indexs) + 1]"
        class="mb-base"
      >
        <video
          width="100%"
          height="auto"
          controls
          :id="'video_' + indexs"
          muted
        >
          <!--source
            :src="
              constants.apiUrl +
              '/' +
              preparedScenesVideos[parseInt(indexs) + 1]
            "
            type="video/mp4"
          /-->
          <source
            :src="preparedScenesVideos[parseInt(indexs) + 1]"
            type="video/mp4"
          />
          {{ $t('studio.errors.e1') }}
        </video>
      </div>
      <div v-else class="mb-base">
        <img
          v-if="isImageUrl(selectedFromLibraryVideos[parseInt(indexs) + 1])"
          width="100%"
          height="auto"
          :src="selectedFromLibraryVideos[parseInt(indexs) + 1]"
        />
        <video
          v-else
          width="100%"
          height="auto"
          :id="'video_' + indexs"
          controls
          :src="selectedFromLibraryVideos[parseInt(indexs) + 1]"
        >
          {{ $t('studio.errors.e1') }}
        </video>
      </div>
      <!--div v-else>
        <video width="100%" height="auto" id="myvid" controls :src="initialVideo(indexs)">
          {{ $t('studio.errors.e1') }}
        </video>
      </div-->
      <!--<div v-else class="items-left mb-base">
        <h6 class="mb-2">{{$store.state.videoWiki.selectedAudios[indexs].name}}</h6>
        <audio class="audio-el" controls>
          <source :src="$store.state.videoWiki.API_URL + $store.state.videoWiki.selectedAudios[indexs].url" type="audio/mpeg">
          Your browser does not support the audio element.
        </audio>
      </div>-->
      <!-- <vs-button
        class="mb-3"
        id="vidbutton"
        @click="playVid"
        >Play Video</vs-button
      > -->
      <audio-recorder
        :sceneNum="indexs"
        @updateComponent="updateComponent"
      ></audio-recorder>
      <!--ul :class="'playlist_' + indexs" class="mb-base"></ul-->
      <!--div class="mb-base"></div-->
    </vx-card>
    <div style="margin-bottom: 150px"></div>
  </div>
</template>

<script>
import constants from '../../../constant';
import AudioRecorder from '../components/audioRecorder';
export default {
  name: 'AddMusic',
  components: { AudioRecorder },
  data() {
    return {
      constants,
    };
  },
  computed: {
    selectedFromLibraryVideos() {
      return this.$store.state.studio.selectedFromLibraryVideos;
    },
    addedAudioVideos() {
      return this.$store.state.studio.addedAudioVideos;
    },
    preparedScenesVideos() {
      return this.$store.state.studio.preparedScenesVideos;
    },
    insideIframe() {
      return this.$store.state.insideIframe;
    }
  },
  methods: {
    isImageUrl(urlString) {
      try {
        const imgExtentions = ['jpg', 'png', 'jpeg'];
        urlString = new URL(urlString);
        return imgExtentions.includes(urlString.pathname.split('.')[1]);
      } catch (err) {
        return false;
      }
    },
    updateComponent() {
      this.$forceUpdate();
    },
    callback(msg) {
      console.debug('Event: ', msg);
    },
    // audioVideoMerge() {},
    updateScroll() {
      // let scrollPosition = window.scrollY
      // console.log(scrollPosition)
      for (const s in this.$store.state.studio.scenes) {
        const rect = document
          .getElementById('scene_card_' + s)
          .getBoundingClientRect();
        // console.log(s, "bounding client", rect.top, rect.bottom);

        if (rect.top < 200 && rect.bottom > (this.insideIframe ? 420 : 500)) {
          // console.log(s+" is active")
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
.vs-con-loading__container {
  z-index: 10 !important;
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
.items-center {
  text-align: center;
  text-align: -moz-center;
  text-align: -webkit-center;
}
</style>
