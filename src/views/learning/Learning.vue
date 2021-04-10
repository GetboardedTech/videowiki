<template>
  <div>
    <!-- JUMBOTRON -->
    <div class="knowledge-base-jumbotron">
      <div class="knowledge-base-jumbotron-content text-position">
        <!--md:p-24 sm:p-16 p-6 mb-base"-->
        <h1
          class="mb-2 text-white text-left"
          style="font-size: 52px; font-weight: bold"
        >
          Anytime, Anywhere Learning
        </h1>
        <br />
        <p class="text-white" style="font-size: 24px">
          Simple video collabration between students and teachers.
        </p>
        <p class="text-white" style="font-size: 24px">
          Set your room and start your class.
        </p>
        <br />
        <vs-button
          size="large"
          @click="$router.push('/welcome')"
          color="rgb(255, 255,255)"
          text-color="#8D56F8"
          style="font-weight: bold; font-size: 16px"
        >
          Create Videos
        </vs-button>
        <br /><br />
      </div>
    </div>
    <div class="content">
      <vs-row vs-align="center pl-3">
        <vs-col vs-w="7">
          <div class="text-dark text-left" style="font-size: 20px">
            <b>What other creators made today.</b>
          </div>
        </vs-col>
        <vs-col vs-w="4" vs-type="flex">
          <!--vs-input
            icon-after="true"
            icon-no-border
            icon="search"
            placeholder="Search project"
          /-->
          <input
            type="text"
            class="custom-search-input"
            placeholder="Search Project"
          />
          <vs-icon icon="search" size="30px" class="input-icon"></vs-icon>
        </vs-col>
        <vs-col vs-w="1 " class="text-left">
          <button class="filter-btn">
            <img src="@/assets/images/filter.png" />
          </button>
        </vs-col>
      </vs-row>
      <vs-row vs-align="center" vs-type="flex" class="video-tiles" vs-w="12">
        <vs-col
          vs-w="4"
          vs-sm="6"
          vs-xs="12"
          :key="index"
          v-for="(col, index) in 12"
          vs-type="flex"
          vs-justify="center"
        >
          <VideoCard />
        </vs-col>
      </vs-row>
    </div>
    <div class="trending">
      <div class="trend-title text-dark pl-5" style="font-size: 20px">
        <b>Trending Searches</b>
      </div>
      <vs-row vs-align="center" vs-type="flex" class="video-tiles">
        <vs-col
          vs-w="4"
          :key="index"
          v-for="(col, index) in 3"
          vs-type="flex"
          vs-justify="center"
        >
          <VideoCard />
        </vs-col>
      </vs-row>
      <vs-row vs-justify="center" vs-type="flex">
        <vs-button color="primary" class="text-variant-1" type="filled"
          >Load More</vs-button
        >
      </vs-row>
    </div>
  </div>
</template>
<script>
import VideoCard from '@/views/components/VideoCard';
export default {
  name: 'Learning',
  components: {
    VideoCard
  },
  data() {
    return {};
  }
};
</script>
<style scoped>
.knowledge-base-jumbotron-content {
  background-image: url('../../assets/images/Frame.svg');
  background-size: cover;
  height: 446px;
  border-radius: 20px;
}
.content {
  margin-top: 10rem;
}
.video-tiles {
  margin-top: 4rem;
}
.trending {
  margin-top: 7rem;
  margin-bottom: 4rem;
}

.filter-btn {
  background: rgb(242, 242, 242) none repeat scroll 0% 0%;
  border-radius: 12px;
  height: 60px;
  width: 60px;
  border: none;
}
.text-variant-1 {
  font-size: 14px;
  font-weight: 600;
}
.text-position {
  padding: 8rem 3rem 2rem 4rem;
}
.input-icon {
  position: absolute;
  right: 226px;
  padding-top: 15px;
}
</style>
