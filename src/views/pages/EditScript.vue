<template>
  <div>
    <form>
      <vx-card :title="$t('studio.text.t1')" class="text-window">
        <div class="text-left">
          <h6>{{ $t('studio.text.t2') }}</h6>
          <!-- <vs-input
            :placeholder="$t('studio.text.t2')"
            @input="updateForm('title', $event.target.value)"
            :value="form.title"
            class="w-full mt-3 mb-3"
          /> -->
          <span class="text-danger text-sm" v-show="errors.has('title')">{{
            errors.first('title')
          }}</span>
          <input
            type="text"
            id="title"
            name="title"
            size="large"
            :placeholder="$t('studio.text.t2')"
            @input="updateForm('title', $event.target.value)"
            v-model="title"
            class="w-full mt-3 mb-3 title2"
            v-validate="'required'"
            autocomplete="off"
          />
          <!--h6>{{ $t('studio.text.t3') }}</h6-->
          <!-- <vs-textarea
            :placeholder="$t('studio.text.t3')"
            @input="updateForm('description', $event.target.value)"
            :value="form.description"
            class="w-full mt-3 mb-3"
          /> -->
          <!--input
            type="text"
            size="large"
            id="description"
            :placeholder="$t('studio.text.t3')"
            @input="updateForm('description', $event.target.value)"
            :value="form.description"
            v-validate="'required'"
            class="w-full mt-3 mb-3 description2"
          /-->
          <div class="flex items-center -mx-2">
            <h6 class="px-2">{{ $t('studio.text.t4') }}</h6>
            <div class="px-2">
              <!--v-select
                :options="options"
                :reduce="(label) => label.value"
                required
                label="label"
                v-model="srcLang"
              ></v-select-->
              <LanguageSelect v-model="srcLang" />
            </div>
          </div>
          <!-- <vs-textarea
            class="video-script"
            :placeholder="$t('studio.text.t5')"
            @input="updateForm('videoScript', $event.target.value)"
            :value="form.videoScript"
          >
            {{ videoScript }}
          </vs-textarea> -->
          <span class="text-danger text-sm" v-show="errors.has('script')">{{
            errors.first('script')
          }}</span>
          <textarea
            type="text"
            id="videoScript"
            name="script"
            :placeholder="$t('studio.text.t5')"
            @input="updateForm('videoScript', $event.target.value)"
            v-model="videoScript"
            v-validate="'required'"
            class="w-full mt-3 mb-3 video-script2"
          >
          </textarea>
        </div>
        <!--<vx-card no-shadow class="items-left mb-base mt-3">
          <div v-if="videoScript === ''" contenteditable="true" @input="scriptInput" data-text="Enter Your Video Script here...">
          </div>
          <div v-else contenteditable="true" @input="scriptInput">
            {{videoScript}}
          </div>
        </vx-card>-->
        <div class="items-center">
          <!--<div class="w-full items-center mb-base">
            <vs-button size="small" color="primary" class="mr-3" @click="summarizeScript">Summarize Script</vs-button>
            <vs-button size="small" color="primary" class="mr-3">Check Script for Errors</vs-button>
            <vs-button size="small" color="primary" class="mr-3">Long Scenes</vs-button>
          </div>-->
          <div class="w-full items-center">
            <vs-button class="bg-cutsom-purple" @click.prevent="handleSubmit">{{
              $t('studio.text.t6')
            }}</vs-button>
          </div>
        </div>
      </vx-card>
      <!--<div style="margin-bottom: 150px"></div>-->
    </form>
  </div>
</template>

<script>
import 'vue-select/dist/vue-select.css';
import LanguageSelect from './components/LanguageSelect.vue';
import axios from '../../axios';
import constants from '../../../constant';

export default {
  components: {
    LanguageSelect
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
      ]
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
    }
  },
  created() {
    if (!this.$route.params.videoId) {
      const storedForm = this.openStorage();
      if (storedForm) {
        /* this.form = {
        ...this.form,
        ...storedForm,
      }; */
        this.title = storedForm.title;
        this.videoScript = storedForm.videoScript;
      }
    }
  },
  methods: {
    openStorage() {
      return JSON.parse(localStorage.getItem('form'));
    },
    saveStorage(form) {
      localStorage.setItem('form', JSON.stringify(form));
    },
    updateForm(input, value) {
      // this.form[input] = value;
      let storedForm = this.openStorage();
      if (!storedForm) storedForm = {};
      storedForm[input] = value;
      this.saveStorage(storedForm);
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
      // this.$Progress.set(42)
      // save video script
      // Sentence Detection
      /* this.$store.commit('studio/SET_VIDEO_ATTR', {
        key: 'title',
        value: this.form.title,
      });
      this.$store.commit('studio/SET_VIDEO_ATTR', {
        key: 'description',
        value: this.form.description,
      });
      this.$store.commit('studio/SET_VIDEO_ATTR', {
        key: 'script',
        value: this.form.videoScript,
      }); */
      this.$store.commit('studio/SET_VIDEO_ATTR', {
        key: 'scrLang',
        value: this.srcLang
      });
      this.$store
        .dispatch('studio/sentenceDetection')
        .then(resSentences => {
          console.log('sentences', resSentences);
          this.$store
            .dispatch('studio/keywordExtraction')
            .then(resKeywords => {
              console.log('keywords', resKeywords);
              this.$store
                .dispatch('studio/videoSuggestions')
                .then(resVideos => {
                  console.log('videos', resVideos);
                  this.$store
                    .dispatch('studio/audioSuggestions')
                    .then(res => {
                      this.$Progress.finish();
                      this.$vs.loading.close();
                      /* Reset data */
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
                    });
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
            .catch(err => {
              console.log(err);
              this.$Progress.fail();
              this.$vs.loading.close();
              this.$vs.notify({
                title: 'Error Occured',
                text: 'keyword Extraction',
                color: 'danger'
              });
            });
        })
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
    }
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
  height: 280px !important;
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
