<template>
  <vx-card title="Create Video From URL">
    <div class="url-wrapper">
      <div>
        <h4 class="mb-2 font-bold" style="color: #6A6874;">
          Enter your URL Here
        </h4>
        <p style="color: #6a6874; white-space: normal" class="mb-base">
          You can submit medium Link & blog Link etc.
        </p>
        <vx-input-group class="mb-4 text-left">
          <vs-input
            v-model="contentUrl"
            class="text-primary"
            placeholder="Paste URL here"
            :disabled="extractionInProgress"
          />
          <template slot="append">
            <div class="append-text btn-addon">
              <vs-button
                color="primary"
                class="vs-con-loading__container"
                id="url-with-loading"
                :disabled="extractionInProgress"
                @click="fetchText"
                >Go</vs-button
              >
            </div>
          </template>
        </vx-input-group>
      </div>
    </div>
  </vx-card>
</template>
<script>
export default {
  name: 'ExternalUrl',
  data() {
    return {
      extractionInProgress: false,
      contentUrl: ''
    };
  },
  methods: {
    fetchText() {
      this.extractionInProgress = true;
      this.$vs.loading({
        background: 'primary',
        color: '#fff',
        container: '#url-with-loading',
        scale: 0.4
      });
      this.$store
        .dispatch('studio/extractInfoFromUrl', {
          url: this.contentUrl,
          ext: null
        })
        .then(data => {
          this.handleApiResponse(data);
        })
        .catch(() => {
          this.$vs.notify({
            title: 'Invalid URL',
            text: 'No text found',
            color: 'danger'
          });
        })
        .finally(() => {
          this.extractionInProgress = false;
          this.$vs.loading.close('#url-with-loading > .con-vs-loading');
        });
    },
    handleApiResponse(data) {
      this.$store.commit('studio/setInitialState');
      if (data.slides) {
        const scenes = {};
        const videos = {};
        const images = {};
        const keywords = {};
        this.$store.commit('studio/SET_VIDEO_ATTR', {
          key: 'fromPPT',
          value: true
        });
        let script = '';
        Object.values(data.slides).forEach(({ img_path, text }, index) => {
          scenes[index] = '*No notes found in this slide*';
          videos[index] = '';
          images[index] = { 0: [img_path, 'slide', 'slide'] };
          keywords[index] = [];
          script += text;
          this.$store.commit('studio/setInitialVideo', {
            indexs: index,
            value: img_path
          });
        });
        this.$store.commit('studio/setSentences', scenes);
        this.$store.commit('studio/setVideos', videos);
        this.$store.commit('studio/setKeywords', keywords);
        this.$store.commit('studio/setImages', images);
        this.$store.commit('studio/setScript', script);
      }
      if (data.title) {
        this.$store.commit('studio/SET_VIDEO_ATTR', {
          key: 'title',
          value: data.title
        });
      }
      if (data.text) {
        this.$store.commit('studio/setScript', data.text);
      }
      if (!this.uploadedDocumentIsPPT) {
        this.$store.commit('studio/SET_TAB_INDEX', 0);
      } else setTimeout(() => this.$store.commit('studio/toggleLibrary'), 1000);
    }
  }
};
</script>
<style scoped>
.url-wrapper {
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border: 1px solid rgba(114, 71, 196, 0.16);
  border-radius: 6px;
}
</style>
