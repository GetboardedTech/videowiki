<template>
  <div>
    <!--<vs-card title="Screen Resolution Preview" :style="cardStyle">
      <div slot="media">
        <img src="@/assets/images/pages/content-img-4.jpg" alt="screen-resolution" class="responsive card-img-top"/>
      </div>
    </vs-card>-->
    <img
      src="@/assets/images/pages/content-img-4.jpg"
      alt="screen-resolution"
      class="shadow responsive card-img-top"
      :style="cardStyle"
      width="{videoWidth}"
      height="{videoHeight}"
    />
    <!-- <vx-card
      v-for="(s, indexs) in $store.state.studio.scenes"
      :key="indexs"
      :id="'scene_card_' + indexs"
      class="scene-card"
      :class="{
        activeScene:
          $store.state.studio.currentActiveScene === parseInt(indexs) + 1
      }"
    >
      <p class="font-semibold items-left mb-base" style="white-space: normal;">
        {{ s }}
      </p>
      <div v-if="selectedFromLibraryVideos[parseInt(indexs) + 1] !== undefined">
        <video
          width="100%"
          height="auto"
          controls
          id="link"
          :src="selectedFromLibraryVideos[parseInt(indexs) + 1]"
        >
          {{ $t('studio.errors.e1') }}
        </video>
      </div>
      <div v-else>
        <video width="100%" height="auto" id="link" controls :src="initialVideo(indexs)">
          {{ $t('studio.errors.e1') }}
        </video>
      </div>
    </vx-card> -->
  </div>
</template>

<script>
export default {
  name: 'FormatVideo',
  computed: {
    selectedFromLibraryVideos() {
      return this.$store.state.studio.selectedFromLibraryVideos;
    },
    videoWidth: {
      get() {
        return this.$store.state.studio.videoWidth;
      }
    },
    videoHeight: {
      get() {
        return this.$store.state.studio.videoHeight;
      }
    },
    cardStyle: {
      get() {
        return {
          width: `${parseInt(this.videoWidth) / 2}px`,
          height: `${parseInt(this.videoHeight) / 2}px`
        };
      }
    }
  }
};
</script>

<style scoped>
img {
  -webkit-transition: all 0.3s ease-in-out;
}
</style>
