<template>
  <l-map
    style="height: 650px"
    :zoom.sync="zoom"
    :center="center"
    @update:center="centerUpdate"
    :options="{ scrollWheelZoom: false, zoomControl: false }"
  >
    <l-tile-layer :url="url"></l-tile-layer>
    <template v-for="(member, idx) in memberList">
      <l-marker :lat-lng="member.loc" :key="idx">
        <l-icon
          :icon-size="dynamicSize"
          :icon-anchor="dynamicAnchor"
          :icon-url="require('@/assets/images/pages/marker.png')"
        >
        </l-icon>
        <l-popup :options="customPopup">
          <div class="flex items-center -mx-2">
            <vs-avatar size="50px" :src="member.image" />
            <div class="px-2">
              <h4>{{ member.name }}</h4>
              <p class="m-0">{{ member.role }}</p>
            </div>
          </div>
        </l-popup>
      </l-marker>
    </template>
    <l-control-zoom position="bottomright"></l-control-zoom>
  </l-map>
</template>
<script>
import {
  LMap,
  LTileLayer,
  LMarker,
  LIcon,
  LPopup,
  LControlZoom
} from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
    LPopup,
    LControlZoom
  },
  props: ['memberList'],
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 3,
      iconSize: 35,
      center: [20.5937, 78.9629],
      customPopup: {
        closeButton: false,
        offset: { x: 0, y: -40 }
      }
    };
  },
  computed: {
    dynamicSize() {
      return [this.iconSize, this.iconSize * 1.15];
    },
    dynamicAnchor() {
      return [this.iconSize / 2, this.iconSize * 1.15];
    }
  },
  methods: {
    centerUpdate(center) {
      this.center = center;
    }
  }
};
</script>
