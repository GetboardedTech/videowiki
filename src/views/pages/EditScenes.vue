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
      <div
        class="scene-video mb-base"
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
      <vs-row class="mb-5">
        <div class="items-left mr-3 lg:w-1/3 md:w-1/3 w-1/2">
          <small class="items-left">{{ $t('studio.course.c1') }}</small
          ><br />
          <!--vs-select v-model="sceneScriptPosition[indexs]">
            <vs-select-item
              v-for="(item, index) in options"
              :key="index"
              :value="item.id"
              :text="item.label"
            />
          </vs-select-->
          <v-select
            :options="options"
            :reduce="(label) => label.id"
            required
            label="label"
            @input="setScriptPosition(indexs, $event)"
            :value="getStyle('sceneScriptPosition', indexs)"
          ></v-select>
        </div>
        <div class="items-left mr-3">
          <small class="items-left">{{ $t('studio.course.c2') }}</small
          ><br />
          <v-swatches
            :value="getStyle('sceneScriptColor', indexs) || '#808080'"
            @input="setScriptColor(indexs, $event)"
            popover-x="right"
            swatches="text-advanced"
          ></v-swatches>
        </div>
        <div class="items-left mr-3">
          <small class="items-left">{{ $t('studio.course.c3') }}</small
          ><br />
          <v-swatches
            :value="getStyle('sceneBackgroundColor', indexs) || '#000000'"
            @input="setBackgroundColor(indexs, $event)"
            popover-x="right"
            swatches="text-advanced"
          ></v-swatches>
        </div>
      </vs-row>
      <div class="items-left mb-3">
        <small class="items-left">{{ $t('studio.course.c4') }}</small>
        <p
          contenteditable="true"
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
import vSelect from 'vue-select';
import 'vue-swatches/dist/vue-swatches.css';
import 'vue-select/dist/vue-select.css';
export default {
  name: 'EditScenes',
  data() {
    return {
      constants,
      options: [
        { id: 1, label: 'Top' },
        { id: 2, label: 'Center' },
        { id: 3, label: 'Bottom' },
      ],
      defaultStyle: {
        sceneScriptColor: '#808080',
        sceneScriptPosition: 3,
        sceneBackgroundColor: '#000000',
      },
    };
  },
  components: {
    vSwatches,
    vSelect,
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
    },
  },
  methods: {
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
          value: this.defaultStyle[prop],
        });
      }
      return this.styles[idx][prop];
    },
    setScriptColor(idx, value) {
      this.$store.commit('studio/setStyles', {
        prop: 'sceneScriptColor',
        sceneNum: parseInt(idx),
        value: value,
      });
    },
    setScriptPosition(idx, value) {
      this.$store.commit('studio/setStyles', {
        prop: 'sceneScriptPosition',
        sceneNum: parseInt(idx),
        value: value,
      });
    },
    setBackgroundColor(idx, value) {
      this.$store.commit('studio/setStyles', {
        prop: 'sceneBackgroundColor',
        sceneNum: parseInt(idx),
        value: value,
      });
    },
    prepareScene(indexs) {
      /* console.log(
        'selected videos',
        this.$store.state.studio.selectedFromLibraryVideos
      ); */
      /* this.$Progress.start();
      this.$vs.loading({ color: 'transparent' }); */
      this.$vs.loading({
        background: '#fff',
        container: `#scene_card_${indexs}`,
        text: 'Adding Subtitles...',
      });
      this.$store.commit(
        'studio/editSceneScript',
        document.getElementById('scene_script_' + indexs).innerText
      );
      const dataObj = {
        url: this.$store.state.studio.selectedFromLibraryVideos[
          parseInt(indexs) + 1
        ],
        sceneScript: this.$store.state.studio.scenes[parseInt(indexs)],
        /* sceneScriptPosition: this.sceneScriptPosition[indexs],
        sceneScriptColor: this.sceneScriptColor[indexs],
        sceneBackgroundColor: this.sceneBackgroundColor[indexs], */
        ...this.styles[indexs],
      };
      this.$store
        .dispatch('studio/editSceneScript', dataObj)
        .then((res) => {
          const response = {
            sceneNum: parseInt(indexs) + 1,
            value: res.data.video_url,
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
        .catch((err) => {
          console.log('edit scene script', err);
          /*this.$Progress.fail();
          this.$vs.loading.close();*/
          this.$vs.notify({
            title: 'Error',
            text: 'Cannot merge script with video',
            color: 'danger',
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
</style>
