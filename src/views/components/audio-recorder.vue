<template>
  <div class="w-full">
    <div style="display: inline-block; margin-right: 10px">
      <vs-button
        :id="'recordButton_' + sceneNum"
        class="mb-3"
        :color="recordingInProcess ? 'danger' : 'primary'"
        >{{ $t('studio.voice.v1') }}</vs-button
      >
      <h6 v-if="recordingInProcess" class="mb-base">
        {{ prettyTime | prettify }}
      </h6>
      <!--ul
        :class="'playlist_' + sceneNum"
        :id="'play_' + sceneNum"
        class="mb-base"
      ></ul-->
      <div
        class="flex items-center -mx-2 justify-center"
        :id="'play_' + sceneNum"
        :key="isUpdated"
      >
        <div class="px-2">
          <div v-if="$store.state.studio.recordedAudios[sceneNum]">
            <audio controls>
              <source
                :src="$store.state.studio.recordedAudios[sceneNum]"
                type="audio/mp3"
              />
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
        <div class="px-2">
          <vs-button
            v-if="
              !recordingInProcess &&
                $store.state.studio.recordedAudios[sceneNum]
            "
            style="inline-text: center"
            @click="audioVideoMerge"
            >Add Voice</vs-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const MicRecorder = require('mic-recorder-to-mp3');
export default {
  name: 'audio-recorder',
  props: ['sceneNum'],
  data() {
    return {
      button: null,
      recorder: null,
      recordingInProcess: false,
      recordingReady: false,
      audioBlob: null,
      audioFile: null,
      isRunning: true,
      minutes: 0,
      secondes: 0,
      time: 0,
      timer: null
    };
  },
  filters: {
    prettify: function(value) {
      const data = value.split(':');
      let minutes = data[0];
      let secondes = data[1];
      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      if (secondes < 10) {
        secondes = '0' + secondes;
      }
      return minutes + ':' + secondes;
    }
  },
  computed: {
    prettyTime() {
      const time = this.time / 60;
      const minutes = parseInt(time);
      const secondes = Math.round((time - minutes) * 60);
      return minutes + ':' + secondes;
    },
    isUpdated() {
      return this.$store.state.studio.addedAudio;
    },
    isReady() {
      if (this.$store.state.studio.recordedAudios[this.sceneNum]) return true;
      return false;
    }
  },
  methods: {
    playVid() {
      const vid = document.getElementById('video_' + this.sceneNum);
      vid.currentTime = 0;
      vid.play();
    },
    pauseVid() {
      const vid = document.getElementById('video_' + this.sceneNum);
      vid.pause();
    },
    startRecording() {
      this.recorder
        .start()
        .then(() => {
          this.playVid();
          this.startTimer();

          this.button.textContent = this.$t('studio.voice.v3');
          this.recordingInProcess = true;
          document.querySelector('#play_' + this.sceneNum).innerHTML = '';
          // this.button.classList.toggle('btn-danger');
          this.recordingReady = false;
          this.button.removeEventListener('click', this.startRecording);
          this.button.addEventListener('click', this.stopRecording);
        })
        .catch(e => {
          console.error(e);
        });
    },
    toBase64(blob) {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      let base64data = null;
      return new Promise((resolve, reject) => {
        reader.onloadend = function() {
          base64data = reader.result;
          // console.log(base64data);
          resolve(base64data);
        };
      });
    },
    stopRecording() {
      this.recorder
        .stop()
        .getMp3()
        .then(([buffer, blob]) => {
          this.pauseVid();
          this.resetTimer();

          this.recordingInProcess = false;
          // console.log(buffer, blob);

          this.toBase64(blob)
            .then(res => {
              this.audioBlob = res;
              // console.log('ab', this.audioBlob);
              /* this.audioFile = new File(
              buffer,
              'music_' + this.sceneNum + '.mp3',
              {
                type: blob.type,
                lastModified: Date.now(),
              }
            ); */
              // console.log(file);

              /* const li = document.createElement('li');
            const url = URL.createObjectURL(file);
            var player = new Audio(URL.createObjectURL(file));
            player.controls = true;
            li.style.display = 'flex';
            li.appendChild(player); */
              /* document.querySelector('#playlist_' + this.sceneNum).innerHTML = '';
            document
              .querySelector('#playlist_' + this.sceneNum)
              .appendChild(li); */
              /* const li_panel = li.cloneNode(true);
            const childList = [li, li_panel];
            const elementArray = document.querySelectorAll(
              '.playlist_' + this.sceneNum
            );
            elementArray.forEach((element, idx) => {
              element.innerHTML = '';
              element.appendChild(childList[idx]);
            }); */
              // this.button.textContent = this.$t('studio.voice.v4');
              /* this.button.innerHTML = `<i class="vs-icon notranslate icon-scale material-icons 20px" style="width: 20px; height: 20px; font-size: 20px;">replay</i>`;
            const url = URL.createObjectURL(this.audioFile);
            const audioObj = {
              audio: url,
              sceneNum: this.sceneNum,
            };
            this.$store.commit('studio/setRecordedAudio', audioObj);
            this.$emit('updateComponent');
            this.recordingReady = true;
            // this.button.classList.toggle('btn-danger');
            this.button.removeEventListener('click', this.stopRecording);
            this.button.addEventListener('click', this.startRecording);
          }); */
            })
            .catch(e => {
              console.error(e);
            });
          this.audioFile = new File(buffer, 'music_' + this.sceneNum + '.mp3', {
            type: blob.type,
            lastModified: Date.now()
          });
          this.button.innerHTML = `<i class="vs-icon notranslate icon-scale material-icons 20px" style="width: 20px; height: 20px; font-size: 20px;">replay</i>`;
          const url = URL.createObjectURL(this.audioFile);
          const audioObj = {
            audio: url,
            sceneNum: this.sceneNum
          };
          this.$store.commit('studio/setRecordedAudio', audioObj);
          this.$emit('updateComponent');
          this.recordingReady = true;
          // this.button.classList.toggle('btn-danger');
          this.button.removeEventListener('click', this.stopRecording);
          this.button.addEventListener('click', this.startRecording);
        });
    },
    audioVideoMerge() {
      const fd = new FormData();
      // fd.append("audio_data", this.audioBlob, this.audioBlob.name)
      // console.log(fd.entries())
      /* this.audioBlob.arrayBuffer().then(res => {
        console.log(res)
      }) */
      // console.log('audio blob', this.audioBlob);
      var dataObj = {
        audio: this.audioBlob
      };
      // fd.append('audio', this.audioFile);
      let videoUrl = '';
      if (
        this.$store.state.studio.preparedScenesVideos[
          parseInt(this.sceneNum) + 1
        ]
      ) {
        videoUrl = this.$store.state.studio.preparedScenesVideos[
          parseInt(this.sceneNum) + 1
        ];
      } else {
        videoUrl = this.$store.state.studio.selectedFromLibraryVideos[
          parseInt(this.sceneNum) + 1
        ];
      }
      dataObj.video = videoUrl;
      // fd.append('video', videoUrl);
      // console.log({ requestPayload: fd });
      this.$Progress.start();
      this.$vs.loading({ color: 'transparent' });
      this.$store
        .dispatch('studio/audioVideoMerge', dataObj)
        .then(res => {
          console.log(res);
          this.$emit('updateComponent');
          this.$Progress.finish();
          this.$vs.loading.close();
          console.log('done', res.data.url);
          // this.f(res.data.url);
        })
        .catch(err => {
          console.log(err);
          this.$Progress.fail();
          this.$vs.loading.close();
          this.$vs.notify({
            title: 'Error Occured',
            text: 'Cannot merge audio and video',
            color: 'danger'
          });
        });
    },
    f(v) {
      this.$store.commit('studio/selectVideo', v);
      console.log(
        'selected videos',
        this.$store.state.studio.preparedScenesVideos
      );
    },
    startTimer() {
      this.isRunning = true;
      if (!this.timer) {
        this.timer = setInterval(() => {
          this.time++;
          /* if (this.time > 0) {
            this.time++
          } else {
            clearInterval(this.timer)
            //this.sound.play()
            this.reset()
          } */
        }, 1000);
      }
    },
    stopTimer() {
      this.isRunning = false;
      clearInterval(this.timer);
      this.timer = null;
    },
    resetTimer() {
      this.stopTimer();
      this.time = 0;
      this.secondes = 0;
      this.minutes = 0;
    }
  },
  mounted() {
    this.button = document.querySelector('#recordButton_' + this.sceneNum);
    this.recorder = new MicRecorder({
      bitRate: 128
    });
    this.button.addEventListener('click', this.startRecording);
    if (this.isReady)
      this.button.innerHTML = `<i class="vs-icon notranslate icon-scale material-icons 20px" style="width: 20px; height: 20px; font-size: 20px;">replay</i>`;
  }
};
</script>

<style scoped>
.mainblock {
  margin-bottom: -12%;
}
</style>
