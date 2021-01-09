<template>
  <div class="w-full">
    <div style="display: inline-block; margin-right: 10px">
      <vs-button
        v-if="!recordedAudios[parseInt(sceneNum)] && !recordingInProcess"
        class="mb-3"
        @click="startRecording"
        >{{ $t('studio.voice.v1') }}</vs-button
      >
      <div v-show="recordingInProcess">
        <vs-button color="danger" class="mb-3" @click="stopRecording">{{
          $t('studio.voice.v3')
        }}</vs-button>
        <h6 class="mb-base">
          {{ prettyTime | prettify }}
        </h6>
      </div>
      <!--ul
        :class="'playlist_' + sceneNum"
        :id="'play_' + sceneNum"
        class="mb-base"
      ></ul-->
      <div
        v-if="recordedAudios[parseInt(sceneNum)] && !recordingInProcess"
        class="flex flex-wrap items-center -m-3 justify-center"
      >
        <div class="p-3 flex lg:w-1/2 md:w-1/2 sm:w-1/2 w-4/5">
          <audio controls :id="'audio_' + sceneNum">
            <source :src="recordedAudios[parseInt(sceneNum)]" type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>
        <div class="p-3">
          <vx-tooltip text="Record again">
            <vs-button icon="replay" @click="startRecording" />
          </vx-tooltip>
        </div>
        <div class="p-3">
          <vs-button
            style="inline-text: center"
            @click="compareAudioVideoDuration"
            >Add Voice</vs-button
          >
        </div>
      </div>
    </div>
    <vs-popup title="Confirmation" :active.sync="showModal">
      <p v-if="trimVideo" class="mb-base">
        We will trim the video to match it with audio
      </p>
      <p v-else class="mb-base">
        We will loop the video to match it with audio
      </p>
      <div class="flex justify-around">
        <vs-button type="filled" color="danger" @click="showModal = false"
          >No, Record Again</vs-button
        >
        <vs-button type="filled" color="primary" @click="audioVideoMerge"
          >OK</vs-button
        >
      </div>
    </vs-popup>
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
      trimVideo: false,
      showModal: false,
      minutes: 0,
      secondes: 0,
      time: 0,
      timer: null,
    };
  },
  filters: {
    prettify: function (value) {
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
    },
  },
  computed: {
    prettyTime() {
      const time = this.time / 60;
      const minutes = parseInt(time);
      const secondes = Math.round((time - minutes) * 60);
      return minutes + ':' + secondes;
    },
    recordedAudios() {
      return this.$store.state.studio.recordedAudios;
    },
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
          this.recordingInProcess = true;
        })
        .catch((e) => {
          console.error(e);
        });
    },
    toBase64(blob) {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      let base64data = null;
      return new Promise((resolve, reject) => {
        reader.onloadend = function () {
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
          //console.log(buffer, blob);

          /* this.toBase64(blob)
            .then((res) => {
              this.audioBlob = res;
            })
            .catch((e) => {
              console.error(e);
            }); */
          this.audioFile = new File(buffer, 'music_' + this.sceneNum + '.mp3', {
            type: blob.type,
            lastModified: Date.now(),
          });
          const url = URL.createObjectURL(this.audioFile);
          const audioObj = {
            value: url,
            sceneNum: parseInt(this.sceneNum),
          };
          this.$store.commit('studio/setRecordedAudio', audioObj);
          //this.$emit('updateComponent');
        });
    },
    compareAudioVideoDuration() {
      const videoDuration = document.getElementById('video_' + this.sceneNum)
        .duration;
      const audioDuration = document.getElementById('audio_' + this.sceneNum)
        .duration;
      if (Math.abs(audioDuration - videoDuration) > 1) {
        this.showModal = true;
        if (audioDuration < videoDuration) this.trimVideo = true;
      } else this.audioVideoMerge();
    },
    audioVideoMerge() {
      if (this.showModal) this.showModal = false;
      this.$vs.loading({
        background: '#fff',
        container: `#scene_card_${this.sceneNum}`,
        type: 'sound',
        text: 'Adding Voice...',
      });
      const fd = new FormData();
      // fd.append("audio_data", this.audioBlob, this.audioBlob.name)
      // console.log(fd.entries())
      /* this.audioBlob.arrayBuffer().then(res => {
        console.log(res)
      }) */
      // console.log('audio blob', this.audioBlob);
      /* var dataObj = {
        audio: this.audioFile,
      }; */
      const audioUrl = this.audioFile
        ? this.audioFile
        : this.recordedAudios[parseInt(this.sceneNum)];
      fd.append('audio', audioUrl);
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
      // dataObj.video = videoUrl;
      fd.append('video', videoUrl);
      /*this.$Progress.start();
      this.$vs.loading({ color: 'transparent' });*/
      this.$store
        .dispatch('studio/audioVideoMerge', fd)
        .then((res) => {
          console.log(res);
          const response = {
            sceneNum: parseInt(this.sceneNum) + 1,
            value: res.data.video_url,
          };
          this.$emit('updateComponent');
          this.$store.commit('studio/setVideoWithAudio', response);
          this.$store.commit('studio/setRecordedAudio', {
            sceneNum: parseInt(this.sceneNum),
            value: res.data.audio_url,
          });
          /*this.$Progress.finish();
          this.$vs.loading.close();*/
          // console.log('done', res.data.url);
          //this.f(res.data.url);
        })
        .catch((err) => {
          console.log(err);
          /*this.$Progress.fail();
          this.$vs.loading.close();*/
          this.$vs.notify({
            title: 'Error Occured',
            text: 'Cannot merge audio and video',
            color: 'danger',
          });
        })
        .finally(() => {
          this.$vs.loading.close(
            `#scene_card_${this.sceneNum} > .con-vs-loading`
          );
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
    },
  },
  mounted() {
    this.recorder = new MicRecorder({
      bitRate: 128,
    });
  },
};
</script>

<style scoped>
.mainblock {
  margin-bottom: -12%;
}
</style>
