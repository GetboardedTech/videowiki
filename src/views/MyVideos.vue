<template>
  <div>
    <TheHeader />
    <vs-tabs>
      <vs-tab
        label="Published Videos"
        class="p-8 vs-con-loading__container"
        id="div-with-loading"
      >
        <div v-if="publishedVideoList.length > 0" class="vx-row">
          <VideoCard
            v-for="video in publishedVideoList"
            :key="video.id"
            :prop="video"
            :user="true"
          />
        </div>
        <div v-else class="flex h-72 justify-center items-center flex-wrap">
          <h4 class="text-danger">No Published videos</h4>
        </div>
      </vs-tab>
      <vs-tab label="Saved Videos" class="p-8">
        <div class="vx-row" v-if="savedVideoList.length > 0">
          <VideoCard
            v-for="video in savedVideoList"
            :key="video.id"
            :prop="video"
            :user="true"
          />
        </div>
        <div v-else class="flex h-72 justify-center items-center flex-wrap">
          <h4 class="text-danger">No Saved Videos</h4>
        </div>
      </vs-tab>
    </vs-tabs>
  </div>
</template>
<script>
import TheHeader from '@/layouts/components/navbar/NavbarDashboard';
import VideoCard from './dashboard/components/VideoCard';
import axios from '../axios';
import constants from '../../constant';
export default {
  name: 'MyVideos',
  components: {
    TheHeader,
    VideoCard,
  },
  data() {
    return {
      videoList: [],
      isLoading: false,
    };
  },
  computed: {
    savedVideoList() {
      return this.videoList
        .filter((video) => video.is_save_later)
        .slice()
        .reverse();
    },
    publishedVideoList() {
      return this.videoList
        .filter((video) => !video.is_save_later)
        .slice()
        .reverse();
    },
  },
  mounted() {
    this.getUserVideos();
  },
  methods: {
    getUserVideos() {
      /*this.$vs.loading({
        background: 'transparent',
        container: '#div-with-loading',
      });*/
      axios
        .get(constants.apiUrl + '/videoapi/user_videos')
        .then((res) => {
          this.videoList = res.data.data;
        })
        .catch(() => {
          this.$vs.notify({
            title: 'Error',
            text: 'Cannot fetch videos',
            color: 'danger',
          });
        })
        .finally(() => {
          /*this.$vs.loading.close('#div-with-loading > .con-vs-loading');
          this.isLoading = false;*/
        });
    },
  },
};
</script>
<style scoped>
/*.content {
  padding-top: 3rem;
  padding-left: 1.75rem;
  padding-right: 1.75rem;
  background: #e5e5e5;
}*/
</style>
