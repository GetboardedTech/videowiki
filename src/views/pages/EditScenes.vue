<template>
  <div>
    <vx-card
      v-for="(s, indexs) in $store.state.studio.scenes"
      :key="indexs"
      :id="'scene_card_' + indexs"
      class="scene-card vs-con-loading__container"
      :class="{
        activeScene:
          $store.state.studio.currentActiveScene === parseInt(indexs) + 1
      }"
    >
      <div
        class="scene-video mb-4"
        :id="`scene_video_${indexs}`"
        :key="JSON.stringify(preparedScenesVideos)"
      >
        <video
          width="100%"
          height="auto"
          controls
          v-if="preparedScenesVideos[parseInt(indexs) + 1]"
        >
          <source
            :src="preparedScenesVideos[parseInt(indexs) + 1]"
            type="video/mp4"
          />
          {{ $t('studio.errors.e1') }}
        </video>
        <div v-else>
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
            controls
            :src="selectedFromLibraryVideos[parseInt(indexs) + 1]"
          >
            {{ $t('studio.errors.e1') }}
          </video>
        </div>
      </div>
      <div class="flex flex-wrap justify-between items-center mb-4">
        <div class="flex items-center -mx-2 edit-subtitles m-2">
          <div class="px-2">
            <h6 class="text-primary">Subtitles</h6>
          </div>
          <div class="px-2" style="transform: translate(0px, 3px)">
            <position-dropdown
              @input="setScriptPosition(indexs, $event)"
              :value="getStyle('sceneScriptPosition', indexs)"
            />
          </div>
          <div class="px-2">
            <!--alignment-dropdown :value="scriptAlign" /-->
            <img src="@/assets/images/pages/align-left.svg" alt="align-left" />
          </div>
          <div class="px-2">
            <v-swatches
              :value="getStyle('sceneScriptColor', indexs)"
              @input="setScriptColor(indexs, $event)"
              popover-x="right"
              popover-y="top"
              swatches="text-advanced"
            >
              <div slot="trigger"><h4 class="text-primary">T</h4></div>
            </v-swatches>
          </div>
          <div class="px-2">
            <v-swatches
              :value="getStyle('sceneBackgroundColor', indexs)"
              @input="setBackgroundColor(indexs, $event)"
              popover-x="right"
              popover-y="top"
              swatches="text-advanced"
            >
              <div
                slot="trigger"
                class="bg-primary rounded-sm"
                style="width: 24px"
              >
                <h4 class="text-white">T</h4>
              </div>
            </v-swatches>
          </div>
          <div class="px-2">
            <vx-tooltip text="Remove Subtitles">
              <button
                :disabled="!preparedScenesVideos[parseInt(indexs) + 1]"
                @click="removePreparedScene(indexs)"
                style="
                  background: none;
                  border: none;
                  transform: translate(0px, 1px);
                "
              >
                <vs-icon
                  type="filled"
                  icon="cancel"
                  :color="
                    !preparedScenesVideos[parseInt(indexs) + 1] ? '' : 'primary'
                  "
                  class="cursor-pointer"
                  size="24px"
                />
              </button>
            </vx-tooltip>
          </div>
        </div>
        <!--div
          v-if="parseInt(indexs) + 1 < sceneLength"
          class="flex items-center -mx-2 edit-transition px-2 p-1"
        >
          <div class="mr-2">
            <h6 class="text-primary">Transition</h6>
          </div>
          <transition-dropdown
            @input="setSceneTransition(indexs, $event)"
            :value="getSceneTransition(indexs)"
          />
        </div-->
      </div>
      <div class="items-left mb-3">
        <small class="items-left">{{ $t('studio.course.c4') }}</small>
        <p
          contenteditable
          :id="'scene_script_' + indexs"
          class="scene-text"
          style="white-space: normal"
        >
          {{ s }}
        </p>
      </div>
      <vs-button @click="prepareScene(indexs)" :disabled="isVideoUrl(indexs)"
        >{{ $t('studio.course.c5') }} {{ parseInt(indexs) + 1 }}</vs-button
      >
    </vx-card>
  </div>
</template>

<script>
import constants from '../../../constant';
import vSwatches from 'vue-swatches';
// import vSelect from 'vue-select';
import 'vue-swatches/dist/vue-swatches.css';
// import 'vue-select/dist/vue-select.css';
import VxTooltip from '../../layouts/components/vx-tooltip/VxTooltip.vue';
import PositionDropdown from './components/PositionDropdown.vue';
// import AlignmentDropdown from './components/AlignmentDropdown';
// import TransitionDropdown from './components/TransitionDropdown';
export default {
  name: 'EditScenes',
  data() {
    return {
      constants,
      defaultStyle: {
        sceneScriptColor: '#ffffff',
        sceneScriptPosition: 3,
        sceneBackgroundColor: '#674ea7',
        transition_type: 'left_to_right'
      },
      scriptAlign: 'left'
    };
  },
  components: {
    vSwatches,
    // vSelect,
    VxTooltip,
    PositionDropdown,
    // AlignmentDropdown,
    // TransitionDropdown
  },
  computed: {
    preparedScenesVideos() {
      return this.$store.state.studio.preparedScenesVideos;
    },
    selectedFromLibraryVideos() {
      return this.$store.state.studio.selectedFromLibraryVideos;
    },
    styles() {
      return this.$store.state.studio.styles;
    }
    /* sceneTransitionList() {
      return this.$store.state.studio.sceneTransition;
    },
    sceneLength() {
      return Object.keys(this.$store.state.studio.scenes).length;
    }, */
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
    scriptInput(e) {
      this.$store.commit('studio/editSceneScript', e.target.innerText);
    },
    isVideoUrl(indexs) {
      const videoUrl = this.selectedFromLibraryVideos[parseInt(indexs) + 1];
      if (videoUrl) {
        const url = videoUrl.split('.');
        if (url[url.length - 1] === 'gif') return true;
        return false;
      }
      return true;
    },
    getStyle(prop, idx) {
      idx = parseInt(idx);
      if (!this.styles[idx] || !this.styles[idx][prop]) {
        this.$store.commit('studio/setStyles', {
          prop: prop,
          sceneNum: idx,
          value: this.defaultStyle[prop]
        });
      }
      return this.styles[idx][prop];
    },
    setScriptColor(idx, value) {
      this.$store.commit('studio/setStyles', {
        prop: 'sceneScriptColor',
        sceneNum: parseInt(idx),
        value: value
      });
    },
    setScriptPosition(idx, value) {
      console.log({ sceneNum: idx, pos: value });
      this.$store.commit('studio/setStyles', {
        prop: 'sceneScriptPosition',
        sceneNum: parseInt(idx),
        value: value
      });
    },
    setBackgroundColor(idx, value) {
      this.$store.commit('studio/setStyles', {
        prop: 'sceneBackgroundColor',
        sceneNum: parseInt(idx),
        value: value
      });
    },
    setScriptAlignment(idx, value) {
      this.$store.commit('studio/setStyles', {
        prop: 'transition_type',
        sceneNum: parseInt(idx),
        value: value
      });
    },
    /* setSceneTransition(idx, value) {
      this.$store.commit('studio/setTransition', {
        sceneNum: parseInt(idx),
        value,
      });
    },
    getSceneTransition(idx) {
      if (this.sceneTransitionList[parseInt(idx)])
        return this.sceneTransitionList[parseInt(idx)];
      else {
        this.setSceneTransition(idx, 'no_motion');
        return 'no_motion';
      }
    }, */
    removePreparedScene(indexs) {
      this.$store.commit('studio/setScriptSceneVideo', {
        sceneNum: parseInt(indexs) + 1,
        value: null
      });
    },
    async prepareScene(indexs) {
      this.$vs.loading({
        background: '#fff',
        container: `#scene_card_${indexs}`,
        text: 'Adding Subtitles...'
      });
      this.$store.commit('studio/editSceneScript', {
        value: document.getElementById('scene_script_' + indexs).innerText,
        sceneNum: parseInt(indexs)
      });
      const dataObj = {
        url: this.$store.state.studio.selectedFromLibraryVideos[
          parseInt(indexs) + 1
        ],
        sceneScript: this.$store.state.studio.scenes[parseInt(indexs)],
        bg_opacity: 0.8,
        transition_type: 'right_to_left',
        ...this.styles[indexs]
      };
      this.$store
        .dispatch('studio/editSceneScript', dataObj)
        .then(res => {
          const response = {
            sceneNum: parseInt(indexs) + 1,
            value: res.data.video_url
          };
          this.$store.commit('studio/setScriptSceneVideo', response);
          // this.$store.commit('studio/selectVideo', res.data.url);
          console.log('edit scene script', res.data.url);
          // dataObj.video = res.data.url;
          // console.log(dataObj);
          this.$forceUpdate();
          /* this.$Progress.finish();
          this.$vs.loading.close(); */
          this.updateComponent();
        })
        .catch(err => {
          console.log('edit scene script', err);
          /* this.$Progress.fail();
          this.$vs.loading.close(); */
          this.$vs.notify({
            title: 'Error',
            text: 'Cannot merge script with video',
            color: 'danger'
          });
        })
        .finally(() => {
          this.$vs.loading.close(`#scene_card_${indexs} > .con-vs-loading`);
        });
    },
    updateComponent() {
      this.$forceUpdate();
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
          this.$store.commit('studio/setActiveScene', parseInt(s) + 1);
        }
      }
    }
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
  }
};
</script>

<style scoped>
.vs-con-loading__container {
  z-index: 20 !important;
}
.scene-card {
  min-height: 30rem;
  opacity: 0.2;
  box-shadow: none;
  margin-bottom: 10rem;
}
.scene-video {
  margin: -1.3rem -1.3rem 0;
}
.activeScene {
  box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.1) !important;
  -webkit-box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.1) !important;
  opacity: 1 !important;
}
.items-left {
  text-align: left;
  text-align: -moz-left;
  text-align: -webkit-left;
}
.items-right {
  text-align: right;
  text-align: -moz-right;
  text-align: -webkit-right;
}
.scene-text {
  border: 1px solid gray;
  border-radius: 3px;
  padding: 0.5rem;
}
.edit-subtitles {
  background: rgba(107, 77, 189, 0.06);
  border-radius: 4px;
  padding: 5px;
}
.edit-transition {
  background: rgba(107, 77, 189, 0.06);
  border-radius: 4px;
}
</style>
