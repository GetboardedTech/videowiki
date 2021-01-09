<template>
  <!--<div class="vx-card items-center" style="height: 100%;">
    <div class="vx-card__collapsible-content vs-con-loading__container">
      <div class="vx-card__body items-center">

      </div>
    </div>
  </div>-->
  <div style="height: 100%;">
    <vx-card
      v-if="Object.keys(getLibraryItems).length === 0"
      style="height: 100%;"
      class="p-3"
    >
      <p style="white-space: normal;" class="font-semibold">
        {{ $t('studio.sidebarPanel.library.l1') }}
      </p>
    </vx-card>
    <template v-else>
      <div v-for="(k, indexk) in getLibraryItems" :key="indexk">
        <LibraryItem
          v-if="$store.state.studio.currentActiveScene === parseInt(indexk) + 1"
          :keywords="k"
          :sceneNum="parseInt(indexk) + 1"
          class="mb-base"
        />
      </div>
    </template>
  </div>
</template>

<script>
import LibraryItem from './components/LibraryItem';

export default {
  name: 'LibraryPanel',
  components: { LibraryItem },
  computed: {
    getLibraryItems() {
      return this.$store.state.studio.keywords;
    },
    currentActiveScene() {
      return this.$store.state.studio.currentActiveScene;
    },
    scenes() {
      return this.$store.state.studio.scenes;
    }
  },
  methods: {
    /* nextScene(){
      console.log("scene_card_" + (this.currentActiveScene))
      if (this.currentActiveScene < Object.keys(this.scenes).length){
        document.getElementById("scene_card_" + (this.currentActiveScene)).scrollIntoView();
        this.$store.commit("setActiveScene",this.currentActiveScene + 1)
      }
      return true;
    },
    previousScene(){
      if (this.currentActiveScene > 1){
        document.getElementById("scene_card_" + (this.currentActiveScene - 2)).scrollIntoView();
        this.$store.commit("setActiveScene",this.currentActiveScene - 1)
      }
      return true;
    } */
  }
};
</script>

<style scoped></style>
