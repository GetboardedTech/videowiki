<template>
  <div style="margin-top: 50px">
    <div class="grid grid-cols-4 gap-4">
      <left-pannel class="h-100" style="max-height: 450px"></left-pannel>
      <div class="col-span-2 pl-4">
        <nav-bar class="h-12" style="margin-top: -20px;"></nav-bar>
      </div>
      <trending-creators
        class="h-100"
        style="max-height: 450px"
      ></trending-creators>
    </div>
  </div>
</template>

<script>
import LeftPannel from './LeftPannel.vue';
import TrendingCreators from './TrendingCreators.vue';
import NavBar from './NavBar.vue';

export default {
  data() {
    return {};
  },
  components: { LeftPannel, TrendingCreators, NavBar }
};
</script>
