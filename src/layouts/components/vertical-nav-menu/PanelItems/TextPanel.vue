<template>
  <div class="vx-card items-center" style="height: 100%">
    <div class="vx-card__collapsible-content vs-con-loading__container">
      <div class="vx-card__body items-center">
        <vx-card
          v-if="Object.keys($store.state.studio.scenes).length === 0"
          no-shadow
        >
          <p style="white-space: normal" class="font-semibold">
            {{ $t('studio.sidebarPanel.text.t1') }}
          </p>
        </vx-card>
        <template v-else v-for="(s, indexs) in $store.state.studio.scenes">
          <vx-card
            v-if="s !== ''"
            :key="indexs"
            no-shadow
            style="color: white"
            class="mb-3 bg-primary"
            :class="{
              'bg-danger': invalidScenes[parseInt(indexs)]
            }"
          >
            <p
              class="items-left"
              style="white-space: normal; overflow-wrap: break-word"
            >
              {{ s }}
            </p>
          </vx-card>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Text',
  computed: {
    invalidScenes() {
      return this.$store.state.studio.invalidScenes;
    }
  }
};
</script>

<style scoped>
.vx-card {
  cursor: auto;
}

.vx-card__title h4 {
  color: white !important;
}

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
</style>
