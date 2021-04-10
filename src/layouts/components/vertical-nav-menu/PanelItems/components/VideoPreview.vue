<template>
  <div>
    <video
      width="100%"
      height="auto"
      :src="src"
      @mouseenter="playScene"
      @mouseleave="pauseScene"
    >
      <!--<source :src="v[1]" type="video/mp4">-->
      {{ $t('studio.sidebarPanel.course.c2') }}
    </video>
  </div>
</template>
<script>
export default {
  name: 'VideoPreview',
  props: ['src'],
  methods: {
    playScene(event) {
      const videoElement = event.target;
      if (videoElement.error == null) {
        videoElement.currentTime = 0;
        videoElement.play();
      }
    },
    pauseScene(event) {
      const videoElement = event.target;
      if (videoElement.error == null) {
        videoElement.pause();
      }
      /* const playPromise = videoElement.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          videoElement.pause();
        });
      } */
    }
  }
};
</script>
