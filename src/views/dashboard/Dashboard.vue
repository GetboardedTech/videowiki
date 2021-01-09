<template>
  <div>
    <TheHeader />
    <div
      class="vs-con-loading__container"
      id="div-with-loading"
      :class="{ 'h-72': isLoading }"
    ></div>
    <div v-if="!isLoading">
      <div class="vx-row p-8" v-if="reversedVideoList.length > 0">
        <VideoCard
          v-for="video in reversedVideoList"
          :key="video.id"
          :prop="video"
          :user="false"
        />
      </div>
      <div v-else class="flex h-72 justify-center items-center flex-wrap">
        <h4 class="text-danger">No videos published yet</h4>
      </div>
    </div>
  </div>
</template>
<script>
import TheHeader from '@/layouts/components/navbar/NavbarDashboard';
import VideoCard from './components/VideoCard';
import { ajaxCallMixin } from '../../http/HttpCommon';
export default {
  name: 'Dashboard',
  mixins: [ajaxCallMixin],
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
    reversedVideoList() {
      return this.videoList.slice().reverse();
    },
  },
  mounted() {
    this.getVideoList();
  },
  methods: {
    getVideoList() {
      const url = '/videoapi/home_videos';
      this.$vs.loading({
        background: 'transparent',
        container: '#div-with-loading',
      });
      this.isLoading = true;
      this.getRequest(url, this.handleResponse);
    },
    handleResponse(apiResponse) {
      this.$vs.loading.close('#div-with-loading > .con-vs-loading');
      this.isLoading = false;
      this.videoList = apiResponse.data;
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
