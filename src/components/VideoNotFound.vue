<template>
  <div class="flex items-center justify-center">
    <vue-progress-bar class="absolute"></vue-progress-bar>
    <div class="flex items-center justify-center">
      <vs-button
        type="filled"
        class="mr-2"
        :size="$store.state.windowWidth < 400 ? 'small' : 'default'"
        @click="$emit('search', sceneNum)"
        >Search</vs-button
      >
      <input
        type="file"
        :id="`add_scene_${sceneNum}`"
        @change="uploadFile($event)"
        class="hidden"
        accept="video/*,image/*"
      />
      <vs-button
        type="filled"
        @click="chooseFile"
        :size="$store.state.windowWidth < 400 ? 'small' : 'default'"
        >Upload</vs-button
      >
    </div>
    <vs-popup title="Select Motion" :active.sync="showEffectModal">
      <div class="flex flex-wrap -m-3">
        <div class="w-1/5 p-3">
          <vx-card
            class="effect-card bg-primary text-white"
            @click="showEffectModal = false"
          >
            <div class="-m-3 text-center">
              <vs-icon icon="not_interested" size="45px" />
              <p>None</p>
            </div>
          </vx-card>
        </div>
        <div class="w-1/5 p-3">
          <vx-card
            class="effect-card bg-primary text-white"
            @click="selectImage(currentUploadedImage, 'in')"
          >
            <div class="-m-3 text-center">
              <vs-icon icon="zoom_in" size="45px" />
              <p>Zoom In</p>
            </div>
          </vx-card>
        </div>
        <div class="w-1/5 p-3">
          <vx-card
            class="effect-card bg-primary text-white"
            @click="selectImage(currentUploadedImage, 'out')"
          >
            <div class="-m-3 text-center">
              <vs-icon icon="zoom_out" size="45px" />
              <p>Zoom out</p>
            </div>
          </vx-card>
        </div>
      </div>
    </vs-popup>
  </div>
</template>
<script>
import VideoPreview from '../layouts/components/vertical-nav-menu/PanelItems/components/VideoPreview';
import ImagePreview from '../layouts/components/vertical-nav-menu/PanelItems/components/ImagePreview';
export default {
  name: 'VideoNotFound',
  props: ['sceneNum'],
  components: {
    VideoPreview,
    ImagePreview,
  },
  data() {
    return {
      showEffectModal: false,
      currentUploadedImage: null,
      searchQuery: '',
      searchInProgress: false,
      media: 'video',
      selectedVideo: {},
    };
  },
  computed: {
    searchedVideos() {
      return this.$store.state.studio.searchedVideos;
    },
    searchedImages() {
      return this.$store.state.studio.searchedImages;
    },
    keywords() {
      return this.$store.state.studio.keywords;
    },
  },
  methods: {
    selectImage(img, zoomType) {
      this.showEffectModal = false;
      this.showSearchModal = false;
      const dataObj = {
        image_url: img,
        zoom: zoomType,
        sceneNum: this.sceneNum,
      };
      this.$vs.loading({
        color: 'transparent',
        container: `#upload_scene_${this.sceneNum}`,
      });
      this.$store.commit('TOGGLE_PROGRESS_BAR', false);
      this.$Progress.start();
      this.$store
        .dispatch('studio/addMotionToImage', dataObj)
        .then(() => {
          this.$Progress.finish();
          this.$vs.loading.close();
        })
        .catch(() => {
          this.$Progress.fail();
          this.$vs.loading.close();
        })
        .finally(() => {
          this.$vs.loading.close(
            `#upload_scene_${this.sceneNum} > .con-vs-loading`
          );
          setTimeout(() => {
            this.$store.commit('TOGGLE_PROGRESS_BAR', true);
          }, 1000);
        });
    },
    chooseFile() {
      document.getElementById(`add_scene_${this.sceneNum}`).click();
    },
    uploadFile(event) {
      const selectedFile = event.target.files[0];
      this.$vs.loading({
        color: 'transparent',
        container: `#upload_scene_${this.sceneNum}`,
      });
      this.$store.commit('TOGGLE_PROGRESS_BAR', false);
      this.$Progress.start();
      // this.$vs.loading({ color: 'transparent' });
      this.$store
        .dispatch('studio/uploadMedia', selectedFile)
        .then((url) => {
          this.$Progress.finish();
          if (selectedFile.type.split('/')[0] === 'video') {
            this.$store.commit('studio/selectVideo', {
              sceneNum: this.sceneNum,
              value: url,
            });
          } else {
            this.showEffectModal = true;
          }
          this.currentUploadedImage = url;
          const dataObj = {
            sceneNum: this.sceneNum - 1,
            value: [selectedFile.name, url],
          };
          this.$store.commit('studio/setUploadedVideos', dataObj);
        })
        .catch(() => {
          this.$Progress.fail();
          //this.$vs.loading.close();
          this.$vs.notify({
            title: 'Error Occured',
            text: 'video upload failed',
            color: 'danger',
          });
        })
        .finally(() => {
          this.$vs.loading.close(
            `#upload_scene_${this.sceneNum} > .con-vs-loading`
          );
          setTimeout(() => {
            this.$store.commit('TOGGLE_PROGRESS_BAR', true);
          }, 1000);
        });
    },
  }
};
</script>
<style scoped>
.effect-card {
  display: flex;
  justify-content: center;
}
.effect-card:hover {
  cursor: pointer;
  transform: translateY(-5px);
  box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.25);
}
</style>
