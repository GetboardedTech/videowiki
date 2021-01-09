<template>
  <div>
    <vs-tabs alignment="fixed">
      <vs-tab label="Explore">
        <div>
          <feed></feed>
          <feed></feed>
          <feed></feed>
        </div>
      </vs-tab>
      <vs-tab label="Topics">
        <div></div>
      </vs-tab>
      <vs-tab label="Trending">
        <div></div>
      </vs-tab>
      <vs-tab label="Contributors">
        <div></div>
      </vs-tab>
    </vs-tabs>
  </div>
</template>
<script>
import Feed from './Feed.vue';
export default {
  data: () => ({
    activeItem: 0
  }),
  components: { Feed }
};
</script>
