<template>
  <div>
    <form v-if="currentTabIndex === 0">
      <vx-card :title="$t('studio.text.t1')" class="text-window">
        <div class="text-left">
          <h6>{{ $t('studio.text.t2') }}</h6>
          <span class="text-danger text-sm" v-show="errors.has('title')">{{
            errors.first('title')
          }}</span>
          <input
            type="text"
            id="title"
            name="title"
            size="large"
            :placeholder="$t('studio.text.t2')"
            v-model="title"
            class="w-full mt-3 mb-3 title2"
            v-validate="'required'"
            autocomplete="off"
          />
          <div class="flex items-start -mx-2">
            <h6 class="px-2">{{ $t('studio.text.t4') }}</h6>
            <div class="px-2">
              <LanguageSelect v-model="srcLang" />
            </div>
          </div>
          <span class="text-danger text-sm" v-show="errors.has('script')">{{
            errors.first('script')
          }}</span>
          <textarea
            type="text"
            id="videoScript"
            name="script"
            :placeholder="$t('studio.text.t5')"
            v-model="videoScript"
            v-validate="'required'"
            class="w-full mt-3 mb-3 video-script2"
          >
          </textarea>
        </div>
        <div class="items-center">
          <div class="w-full items-center relative">
            <vs-button class="bg-cutsom-purple" @click.prevent="handleSubmit">{{
              $t('studio.text.t6')
            }}</vs-button>
            <div class="absolute" style="right: 8px; bottom: 6px">
              <vs-dropdown
                vs-custom-content
                vs-trigger-click
                class="cursor-pointer"
              >
                <span
                  class="cursor-pointer flex items-center"
                  style="transform: translate(0px, -2px)"
                >
                  <span class="font-bold">{{
                    breakTypeOptions[breakType]
                  }}</span>
                  <vs-icon icon-pack="feather" icon="icon icon-chevron-down" />
                </span>
                <vs-dropdown-menu class="w-48 i18n-dropdown vx-navbar-dropdown">
                  <vs-dropdown-item @click="breakType = 'short'">
                    &nbsp;Short Scenes</vs-dropdown-item
                  >
                  <vs-dropdown-item @click="breakType = 'long'">
                    &nbsp;Long Scenes</vs-dropdown-item
                  >
                </vs-dropdown-menu>
              </vs-dropdown>
            </div>
          </div>
        </div>
      </vx-card>
      <!--<div style="margin-bottom: 150px"></div>-->
    </form>
    <DocumentUpload v-else-if="currentTabIndex === 1" />
    <ExternalUrl v-else />
    <vs-popup ref="custom_teams_modal" :active.sync="choiceModal">
      <div class="p-2">
        <h2 class="font-extrabold mb-4">Select from following links</h2>
        <template v-for="(link, idx) in queryContent.links">
          <vx-card
            :key="idx"
            @click="onSelectLink(idx)"
            class="cursor-pointer mt-3"
            style="background: #f3f4f6"
            noShadow
          >
            <div class="flex items-center -m-2">
              <vs-icon icon="language" size="24px" class="mr-2"></vs-icon>
              <p :title="link" class="truncate ellipsis font-medium">
                {{ link }}
              </p>
            </div></vx-card
          >
        </template>
        <vs-divider>Or</vs-divider>
        <p class="font-semibold">
          Copy paste your script into the video script box alongwith a suitable
          title in the video title
        </p>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import LanguageSelect from './components/LanguageSelect.vue';
import DocumentUpload from './components/DocumentUpload';
import ExternalUrl from './components/ExternalUrl';

export default {
  components: {
    LanguageSelect,
    DocumentUpload,
    ExternalUrl
  },
  data() {
    return {
      form: {
        title: '',
        description: '',
        videoScript: ''
      },

      options: [
        { value: 'en', label: 'English' },
        { value: 'ru', label: 'Russian' },
        { value: 'pt', label: 'Portugese' }
      ],
      breakType: 'short',
      breakTypeOptions: {
        long: 'Long Scenes',
        short: 'Short Scenes'
      },
      queryContent: {
        links: []
      },
      contentUrl: '',
      choiceModal: false,
      task_id: null,
      requestInterval: Function
    };
  },
  computed: {
    videoScript: {
      get() {
        return this.$store.state.studio.videoScript;
      },
      set(value) {
        this.$store.commit('studio/setScript', value);
      }
    },
    srcLang: {
      get() {
        return this.$store.state.studio.video.srcLang;
      },
      set(value) {
        this.$store.commit('studio/SET_VIDEO_ATTR', {
          key: 'srcLang',
          value: value
        });
      }
    },
    title: {
      get() {
        return this.$store.state.studio.video.title;
      },
      set(value) {
        this.$store.commit('studio/SET_VIDEO_ATTR', {
          key: 'title',
          value: value
        });
      }
    },
    description: {
      get() {
        return this.$store.state.studio.video.description;
      },
      set(value) {
        this.$store.commit('studio/SET_VIDEO_ATTR', {
          key: 'description',
          value: value
        });
      }
    },
    uploadedDocumentIsPPT() {
      return this.$store.state.studio.video.fromPPT;
    },
    currentTabIndex() {
      return this.$store.state.studio.tabIndex;
    }
  },
  created() {
    if (
      !this.$route.params.videoId &&
      Object.keys(this.$route.query).length === 0 &&
      this.title === '' &&
      this.videoScript === ''
    ) {
      const storedForm = JSON.parse(localStorage.getItem('form'));
      if (storedForm) {
        this.title = storedForm.title;
        this.videoScript = storedForm.videoScript;
      }
    }
    window.addEventListener('beforeunload', this.saveForm);
  },
  mounted() {
    this.$refs.custom_teams_modal.$el.childNodes[1].childNodes[0].style.display =
      'none';
    if (this.$route.query.contentUrl) {
      const { contentUrl, tempauth, Translate, ApiVersion } = this.$route.query;
      const downloadUrl = tempauth
        ? `${contentUrl}&Translate=${Translate}&tempauth=${tempauth}&ApiVersion=${ApiVersion}`
        : contentUrl;
      this.handleUrlSubmit(downloadUrl, this.$route.query.ext);
    }
    if (this.$route.query.attachments) {
      const attachmentList = this.$route.query.attachments.split(',');
      this.queryContent.links.splice(0, 0, ...attachmentList);
    }
    if (this.$route.query.html) {
      // console.log(this.$route.query.html);
      const parser = new DOMParser();
      const parsedHtml = parser.parseFromString(
        this.$route.query.html,
        'text/html'
      );
      // console.log(parsedHtml);
      const anchorTagArray = parsedHtml.querySelectorAll('a');
      if (anchorTagArray) {
        anchorTagArray.forEach(a => {
          this.queryContent.links.push(a.href);
        });
        if (this.queryContent.links.length > 1) {
          this.choiceModal = true;
        } else if (this.queryContent.links.length === 1) {
          this.onSelectLink(0);
        } else {
          this.$vs.dialog({
            type: 'alert',
            color: 'primary',
            title: `Text too Long!`,
            acceptText: 'Okay',
            text:
              'The length of text in the message was too long. Kindly copy the text and paste it in the video script box.'
          });
        }
      }
    } else if (this.$route.query.text) {
      this.videoScript = this.$route.query.text;
    }
    if (Object.keys(this.$route.query).length !== 0) {
      this.$router.replace({ query: null });
    }
  },
  methods: {
    saveForm() {
      const form = {
        title: this.title,
        videoScript: this.videoScript
      };
      localStorage.setItem('form', JSON.stringify(form));
    },
    summarizeScript() {
      this.$Progress.start();
      this.$store
        .dispatch('studio/summarizeScript')
        .then(res => {
          console.log('summarized script', res);
          document.getElementById('video-script').innerText = res;
          this.$forceUpdate();
          this.$Progress.finish();
        })
        .catch(err => {
          console.log('error in summarization', err);
          this.$Progress.fail();
        });
    },
    scriptInput(e) {
      this.$store.commit('studio/setScript', e.target.innerText);
    },
    handleSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.createScenes();
        } else {
          this.$vs.notify({
            title: 'Invalid Input',
            text: this.errors.has('title')
              ? 'Enter Video title'
              : 'Enter Video script',
            color: 'danger'
          });
        }
      });
    },
    createScenes() {
      this.$Progress.start();
      this.$vs.loading({ color: 'transparent' });
      this.$store.commit('studio/SET_VIDEO_ATTR', {
        key: 'scrLang',
        value: this.srcLang
      });
      this.$store
        .dispatch('studio/sentenceDetection', this.breakType)
        .then(res => {
          console.log('sentences', res.data.sentences);
          console.log('keywords', res.data.keywords);
          /* this.$store
            .dispatch('studio/keywordExtraction')
            .then(resKeywords => {
              console.log('keywords', resKeywords); */
          this.$store
            .dispatch('studio/videoSuggestions')
            .then(resVideos => {
              console.log('videos', resVideos);
              this.$Progress.finish();
              this.$vs.loading.close();
              this.$store.commit('studio/resetState');
              /* this.$store
                    .dispatch('studio/audioSuggestions')
                    .then(res => {
                      this.$Progress.finish();
                      this.$vs.loading.close();
                      this.$store.commit('studio/resetState');
                    })
                    .catch(err => {
                      this.$Progress.fail();
                      this.$vs.loading.close();
                      console.log(err);
                      this.$vs.notify({
                        title: 'Error Occured',
                        text: 'Audio Suggestions',
                        color: 'danger'
                      });
                    }); */
            })
            .catch(err => {
              console.log(err);
              this.$Progress.fail();
              this.$vs.loading.close();
              this.$vs.notify({
                title: 'Error Occured',
                text: 'Video Suggestions',
                color: 'danger'
              });
            });
        })
        /* .catch(err => {
              console.log(err);
              this.$Progress.fail();
              this.$vs.loading.close();
              this.$vs.notify({
                title: 'Error Occured',
                text: 'keyword Extraction',
                color: 'danger'
              });
            });
        }) */
        .catch(err => {
          console.log(err);
          this.$Progress.fail();
          this.$vs.loading.close();
          this.$vs.notify({
            title: 'Error Occured',
            text: 'Sentence Detection',
            color: 'danger'
          });
        });
    },
    handleUrlSubmit(contentUrl, ext) {
      if (ext === 'mp4') {
        this.contentUrl = contentUrl;
        this.$validator.reset();
        this.$Progress.start();
        this.$vs.loading({ color: 'transparent' });
        this.splitIntoChunks();
      } else {
        this.fetchContent(contentUrl, ext);
      }
    },
    async splitIntoChunks() {
      const requestBody = {
        video_url: this.contentUrl,
        option: 'small',
        task_id: this.task_id
      };
      // console.log({ requestBody });
      try {
        const apiResponse = await this.$store.dispatch(
          'studio/breakVideoIntoScenes',
          requestBody
        );
        // console.log({ chunksAPIResponse: apiResponse });
        if (!this.task_id) this.task_id = apiResponse.task_id;
        if (apiResponse.status) {
          const scenes = {};
          const videos = {};
          const images = {};
          const keywords = {};
          apiResponse.data.forEach((chunkUrl, index) => {
            scenes[index] = '';
            videos[index] = '';
            images[index] = '';
            keywords[index] = [];
            this.$store.commit('studio/setInitialVideo', {
              indexs: index,
              value: chunkUrl
            });
            this.$store.commit('studio/setSentences', scenes);
            this.$store.commit('studio/setVideos', videos);
            this.$store.commit('studio/setKeywords', keywords);
            this.$store.commit('studio/setImages', images);
            this.$Progress.finish();
            this.$vs.loading.close();
            setTimeout(() => this.$store.commit('studio/toggleLibrary'), 1000);
          });
        } else {
          this.requestInterval = setTimeout(
            () => this.splitIntoChunks(),
            10000
          );
        }
      } catch (err) {
        console.log({ chunksAPIError: err });
        this.$vs.notify({
          title: 'Error',
          text: 'Fail to split video',
          color: 'danger'
        });
        this.$Progress.fail();
        this.$vs.loading.close();
      }
    },
    fetchContent(url, ext) {
      this.$Progress.start();
      this.$vs.loading({ color: 'transparent' });
      this.$store
        .dispatch('studio/extractInfoFromUrl', { url, ext })
        .then(data => {
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
          if (!this.uploadedDocumentIsPPT) this.tabIndex = 0;
          else
            setTimeout(() => this.$store.commit('studio/toggleLibrary'), 1000);

          this.$Progress.finish();
          this.$vs.loading.close();
        })
        .catch(() => {
          this.$Progress.fail();
          this.$vs.loading.close();
          this.$vs.notify({
            title: 'Invalid URL',
            text: 'No text found',
            color: 'danger'
          });
        });
    },
    onSelectText() {
      this.videoScript = this.queryContent.text;
      this.choiceModal = false;
    },
    onSelectLink(idx) {
      this.choiceModal = false;
      this.fetchContent(this.queryContent.links[idx]);
    }
  },
  beforeDestroy() {
    this.saveForm();
    window.removeEventListener('beforeunload', this.saveForm);
  }
};
</script>

<style scoped>
[contentEditable='true']:empty:not(:focus):before {
  content: attr(data-text);
}
::placeholder {
  color: #626262;
  opacity: 0.7;
}
.title2 {
  height: 40px !important;
  border: 0.5px solid lightgray;
  font-size: 14px;
  overflow-y: auto;
  border-radius: 5px;
  color: #626262;
  opacity: 1; /* Firefox */
  text-indent: 0.01%;
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-style: normal;
  font-variant: normal;
  text-decoration: none solid rgb(98, 98, 98);
  text-align: start;
  line-height: 22.4px;
  vertical-align: baseline;
  padding: 9px;
}
.description2 {
  height: 60px !important;
  border-radius: 5px;
  border: 0.5px solid lightgray;
  font-size: 14px;
  overflow-y: auto;
  color: #626262;
  opacity: 1;
  text-indent: 0.01%;
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-style: normal;
  font-variant: normal;
  text-decoration: none solid rgb(98, 98, 98);
  text-align: start;
  line-height: 22.4px;
  vertical-align: baseline;
  padding: 9px;
}
.video-script2 {
  height: 250px !important;
  border: 0.5px solid lightgray;
  font-size: 14px;
  overflow-y: auto;
  border-radius: 5px;
  color: #626262;
  opacity: 1;
  text-indent: 0.01%;
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-style: normal;
  font-variant: normal;
  text-decoration: none solid rgb(98, 98, 98);
  text-align: start;
  line-height: 22.4px;
  vertical-align: baseline;
  padding: 9px;
}
.video-script.vs-con-textarea >>> .vs-textarea {
  height: 250px !important;
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

.items-right {
  text-align: right;
  text-align: -moz-right;
  text-align: -webkit-right;
}

/*.text-window {
  height: 33rem;
  margin-top: calc(100% - 33rem);
} */

.text-window .vx-card {
  /*height: 20rem;*/
  border: 0.5px solid gray;
}

.text-window .vx-card div {
  padding: 0.2rem;
  height: 15rem;
  overflow-y: auto;
}
.text-window .vx-card {
  border: 1px solid rgba(0, 0, 0, 0.2);
}
</style>
