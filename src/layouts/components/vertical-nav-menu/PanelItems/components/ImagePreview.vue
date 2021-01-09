<template>
  <div class="img-hover-zoom relative">
    <img width="100%" height="auto" :src="src" @click="showOverlay(imageId)" />
    <div class="absolute img-overlay p-5 hidden" :id="imageId">
      <div class="flex justify-between">
        <h6 class="text-white">Select Motion</h6>
        <vs-icon
          icon="clear"
          size="15px"
          class="text-white"
          @click="hideOverlay(imageId)"
        />
      </div>
      <div class="flex flex-wrap justify-center items-center -m-1 mt-2">
        <div class="p-1">
          <vs-button
            type="filled"
            size="small"
            color="dark"
            @click="$emit('motion', 'in')"
            >Zoom In</vs-button
          >
        </div>
        <div class="p-1">
          <vs-button
            type="filled"
            size="small"
            color="dark"
            @click="$emit('motion', 'out')"
            >Zoom Out</vs-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ImagePreview',
  props: ['imageId', 'src'],
  methods: {
    showOverlay(imgId) {
      const overlay = document.getElementById(imgId);
      overlay.classList.remove('hidden');
    },
    hideOverlay(imgId) {
      const overlay = document.getElementById(imgId);
      overlay.classList.add('hidden');
    },
  },
};
</script>
<style scoped>
.zoom-in {
  transition: transform 4s;
}
.zoom-in:hover {
  -ms-transform: scale(1.5); /* IE 9 */
  -webkit-transform: scale(1.5); /* Safari 3-8 */
  transform: scale(1.5);
}
.img-hover-zoom {
  overflow: hidden;
  cursor: pointer;
  max-height: 140px;
}
.img-hover-zoom img {
  transform-origin: 50% 65%;
  transition: transform 5s, filter 3s ease-in-out;
  filter: brightness(150%);
}
.img-hover-zoom:hover img {
  filter: brightness(100%);
  transform: scale(3);
}
.img-overlay {
  height: 100%;
  width: 100%;
  top: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.75);
}
</style>
