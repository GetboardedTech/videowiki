<template>
  <div class="items-center">
    <div class="w-full lg:w-2/3 md:w-2/3">
      <EditScript v-if="$store.state.studio.panel.text" />
      <SelectVideos v-else-if="$store.state.studio.panel.library" />
      <!--FormatVideo v-else-if="$store.state.studio.panel.style" /-->
      <EditScenes v-else-if="$store.state.studio.panel.scenes" />
      <AddMusic v-else-if="$store.state.studio.panel.music" />
      <PublishVideo v-else-if="$store.state.studio.panel.publish" />
    </div>
  </div>
</template>

<script>
import EditScript from './pages/EditScript';
import SelectVideos from './pages/SelectMedia';
import PublishVideo from './pages/PublishVideo';
import EditScenes from './pages/EditScenes';
import AddMusic from './pages/AddMusic';
import FormatVideo from './pages/FormatVideo';
export default {
  data() {
    return {};
  },
  components: {
    FormatVideo,
    AddMusic,
    EditScenes,
    PublishVideo,
    SelectVideos,
    EditScript
  },
  created() {
    if (this.$route.params.videoId) {
      this.$vs.loading();
      this.getVideoData();
    } else this.clearState();
  },
  methods: {
    getVideoData() {
      this.$store
        .dispatch('studio/getVideoData', this.$route.params.videoId)
        .then(res => {
          this.$store
            .dispatch('studio/videoSuggestions')
            .then(() => {})
            .catch(() => {
              this.$router.push('/myvideos');
              this.$vs.notify({
                title: 'Error',
                text: 'Cannot fecth video data',
                color: 'danger'
              });
            })
            .finally(() => {
              this.$vs.loading.close();
            });
        })
        .catch(() => {
          this.$vs.loading.close();
          this.$router.push('/myvideos');
          this.$vs.notify({
            title: 'Error',
            text: 'Cannot fecth video data',
            color: 'danger'
          });
        });
    },
    clearState() {
      this.$store.dispatch('studio/resetState');
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
</style>
