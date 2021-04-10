<template>
  <div class="items-center" style="height: 100%; font-size: 12px">
    <div class="vx-card__collapsible-content vs-con-loading__container">
      <div class="vx-card__body">
        <div class="w-full items-center mb-base">
          <h6 class="font-semibold mb-base" style="white-space: normal">
            You can add Sound to your <br />videos
          </h6>
          <vs-button @click="prepareAllAudios">{{
            $t('studio.sidebarPanel.voice.v1')
          }}</vs-button>
        </div>
        <vs-tabs>
          <vs-tab label="Narration">
            <component
              :is="scrollbarTag"
              ref="verticalNavMenuPs"
              class="scroll-area scroll-cards"
              :settings="settings"
              :key="$vs.rtl"
            >
              <div
                v-for="(s, indexs) in $store.state.studio.scenes"
                :key="indexs"
              >
                <vx-card
                  :id="'scene_card_panel' + indexs"
                  class="scene-card items-left mb-2 custom-shadow"
                  @click="scrollToScene(indexs)"
                >
                  <h5 class="mb-3" style="margin-left: 0px">
                    Scene {{ parseInt(indexs) + 1 }}
                  </h5>
                  <p
                    class="items-left"
                    style="white-space: normal; overflow: hidden"
                  >
                    {{ s }}
                  </p>
                  <ul
                    v-if="recordedAudios[indexs]"
                    :class="'playlist_' + indexs"
                    class="recordings mt-2"
                    style="margin-left: -5%"
                  >
                    <li>
                      <audio
                        :src="recordedAudios[indexs]"
                        type="audio/mp3"
                        controls
                        style="height:42px"
                      >
                        Your browser does not support the audio element.
                      </audio>
                    </li>
                  </ul>
                </vx-card>
              </div>
            </component>
          </vs-tab>
          <vs-tab label="Music">
            <vx-card
              class="text-white mb-4"
              :class="backgroundMusic.url ? 'bg-success' : 'bg-danger'"
            >
              <div
                v-if="backgroundMusic.url"
                class="flex justify-between items-center -m-4 cursor-pointer"
                @mouseenter="
                  playAudio('selected_track', 'selected_track_loader')
                "
                @mouseleave="
                  pauseAudio('selected_track', 'selected_track_loader')
                "
              >
                <div class="text-left w-2/3 flex items-center">
                  <vs-icon icon="audiotrack" class="mr-2" />
                  <p class="font-semibold truncate" style="white-space: normal">
                    {{ backgroundMusic.title }}
                  </p>
                </div>
                <div
                  class="vs-con-loading__container audio-animation"
                  :id="`selected_track_loader`"
                ></div>
                <vs-icon
                  title="Remove this track"
                  icon="delete"
                  size="20px"
                  @click.stop="removeAudio"
                />
                <audio
                  class="audio-el hidden"
                  :id="`selected_track`"
                  :src="backgroundMusic.url"
                  type="audio/mp3"
                ></audio>
              </div>
              <div v-else class="font-semibold -m-3 flex items-center">
                <p>No track selected</p>
              </div>
            </vx-card>
            <div class="genre_list_wrapper">
              <div class="text-left mb-4">
                <label for="genre_list">Select Genre</label>
                <v-select
                  :options="options"
                  :reduce="label => label.value"
                  id="genre_list"
                  class="genre-list"
                  :clearable="false"
                  :value="selectedGenre"
                  @input="getMusicList"
                  label="label"
                ></v-select>
              </div>
              <!--div v-if="audioList.length === 0">
              <p style="white-space: normal" class="font-semibold">
                Select genre to get music tracks
              </p>
            </div-->
              <div
                v-if="audioList.length > 0"
                class="scroll-area scroll-default overflow-auto"
              >
                <!--p class="mb-3">Click to add music to the Current Scene</p-->
                <template v-for="(audio, indexa) in audioList">
                  <div
                    title="Click to select"
                    class="flex justify-between mb-2 p-1 cursor-pointer hover:bg-primary hover:text-white"
                    @mouseenter="
                      playAudio(`track_${indexa}`, `loader_${indexa}`)
                    "
                    @mouseleave="
                      pauseAudio(`track_${indexa}`, `loader_${indexa}`)
                    "
                    @click="selectAudio(audio)"
                    :key="indexa"
                  >
                    <div class="text-left w-2/3 flex items-center">
                      <vs-icon icon="audiotrack" class="mr-2" />
                      <p
                        class="font-semibold truncate"
                        style="white-space: normal"
                      >
                        {{ audio.title }}
                      </p>
                    </div>
                    <div
                      class="vs-con-loading__container audio-animation"
                      :id="`loader_${indexa}`"
                    ></div>
                    <audio class="audio-el hidden" :id="`track_${indexa}`">
                      <source :src="audio.url" type="audio/mp3" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                </template>
              </div>
            </div>
          </vs-tab>
          <vs-tab label="Uploads">
            <div class="text-center mb-base mt-3">
              <input
                type="file"
                :id="`audio_file`"
                @change="uploadFile"
                class="hidden"
                accept="audio/*"
              />
              <vs-button
                size="medium"
                id="upload-with-loading"
                class="vs-con-loading__container"
                @click="chooseFile"
                :disabled="uploadInProgress"
              >
                Upload Music Track
              </vs-button>
            </div>
            <div class="scroll-area scroll-default overflow-auto">
              <template v-for="(audio, indexau) in uploadedAudioList">
                <div
                  title="Click to select"
                  class="items-left flex justify-between items-center mb-2 p-1 cursor-pointer hover:bg-primary hover:text-white"
                  @mouseenter="
                    playAudio(`u_track_${indexau}`, `u_loader_${indexau}`)
                  "
                  @mouseleave="
                    pauseAudio(`u_track_${indexau}`, `u_loader_${indexau}`)
                  "
                  @click="selectAudio(audio)"
                  :key="indexau"
                >
                  <div class="text-left w-2/3 flex items-center">
                    <vs-icon icon="audiotrack" class="mr-2" />
                    <p
                      class="font-semibold truncate"
                      style="white-space: normal"
                    >
                      {{ audio.title }}
                    </p>
                  </div>
                  <div
                    class="vs-con-loading__container audio-animation"
                    :id="`u_loader_${indexau}`"
                  ></div>
                  <audio class="audio-el hidden" :id="`u_track_${indexau}`">
                    <source :src="audio.url" type="audio/mp3" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </template>
            </div>
          </vs-tab>
        </vs-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import vSelect from 'vue-select';
import { ajaxCallMixin } from '../../../../http/HttpCommon';
export default {
  name: 'MusicPanel',
  mixins: [ajaxCallMixin],
  components: {
    VuePerfectScrollbar,
    vSelect
  },
  data() {
    return {
      uploadInProgress: false,
      settings: {
        // perfectScrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: 1,
        swipeEasing: true
      },
      selectedGenre: '',
      options: [
        { value: 'all', label: 'All' },
        { value: 'ambient', label: 'Ambient' },
        { value: 'blues', label: 'Blues' },
        { value: 'bumpers & stingers', label: 'Bumpers & Stingers' },
        { value: 'chill out', label: 'Chill Out' },
        { value: 'cinematic', label: 'Cinematic' },
        { value: 'classical', label: 'Classical' },
        { value: 'corporate', label: 'Corporate' },
        { value: 'country', label: 'Country' },
        { value: 'electronic', label: 'Electronic' },
        { value: 'folk', label: 'Folk' },
        { value: 'hip hop', label: 'Hip Hop' },
        {
          value: 'holidays & special events',
          label: 'Holidays & Special Events'
        },
        { value: 'horror', label: 'Horror' },
        { value: 'jazz', label: 'Jazz' },
        { value: 'kids and family', label: 'Kids & Family' },
        { value: 'pop', label: 'Pop' },
        { value: 'religious', label: 'Religious' },
        { value: 'rhythm & blues', label: 'Rhythm & Blues' },
        { value: 'rock', label: 'Rock' },
        { value: 'world', label: 'World' }
      ]
    };
  },
  computed: {
    audioList() {
      return this.$store.state.studio.audioList;
    },
    recordedAudios() {
      return this.$store.state.studio.recordedAudios;
    },
    uploadedAudioList() {
      return this.$store.state.studio.uploadedAudios;
    },
    backgroundMusic() {
      return this.$store.state.studio.backgroundMusic;
    },
    scrollbarTag() {
      return this.$store.getters.scrollbarTag;
    }
  },
  mounted() {
    this.getMusicList('all');
  },
  methods: {
    getMusicList(genre) {
      this.selectedGenre = genre;
      const url = `/api/music?genre=${genre}`;
      /* this.$vs.loading({
        container: `#buy-download`,
        background: '#fff',
        color: 'primary',
        scale: 0.8
      }); */
      // this.isLoading = true;
      this.getRequest(url, this.loadAudioList);
    },
    loadAudioList(apiResponse) {
      this.$store.commit('studio/setAudios', apiResponse.data);
    },
    scrollToScene(sceneNumber) {
      var element = document.getElementById(`scene_card_${sceneNumber}`);
      const headerOffset = 80;
      var elementPosition = element.getBoundingClientRect().top;
      var offsetPosition = elementPosition - headerOffset + window.pageYOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    },
    playAudio(trackId, loaderId) {
      const audioElement = document.getElementById(trackId);
      audioElement.currentTime = 0;
      audioElement.play();
      this.$vs.loading({
        container: `#${loaderId}`,
        type: 'sound',
        color: '#fff',
        background: 'transparent',
        scale: 0.5
      });
    },
    pauseAudio(trackId, loaderId) {
      const audioElement = document.getElementById(trackId);
      audioElement.pause();
      this.$vs.loading.close(`#${loaderId} > .con-vs-loading`);
    },
    callback(msg) {
      console.debug('Event: ', msg);
    },
    chooseFile() {
      document.getElementById(`audio_file`).click();
    },
    uploadFile(event) {
      const selectedFile = event.target.files[0];
      this.uploadInProgress = true;
      this.$vs.loading({
        background: 'primary',
        color: '#fff',
        container: '#upload-with-loading',
        scale: 0.45
      });
      this.$store
        .dispatch('studio/uploadMedia', selectedFile)
        .then(url => {
          const dataObj = {
            title: selectedFile.name,
            url: url
          };
          this.$store.commit('studio/setUploadedAudio', dataObj);
        })
        .catch(() => {
          this.$vs.notify({
            title: 'Error Occured',
            text: 'video upload failed',
            color: 'danger'
          });
        })
        .finally(() => {
          document.getElementById(`audio_file`).value = '';
          this.uploadInProgress = false;
          this.$vs.loading.close('#upload-with-loading > .con-vs-loading');
        });
    },
    selectAudio(a) {
      this.$store.commit('studio/selectAudio', a);
    },
    removeAudio() {
      this.$store.commit('studio/clearAudio');
    },
    updateComponent() {
      this.$forceUpdate();
    },
    prepareAllAudios() {
      /* this.$store.commit(
        'studio/setPrepareAllAudios',
        this.$store.state.studio.preparedScenesVideos
      ); */
      this.$store.commit('studio/skipMusic');
      this.$store.commit('studio/togglePublish');
    }
  }
};
</script>

<style lang="scss" scoped>
.items-left {
  text-align: left;
  text-align: -moz-left;
  text-align: -webkit-left;
}
.scroll-default {
  height: 245px;
}
ul.recordings {
  li {
    display: flex;
  }
}
.items-center {
  text-align: center;
  text-align: -moz-center;
  text-align: -webkit-center;
}
.custom-shadow {
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1) !important;
}
.audio-animation {
  height: 30px;
  width: 30px;
}
.scroll-area {
  position: relative;
  width: 100%;
}
.scroll-cards {
  height: 60vh;
}
.scene-card {
  cursor: pointer;
}
.genre_list_wrapper {
  height: 330px;
}
</style>
<style>
.genre-list .vs__dropdown-menu {
  max-height: 200px !important;
}
</style>
