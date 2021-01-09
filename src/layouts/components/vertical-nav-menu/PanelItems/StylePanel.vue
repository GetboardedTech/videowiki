<template>
  <div class="vx-card" style="height: 100%;">
    <div class="vx-card__collapsible-content vs-con-loading__container">
      <div class="vx-card__body">
        <h6 class="mb-3">{{ $t('studio.sidebarPanel.format.f1') }}</h6>
        <vs-select
          v-model="aspectRatio"
          class="w-full mb-base"
          label=""
          @click="res1_1"
        >
          <vs-select-item
            @click="res1_1"
            :key="index"
            :value="item.id"
            :text="item.label"
            v-for="(item, index) in aroptions"
            class="w-full"
          />
        </vs-select>
        <h6 class="mb-3">{{ $t('studio.sidebarPanel.format.f2') }}</h6>
        <vs-select v-model="resolution" class="w-full" label="" @click="res1_1">
          <vs-select-item
            @click="res1_1"
            :key="index"
            :value="item.id"
            :text="item.label"
            v-for="(item, index) in resoptions"
            class="w-full"
          />
        </vs-select>
        <!--<vx-card class="mb-base" @click="res1_1()"><h3>1 : 1</h3></vx-card>
        <vx-card class="mb-base" @click="res4_3()"><h3>4 : 3</h3></vx-card>
        <vx-card class="mb-base" @click="res16_9()"><h3>16 : 9</h3></vx-card>
        <vx-card class="mb-base" @click="res2_3()"><h3>2 : 3</h3></vx-card>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StylePanel',
  data() {
    return {
      aroptions: [
        { id: 1, label: '1:1' },
        { id: 2, label: '4:3' },
        { id: 3, label: '16:9' },
        { id: 4, label: '2:3' }
      ],
      aspectRatio: null,
      resoptions: [
        { id: 1, label: '640 x 480' },
        { id: 2, label: '800 x 600' },
        { id: 3, label: '960 x 720' },
        { id: 4, label: '1024 x 768' }
      ],
      resolution: null
    };
  },
  methods: {
    res1_1() {
      this.$store.commit('studio/setVideoWidth', 720);
      this.$store.commit('studio/setVideoHeight', 720);
    },
    res4_3() {
      this.$store.commit('studio/setVideoWidth', 720);
      this.$store.commit('studio/setVideoHeight', 540);
    },
    res16_9() {
      this.$store.commit('studio/setVideoWidth', 720);
      this.$store.commit('studio/setVideoHeight', 405);
    },
    res2_3() {
      this.$store.commit('studio/setVideoWidth', 720);
      this.$store.commit('studio/setVideoHeight', 1080);
    }
  }
};
</script>

<style scoped></style>
