<template>
  <div class="vx-card" style="height: 100%">
    <div class="vx-card__collapsible-content vs-con-loading__container">
      <div class="vx-card__header">
        <div class="vx-card__title">
          <h4>{{ $t('studio.sidebarPanel.library.l2') }} {{ sceneNum }}</h4>
          <!--h6>
            {{
              tabIndex === 0
                ? $t('studio.sidebarPanel.library.l3')
                : tabIndex === 1
                ? $t('studio.sidebarPanel.library.l4')
                : $t('studio.sidebarPanel.library.l5')
            }}
          </h6-->
          <h6>Select one media to continue</h6>
        </div>
      </div>
      <div class="vx-card__body">
        <vs-tabs v-model="tabIndex">
          <vs-tab label="Videos">
            <vx-input-group class="mb-base">
              <vs-input
                v-model="searchQuery"
                :placeholder="$t('studio.sidebarPanel.library.l6')"
              />
              <template slot="append">
                <div class="append-text btn-addon">
                  <vs-button
                    color="primary"
                    class="vs-con-loading__container"
                    id="button-with-loading"
                    icon-pack="feather"
                    icon="icon-search"
                    :disabled="searchInProgress"
                    @click="searchVideo"
                  ></vs-button>
                </div>
              </template>
            </vx-input-group>
            <div>
              <vs-row v-if="keywords.length !== 0" class="mb-base">
                <p
                  v-for="(k, indexk) in keywords"
                  :key="`scene_${sceneNum}_${indexk}`"
                  class="font-semibold mr-3"
                  @click="addsearchVideo(k)"
                  style="
                    cursor: pointer;
                    white-space: normal;
                    overflow-wrap: break-word;
                    line-break: anywhere;
                  "
                >
                  <u>#{{ k }}</u>
                </p>
              </vs-row>
              <div v-else>
                <p
                  style="
                    cursor: pointer;
                    white-space: normal;
                    overflow-wrap: break-word;
                    line-break: anywhere;
                  "
                  class="mt-4"
                >
                  <!--span class="text-danger"
                    >No Video and Keywords found for this scene.</span
                  ><br /-->
                  Try using the search or upload your own video.
                </p>
              </div>
              <div
                v-for="(v, indexv) in searchedVideos[sceneNum - 1]"
                :key="`sv_${sceneNum}_${indexv}_${v[3]}`"
                class="w-full mb-base"
              >
                <VideoPreview
                  :src="v[1]"
                  @click.native="selectVideo(v)"
                  class="cursor-pointer"
                />
                <div
                  class="font-semibold items-left"
                  style="white-space: normal"
                >
                  #{{ v[3].substring(0, v[3].length - 2) }}
                </div>
              </div>
              <div
                v-for="(v, indexv) in $store.state.studio.videos[sceneNum - 1]"
                :key="`v_${sceneNum}_${indexv}`"
                class="w-full mb-base"
              >
                <VideoPreview
                  :src="v[1]"
                  v-if="v[3] !== ''"
                  @click.native="selectVideo(v)"
                  class="cursor-pointer"
                />
                <div
                  class="font-semibold items-left"
                  style="white-space: normal"
                  v-if="v[3] !== ''"
                >
                  #{{ v[3].substring(0, v[3].length - 2) }}
                </div>
              </div>
            </div>
          </vs-tab>
          <vs-tab label="Images">
            <vx-input-group class="mb-base">
              <vs-input
                v-model="searchQuery"
                :placeholder="$t('studio.sidebarPanel.library.l7')"
              />
              <template slot="append">
                <div class="append-text btn-addon">
                  <vs-button
                    color="primary"
                    class="vs-con-loading__container"
                    id="button-with-loading"
                    icon-pack="feather"
                    icon="icon-search"
                    :disabled="searchInProgress"
                    @click="searchVideo"
                  ></vs-button>
                </div>
              </template>
            </vx-input-group>
            <div
              v-for="(img, indexi) in $store.state.studio.searchedImages[
                sceneNum - 1
              ]"
              :key="`si_${sceneNum}_${indexi}`"
              class="w-full mb-base"
            >
              <ImagePreview
                :src="img[0]"
                v-if="img[0]"
                :imageId="`s_img_${indexi}`"
                @motion="selectImage(img[0], $event)"
              />
              <div
                class="font-semibold items-left"
                style="white-space: normal"
                v-if="img[1] !== ''"
              >
                #{{ img[1].split(',')[0] }}
              </div>
            </div>
            <div
              v-for="(img, indexi) in $store.state.studio.images[sceneNum - 1]"
              :key="`i_${sceneNum}_${indexi}`"
              class="w-full mb-base"
            >
              <ImagePreview
                :src="img[0]"
                v-if="img[0]"
                :imageId="`img_${indexi}`"
                @motion="selectImage(img[0], $event)"
              />
              <div
                class="font-semibold items-left"
                style="white-space: normal"
                v-if="img[2] !== ''"
              >
                #{{ img[2] }}
              </div>
            </div>
          </vs-tab>
          <vs-tab label="Uploads">
            <div class="text-center mb-base mt-3">
              <input
                type="file"
                :id="`realfile${sceneNum}`"
                @change="uploadFile"
                class="hidden"
                accept="video/*,image/*"
              />
              <vs-button
                size="medium"
                id="button-with-loading-library"
                class="vs-con-loading__container"
                :disabled="uploadInProgress"
                @click="chooseFile"
              >
                Upload Media
              </vs-button>
            </div>
            <div
              v-for="(v, indexu) in uploadedVideos[sceneNum - 1]"
              :key="`uv_${sceneNum}_${indexu}`"
              class="w-full mb-base"
            >
              <h6 class="mb-3 truncate .max-w-xxs">{{ v[0] }}</h6>
              <VideoPreview
                :src="v[1]"
                v-if="checkUrl(v[1])"
                class="cursor-pointer"
                @click.native="selectVideo(v)"
              />
              <ImagePreview
                v-else
                :src="v[1]"
                :imageId="`u_img_${indexu}`"
                @motion="selectImage(v[1], $event)"
              />
            </div>
          </vs-tab>
        </vs-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import VideoPreview from './VideoPreview';
import ImagePreview from './ImagePreview';
export default {
  components: { VideoPreview, ImagePreview },
  name: 'LibraryItem',
  data() {
    return {
      searchQuery: '',
      playPromise: null,
      searchInProgress: false,
      tabIndex: 0,
      uploadInProgress: false,
      /* defaultVideo: [
        '',
        'https://player.vimeo.com/external/183300007.hd.mp4?s=ca181ca041236fab57280de20de21b78a202bbf8&profile_id=174',
      ], */
    };
  },
  props: ['keywords', 'sceneNum'],
  computed: {
    uploadedVideos() {
      return this.$store.state.studio.uploadedVideos;
    },
    searchedVideos() {
      return this.$store.state.studio.searchedVideos;
    },
    searchedImages() {
      return this.$store.state.studio.searchedVideos;
    },
  },
  methods: {
    checkUrl(url) {
      const media = url.split('.');
      if (media[media.length - 1] !== 'mp4') return false;
      return true;
    },
    chooseFile() {
      document.getElementById(`realfile${this.sceneNum}`).click();
    },
    uploadFile(event) {
      const selectedFile = event.target.files[0];
      this.uploadInProgress = true;
      this.$vs.loading({
        background: 'primary',
        color: '#fff',
        container: '#button-with-loading-library',
        scale: 0.45,
      });
      this.$store
        .dispatch('studio/uploadMedia', selectedFile)
        .then((url) => {
          const dataObj = {
            sceneNum: this.sceneNum - 1,
            value: [selectedFile.name, url],
          };
          this.$store.commit('studio/setUploadedVideos', dataObj);
        })
        .catch(() => {
          this.$vs.notify({
            title: 'Error Occured',
            text: 'video upload failed',
            color: 'danger',
          });
        })
        .finally(() => {
          document.getElementById(`realfile${this.sceneNum}`).value = '';
          this.uploadInProgress = false;
          this.$vs.loading.close(
            '#button-with-loading-library > .con-vs-loading'
          );
        });
    },
    selectVideo(v) {
      this.$store.commit('studio/selectVideo', {
        value: v[1],
        sceneNum: this.sceneNum,
      });
    },
    selectImage(img, zoomType) {
      const dataObj = {
        image_url: img,
        zoom: zoomType,
        sceneNum: this.sceneNum,
      };
      this.$Progress.start();
      this.$vs.loading({ color: 'transparent' });
      this.$store
        .dispatch('studio/addMotionToImage', dataObj)
        .then(() => {
          this.$Progress.finish();
          this.$vs.loading.close();
        })
        .catch(() => {
          this.$Progress.fail();
          this.$vs.loading.close();
        });
    },
    addsearchVideo(k) {
      this.searchQuery = k;
      // this.searchVideo();
    },
    addKeyword() {
      const payload = {
        keyword: this.searchQuery,
        sceneNum: this.sceneNum - 1,
      };
      this.$store.commit('studio/addKeyword', payload);
    },
    searchVideo() {
      this.searchInProgress = true;
      this.$vs.loading({
        background: 'primary',
        color: '#fff',
        container: '#button-with-loading',
        scale: 0.4,
      });
      const dataObj = {
        searchQuery: this.searchQuery,
        srcLang: this.$store.state.studio.video.srcLang,
        type: this.tabIndex === 0 ? 'video' : 'image',
      };
      this.$store
        .dispatch('studio/searchVideo', dataObj)
        .then((res) => {
          if (Object.keys(res.data).length === 0) {
            const mediaType = this.tabIndex === 0 ? 'videos' : 'images';
            this.$vs.notify({
              title: 'Not Found',
              text: `Cannot find ${mediaType} related to this keyword`,
              color: 'danger',
            });
          } else {
            const dataObj = {
              sceneNum: this.sceneNum - 1,
              value: res.data,
            };
            if (this.tabIndex === 0)
              this.$store.commit('studio/setSearchedVideos', dataObj);
            else if (this.tabIndex === 1)
              this.$store.commit('studio/setSearchedImages', dataObj);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.searchInProgress = false;
          this.$vs.loading.close('#button-with-loading > .con-vs-loading');
        });

      if (!this.keywords.includes(this.searchQuery)) {
        this.addKeyword();
      }
    },
  },
};
</script>

<style scoped>
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
