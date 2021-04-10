<template>
  <div>
    <vx-card class="scene-card vs-con-loading__container" id="preview-loading">
      <h4 class="text-center mb-4">Preview</h4>
      <p class="font-semibold items-left mb-base" style="white-space: normal">
        Note: This is a low quality video for rendering purposes only, when your
        are ready, extract a high quality video by publishing it.
      </p>
      <video
        width="100%"
        height="auto"
        :src="getVideoLink"
        id="preview_video"
        controls
      >
        {{ $t('studio.errors.e1') }}
      </video>
      <div class="mb-base"></div>
      <div class="flex justify-center">
        <vs-button
          @click="handlePublish"
          class="bg-custom-purple mr-4"
          v-if="!insideIframe"
          >{{ $t('studio.publish.p1') }}</vs-button
        >
        <!--vs-button
          class="bg-custom-purple mr-4"
          @click.prevent="handleSaveForLater"
          >Save Draft</vs-button
        -->

        <vs-button
          class="bg-custom-purple px-4 vs-con-loading__container"
          id="download-with-loading"
          icon="get_app"
          :disabled="downloadInProgress"
          @click.prevent="handleDownload"
          >Download</vs-button
        >
      </div>
    </vx-card>
    <Transaction
      :show="showTransactionModal"
      transactionType="Publish"
      :transactionPhase="currentTxPhase"
      @close="showTransactionModal = false"
      @retry="handlePublish"
    />
  </div>
</template>

<script>
import constants from '../../../constant';
import axios from 'axios';
import Transaction from '@/views/components/Transaction/Transaction.vue';
import { mapState } from 'vuex';

export default {
  name: 'PublishVideo',
  components: {
    Transaction
  },
  data() {
    return {
      player: null,
      videos: [],
      indexs: 0,
      constants,
      // showAlert: false,
      saveForLater: false,
      task_id: null,
      videoId: null,
      downloadInProgress: false,
      showTransactionModal: false,
      currentTxPhase: 'Processing',
      previewReq: Function
    };
  },
  computed: {
    ...mapState('auth', ['isUserLoggedIn']),
    getVideoLink() {
      return this.$store.state.studio.previewVideo;
    },
    getFilename() {
      return `${this.$store.state.studio.video.title}_videowiki.mp4`;
    },
    /* isPublished() {
      return this.$store.state.studio.publishStatus;
    }, */
    isPaid() {
      return this.$store.state.studio.video.isPaid;
    },
    totalScenes() {
      return Object.keys(this.$store.state.studio.scenes).length;
    },
    sceneTransitionList() {
      return this.$store.state.studio.sceneTransition;
    },
    insideIframe() {
      return this.$store.state.insideIframe;
    }
  },
  mounted() {
    if (this.$route.params.videoId) {
      this.videoId = this.$route.params.videoId;
    }
    if (this.getVideoLink) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'primary',
        title: `Confirm`,
        acceptText: 'Yes',
        text: 'Do you want to generate the Preview again ?',
        accept: this.collectVideos
      });
    } else {
      this.collectVideos();
    }
  },
  methods: {
    collectVideos() {
      this.$store.commit('studio/setPreviewVideo', null);
      this.$vs.loading({
        background: '#fff',
        container: '#preview-loading',
        text: 'Generating Preview...'
      });
      const libraryItems = this.$store.state.studio.selectedFromLibraryVideos;
      const preparedScene = this.$store.state.studio.preparedScenesVideos;
      const audioVideo = this.$store.state.studio.addedAudioVideos;
      for (let i = 1; i <= this.totalScenes; i++) {
        if (audioVideo[i]) this.videos.push(audioVideo[i]);
        else if (preparedScene[i]) this.videos.push(preparedScene[i]);
        else if (libraryItems[i]) this.videos.push(libraryItems[i]);
      }
      this.concatVideos();
    },
    async concatVideos() {
      const videoData = {
        videos: this.videos,
        task_id: this.task_id,
        isPreview: 1,
        motions: this.sceneTransitionList,
        bgm: this.$store.state.studio.backgroundMusic.url || null
      };
      try {
        const apiResponse = await this.$store.dispatch(
          'studio/concatenateVideos',
          videoData
        );
        console.log(apiResponse);
        if (!this.task_id) this.task_id = apiResponse.task_id;
        if (apiResponse.status) {
          this.$store.commit(
            'studio/setPreviewVideo',
            apiResponse.data.video_url
          );
          this.$store.commit('studio/SET_VIDEO_ATTR', {
            key: 'image',
            value: apiResponse.data.image_url
          });
          // this.$Progress.finish();
          this.$vs.loading.close('#preview-loading > .con-vs-loading');
          /* this.$vs.loading({
            background: '#fff',
            container: '#preview-loading',
            text: 'Preparing your video..',
          });
          const previewVideo = document.getElementById('preview_video');
          previewVideo.oncanplaythrough = () => {
            this.$vs.loading.close('#preview-loading > .con-vs-loading');
          }; */
        } else {
          this.previewReq = setTimeout(() => this.concatVideos(), 15000);
        }
      } catch (err) {
        // this.$Progress.fail();
        this.$vs.loading.close('#preview-loading > .con-vs-loading');
        this.$vs.notify({
          title: 'Error',
          text: 'Merge Failed',
          color: 'danger'
        });
      }
    },
    getUserName() {
      const userInfo = this.$store.state.AppActiveUser;
      return userInfo.username;
    },
    handlePublish() {
      this.saveForLater = false;
      this.handleVideoSubmit();
    },
    handleSaveForLater() {
      this.saveForLater = true;
      this.handleVideoSubmit();
    },
    async handleVideoSubmit() {
      if (this.isUserLoggedIn()) {
        const title = this.$store.state.studio.video.title;
        const desc = this.$store.state.studio.video.description;
        if (title !== '' && desc !== '') {
          // this.submitVideo(saveLater);
          if (this.isPaid) {
            if (this.$store.state.isWalletConnected) {
              const payload = {
                author: this.getUserName(),
                metaData: {
                  url: this.getVideoLink,
                  title: title
                }
              };
              this.$store.commit('SET_CURRENT_TRANSACTION_STEP', 1);
              this.currentTxPhase = 'Processing';
              this.showTransactionModal = true;
              try {
                await this.$store.dispatch('publishToOcean', payload);
                setTimeout(() => {
                  this.showTransactionModal = false;
                  this.submitVideo();
                }, 2000);
              } catch (error) {
                if (error.code === 4001) this.currentTxPhase = 'Rejected';
                else this.currentTxPhase = 'Failed';
              }
            } else {
              this.$vs.notify({
                text: 'Connect your Wallet First',
                color: 'primary'
              });
            }
          } else {
            this.submitVideo();
          }
        } else {
          this.$vs.notify({
            title: 'Input Missing',
            text: 'Title/Description cannot be empty',
            color: 'primary'
          });
        }
      } else {
        this.$store.commit('TOGGLE_LOGIN_POPUP', true);
      }
    },
    submitVideo() {
      this.$Progress.start();
      this.$vs.loading({ color: 'transparent' });
      const video = this.$store.state.studio.video;
      const metaData = this.$store.state.studio;
      const sceneData = this.getSceneData(metaData);
      const data = {
        info: {
          title: video.title,
          description: video.description,
          image: video.image,
          script: metaData.videoScript,
          url: video.url,
          user: this.getUserName(),
          duration: document.getElementById('preview_video').duration,
          language: video.srcLang
        },
        id: this.videoId,
        published_id: video.published_id,
        scenes: sceneData,
        bgm: metaData.backgroundMusic.url || null,
        video: metaData.previewVideo,
        is_save_later: this.saveForLater,
        tags: metaData.tags
      };
      console.log(data);
      /* Ajax call start */
      this.$store
        .dispatch('studio/publishVideo', data)
        .then(res => {
          if (!this.saveForLater) {
            if (this.isPaid) {
              const payload = {
                exchange_key: video.txData.exchangeId,
                dod: video.txData.did,
                dataToken: video.txData.dataTokenAddress,
                paid: video.isPaid,
                video_id: res.data.id
              };
              this.$store
                .dispatch('studio/postTxData', payload)
                .then(() => {
                  this.$Progress.finish();
                  this.$vs.loading.close();
                  this.$router.push('/dashboard');
                  this.$vs.notify({
                    title: 'Success',
                    text: 'Video Published Successfully',
                    color: 'success'
                  });
                })
                .catch(err => {
                  console.log(err);
                  this.$Progress.fail();
                  this.$vs.loading.close();
                  this.$vs.notify({
                    title: 'Error',
                    text: 'Video Tx data was not saved',
                    color: 'danger'
                  });
                });
              return;
            }
            this.$Progress.finish();
            this.$vs.loading.close();
            this.$router.push('/dashboard');
            this.$vs.notify({
              title: 'Success',
              text: 'Video Published Successfully',
              color: 'success'
            });
          } else {
            this.$Progress.finish();
            this.$vs.loading.close();
            this.$router.push('/myvideos');
            this.$vs.notify({
              title: 'Success',
              text: 'Video Saved Successfully',
              color: 'success'
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.$Progress.fail();
          this.$vs.loading.close();
          this.$vs.notify({
            title: 'Error',
            text: this.saveForLater
              ? 'Video was not saved'
              : 'Video was not published',
            color: 'danger'
          });
        });
      /* Ajax call end */
    },
    getSceneData(metaData) {
      const scenes = {};
      Object.entries(metaData.scenes).forEach(([key, value]) => {
        const {
          sceneScriptColor: font_color,
          sceneScriptPosition: position,
          sceneBackgroundColor: background_color
        } = metaData.styles[key];

        scenes[key] = {
          text: value,
          keywords: metaData.keywords[key],
          online_url: null,
          audio: null,
          uploaded_video: null,
          position: position.toString(),
          font_color,
          background_color
        };
        // audio url
        if (metaData.recordedAudios[key]) {
          const audioUrl = metaData.recordedAudios[key];
          scenes[key].audio = audioUrl.search('blob:') === -1 ? audioUrl : null;
        }
        // video url
        if (metaData.selectedFromLibraryVideos[parseInt(key) + 1]) {
          const videoUrl = new URL(
            metaData.selectedFromLibraryVideos[parseInt(key) + 1]
          );
          if (videoUrl.origin === constants.apiUrl)
            scenes[key].uploaded_video = videoUrl.href;
          else scenes[key].online_url = videoUrl.href;
        }
      });
      return scenes;
    },
    handleDownload() {
      this.downloadInProgress = true;
      this.$vs.loading({
        background: 'primary',
        color: '#fff',
        container: '#download-with-loading',
        scale: 0.45
      });
      axios
        .get(this.getVideoLink, { responseType: 'blob' })
        .then(response => {
          const blob = new Blob([response.data], { type: 'video/mp4' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = this.getFilename;
          link.click();
          URL.revokeObjectURL(link.href);
        })
        .catch(() => {
          this.$vs.notify({
            title: 'Error Occured',
            text: 'Download Failed',
            color: 'danger'
          });
        })
        .finally(() => {
          this.downloadInProgress = false;
          this.$vs.loading.close('#download-with-loading > .con-vs-loading');
        });
    }
  },
  beforeDestroy() {
    clearTimeout(this.previewReq);
  }
};
</script>

<style scoped>
.vs-con-loading__container {
  z-index: 10 !important;
}
</style>
