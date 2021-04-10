<template>
  <div class="flex items-center justify-center">
    <!--vue-progress-bar class="absolute"></vue-progress-bar-->
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
            @click="selectImage('None')"
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
            @click="selectImage('in')"
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
            @click="selectImage('out')"
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
export default {
  name: 'VideoNotFound',
  props: ['sceneNum'],
  data() {
    return {
      showEffectModal: false,
      currentUploadedImage: null
    };
  },
  methods: {
    selectImage(zoomType) {
      this.showEffectModal = false;
      const dataObj = {
        image_url: this.currentUploadedImage,
        zoom: zoomType
      };
      this.$vs.loading({
        container: `#upload_scene_${this.sceneNum}`
      });
      // this.$Progress.start();
      this.$store
        .dispatch('studio/addMotionToImage', dataObj)
        .then(data => {
          this.$store.commit('studio/selectVideo', {
            value: data.url,
            sceneNum: this.sceneNum
          });
        })
        .catch(() => {
          // this.$Progress.fail();
          // this.$vs.loading.close();
        })
        .finally(() => {
          this.$vs.loading.close(
            `#upload_scene_${this.sceneNum} > .con-vs-loading`
          );
        });
    },
    chooseFile() {
      document.getElementById(`add_scene_${this.sceneNum}`).click();
    },
    uploadFile(event) {
      const selectedFile = event.target.files[0];
      this.$vs.loading({
        container: `#upload_scene_${this.sceneNum}`
      });
      this.$store
        .dispatch('studio/uploadMedia', selectedFile)
        .then(url => {
          if (selectedFile.type.split('/')[0] === 'video') {
            this.$store.commit('studio/selectVideo', {
              sceneNum: this.sceneNum,
              value: url
            });
          } else {
            this.showEffectModal = true;
          }
          this.currentUploadedImage = url;
          const dataObj = {
            fileName: selectedFile.name,
            url
          };
          this.$store.commit('studio/setUploadedMedia', dataObj);
        })
        .catch(() => {
          this.$vs.notify({
            title: 'Error Occured',
            text: 'Media upload failed',
            color: 'danger'
          });
        })
        .finally(() => {
          this.$vs.loading.close(
            `#upload_scene_${this.sceneNum} > .con-vs-loading`
          );
        });
    }
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
