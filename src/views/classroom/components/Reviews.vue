<template>
  <vueper-slides
    class="no-shadow"
    :visible-slides="3"
    :gap="6"
    :breakpoints="breakpoints"
    :arrows="false"
    :touchable="false"
    @slide="activeSlide = $event.currentSlide.index"
    bullets-outside
  >
    <vueper-slide v-for="(user, idx) in users" :key="idx">
      <template v-slot:content>
        <div
          class="vueperslide__content-wrapper m-1"
          :class="{ 'active-review': idx !== activeSlide }"
        >
          <div
            class="vx-card mb-base text-left bg-transparent review p-4"
            :class="{ 'no-shadow': idx !== activeSlide }"
          >
            <div class="flex justify-start">
              <span class="-mt-4"
                ><vs-icon
                  icon="format_quote"
                  size="50px"
                  class="quote_icon"
                  :class="{ 'text-custom-purple': idx === activeSlide }"
              /></span>
              {{ user.review }}
            </div>
          </div>
          <vs-avatar src="" size="70px" />
          <div class="font-bold">{{ user.name }}</div>
          <div class="text-muted text-xs">{{ user.desc }}</div>
        </div>
      </template>
    </vueper-slide>
  </vueper-slides>
</template>
<script>
import { VueperSlides, VueperSlide } from 'vueperslides';
import 'vueperslides/dist/vueperslides.css';
export default {
  name: 'Reviews',
  components: {
    VueperSlides,
    VueperSlide
  },
  props: ['users'],
  data() {
    return {
      activeSlide: 0,
      breakpoints: {
        1200: {
          slideRatio: 0.5,
          visibleSlides: 3
        },
        1024: {
          slideRatio: 0.6,
          visibleSlides: 2
        },
        640: {
          slideRatio: 0.8,
          visibleSlides: 1
        },
        // The order you list breakpoints does not matter, Vueper Slides will sort them for you.
        480: {
          slideRatio: 1.4,
          visibleSlides: 1,
          touchable: true
        }
      }
    };
  }
};
</script>
<style lang="scss">
.vueperslides__bullet--active .default {
  background: #7247c4 !important;
}
.vueperslides__bullet .default {
  border: none !important;
}
.vueperslide--active .vueperslide__content-wrapper .review {
  background: white !important;
  padding: 2%;
}
.quote_icon {
  transform: rotate(180deg);
}
.active-review {
  transform: scale(0.8);
}
@media only screen and (max-width: 480px) {
  .active-review {
  }
}
</style>
