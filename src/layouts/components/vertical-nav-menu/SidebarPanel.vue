<template>
  <vs-row>
    <vs-col
      class="p-3"
      vs-type="flex"
      vs-justify="center"
      vs-align="center"
      vs-w="3"
      style="display: block"
    >
      <vs-row>
        <vs-col class="mb-2">
          <div
            class="vx-card"
            :class="{ selected: $store.state.studio.panel.text }"
            @click="toggleText"
          >
            <div class="vx-card__collapsible-content vs-con-loading__container">
              <div class="vx-card__body items-center">
                <vs-avatar color="primary" icon="text_fields" /><br />
                <span class="font-semibold">{{
                  $t('studio.sidebarPanel.sp1')
                }}</span>
              </div>
            </div>
          </div>
        </vs-col>
        <vs-col class="mb-2">
          <div
            class="vx-card"
            :class="{ selected: $store.state.studio.panel.library }"
            @click="toggleLibrary"
          >
            <div class="vx-card__collapsible-content vs-con-loading__container">
              <div class="vx-card__body items-center">
                <vs-avatar color="primary" icon="grid_on" /><br />
                <span class="font-semibold">{{
                  $t('studio.sidebarPanel.sp2')
                }}</span>
              </div>
            </div>
          </div>
        </vs-col>
        <!--vs-col class="mb-2">
          <div
            class="vx-card"
            :class="{ selected: $store.state.studio.panel.style }"
            @click="toggleStyle"
          >
            <div class="vx-card__collapsible-content vs-con-loading__container">
              <div class="vx-card__body items-center">
                <vs-avatar color="primary" icon="image" /><br />
                <span class="font-semibold">{{
                  $t('studio.sidebarPanel.sp3')
                }}</span>
              </div>
            </div>
          </div>
        </vs-col-->
        <vs-col class="mb-2">
          <div
            class="vx-card"
            :class="{ selected: $store.state.studio.panel.scenes }"
            @click="toggleScenes"
          >
            <div class="vx-card__collapsible-content vs-con-loading__container">
              <div class="vx-card__body items-center">
                <vs-avatar color="primary" icon="menu_book" /><br />
                <span class="font-semibold">{{
                  $t('studio.sidebarPanel.sp4')
                }}</span>
              </div>
            </div>
          </div>
        </vs-col>
        <vs-col class="mb-2">
          <div
            class="vx-card"
            :class="{ selected: $store.state.studio.panel.music }"
            @click="toggleMusic"
          >
            <div class="vx-card__collapsible-content vs-con-loading__container">
              <div class="vx-card__body items-center">
                <vs-avatar color="primary" icon="library_music" /><br />
                <span class="font-semibold">{{
                  $t('studio.sidebarPanel.sp5')
                }}</span>
              </div>
            </div>
          </div>
        </vs-col>
        <vs-col class="mb-2">
          <div
            class="vx-card"
            :class="{ selected: $store.state.studio.panel.publish }"
            @click="togglePublish"
          >
            <div class="vx-card__collapsible-content vs-con-loading__container">
              <div class="vx-card__body items-center">
                <vs-avatar color="primary" icon="publish" /><br />
                <span class="font-semibold">{{
                  $t('studio.sidebarPanel.sp6')
                }}</span>
              </div>
            </div>
          </div>
        </vs-col>
      </vs-row>
    </vs-col>
    <vs-col
      class="p-3"
      vs-type="flex"
      vs-justify="center"
      vs-align="center"
      vs-w="9"
      style="display: block"
    >
      <TextPanel v-if="$store.state.studio.panel.text" />
      <LibraryPanel v-else-if="$store.state.studio.panel.library" />
      <ScenesPanel v-else-if="$store.state.studio.panel.scenes" />
      <MusicPanel v-else-if="$store.state.studio.panel.music" />
      <StylePanel v-else-if="$store.state.studio.panel.style" />
      <PublishPanel v-else-if="$store.state.studio.panel.publish" />
    </vs-col>
  </vs-row>
</template>

<script>
import TextPanel from './PanelItems/TextPanel.vue';
import StylePanel from './PanelItems/StylePanel';
import LibraryPanel from './PanelItems/LibraryPanel';
import MusicPanel from './PanelItems/MusicPanel';
import ScenesPanel from './PanelItems/ScenesPanel';
import PublishPanel from './PanelItems/PublishPanel';
export default {
  name: 'SidebarPanel',
  components: {
    PublishPanel,
    ScenesPanel,
    MusicPanel,
    LibraryPanel,
    StylePanel,
    TextPanel,
  },
  data() {
    return {};
  },
  methods: {
    toggleText() {
      this.$store.commit('studio/toggleText');
    },
    toggleLibrary() {
      /* const sceneNum = this.$store.state.studio.invalidScenes.findIndex(
        (scene) => scene
      ); */
      if (Object.keys(this.$store.state.studio.videos).length === 0) {
        this.toggleText();
        this.$vs.notify({
          color: 'primary',
          // title: "Cannot",
          text: this.$t('studio.sidebarPanel.sp7'),
        });
      } /* else if (sceneNum !== -1) {
        this.$vs.notify({
          color: 'primary',
          // title: "Cannot",
          text: `Change Script for highlighted Scenes`,
        });
      } */ else {
        this.$store.commit('studio/toggleLibrary');
      }
    },
    toggleStyle() {
      if (Object.keys(this.$store.state.studio.videos).length === 0) {
        this.toggleLibrary();
        this.$vs.notify({
          color: 'primary',
          // title: "Cannot",
          text: this.$t('studio.sidebarPanel.sp8'),
        });
      } else {
        this.$store.commit('studio/toggleStyle');
      }
    },
    toggleScenes() {
      /* const sceneNum = this.$store.state.studio.sceneImage.findIndex(
        (scene) => scene
      ); */
      if (
        this.$store.state.studio.selectedFromLibraryVideos.length ===
        0 /* this.$store.state.studio.videoWidth === null || this.$store.state.studio.videoHeight === null */
      ) {
        // this.toggleStyle();
        this.toggleLibrary();
        this.$vs.notify({
          color: 'primary',
          // title: "Cannot",
          text: this.$t('studio.sidebarPanel.sp8'),
        });
      } /* else if (sceneNum !== -1) {
        //this.$store.commit('studio/setActiveScene', sceneNum + 1);
        const el = document.getElementById(`scene_card_${sceneNum}`);
        el.scrollIntoView({block:'center'});
        this.$vs.notify({
          color: 'primary',
          // title: "Cannot",
          text: `Select/Upload Video for Scene ${sceneNum + 1}`,
        });
      } */ else {
        this.$store.commit('studio/toggleScenes');
      }
    },
    toggleMusic() {
      if (
        !this.$store.state.studio.skipSubtitles &&
        this.$store.state.studio.preparedScenesVideos.length === 0
      ) {
        this.toggleScenes();
        this.$vs.notify({
          color: 'primary',
          // title: "Cannot",
          text: this.$t('studio.sidebarPanel.sp10'),
        });
      } else {
        this.$store.commit('studio/toggleMusic');
      }
    },
    togglePublish() {
      if (
        !this.$store.state.studio.backgroundMusic.url &&
        !this.$store.state.studio.skipMusic &&
        this.$store.state.studio.addedAudioVideos.length === 0
      ) {
        this.toggleMusic();
        this.$vs.notify({
          color: 'primary',
          // title: "Cannot",
          text: this.$t('studio.sidebarPanel.sp11'),
        });
      } else {
        this.$store.commit('studio/togglePublish');
      }
    },
  },
};
</script>

<style scoped>
.vx-card {
  cursor: pointer;
}

.vx-card > .vx-card__collapsible-content > .vx-card__body {
  padding: 0.8rem !important;
}

.vx-card > .vx-card__collapsible-content {
  transition: none;
}

.selected {
  color: white;
  background: #7367f0;
}

.items-center {
  text-align: center;
  text-align: -moz-center;
  text-align: -webkit-center;
}
</style>
