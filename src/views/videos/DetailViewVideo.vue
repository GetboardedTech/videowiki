<template>
  <div id="item-detail-page" class="container-fluid mx-auto">
    <vx-card
      v-if="item_data.user"
      :key="item_data.id"
      style="margin-top: 30px; min-height: calc(100vh - 100px)"
    >
      <template slot="no-body">
        <div class="item-content">
          <!-- Item Main Info -->
          <div class="product-details p-6">
            <div class="vx-row mt-6">
              <div
                class="vx-col lg:w-2/3 md:w-1/1 w-full flex items-center justify-center"
              >
                <div class="product-img-container w-3/5 mx-auto mb-10 md:mb-0">
                  <video
                    width="100%"
                    height="auto"
                    :src="item_data.url"
                    controls
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>

              <!-- Item Content -->
              <div class="vx-col lg:w-1/3 md:w-1/1 w-full">
                <h3>{{ item_data.title }}</h3>

                <p class="my-2">
                  <span class="mr-2">by</span>
                  <span
                    >{{ item_data.user.first_name }}
                    {{ item_data.user.last_name }}</span
                  >
                </p>
                <p class="flex items-center flex-wrap">
                  <span
                    class="text-2xl leading-none font-medium text-primary mr-4 mt-2"
                    >{{ item_data.time }} Min</span
                  >
                  <span
                    class="pl-4 mr-2 mt-2 border border-solid d-theme-border-grey-light border-t-0 border-b-0 border-r-0"
                    ><star-rating
                      :show-rating="false"
                      :rating="item_data.rating"
                      :star-size="20"
                      read-only
                  /></span>
                </p>

                <vs-divider />

                <p>{{ item_data.description }}</p>

                <vs-divider />
                <h5>Video Script</h5>
                <p>{{ item_data.script }}</p>
                <vs-divider />

                <!-- Quantity -->
                <div class="vx-row">
                  <div class="vx-col w-full">
                    <div class="flex flex-wrap items-start mb-4">
                      <!-- Add To Cart Button -->
                      <vs-button
                        class="mr-4 mb-4"
                        icon-pack="feather"
                        icon="icon-call_split"
                        @click="forkVideo"
                        :disabled="btndisab"
                      >
                        Fork
                      </vs-button>

                      <!-- /Add To Cart Button -->

                      <!-- Wishlist Button -->
                      <vs-button
                        class="mb-4"
                        icon-pack="feather"
                        icon="icon-star"
                        color="#ffa54e"
                      >
                        Star
                      </vs-button>

                      <!-- /Wishlist Button -->
                    </div>
                  </div>
                </div>
                <!-- /Quantity -->

                <div class="vx-row">
                  <div class="vx-col flex flex-wrap items-center">
                    <vs-button
                      class="mr-4"
                      type="border"
                      icon-pack="feather"
                      color="#1551b1"
                      icon="icon-facebook"
                      radius
                    ></vs-button>
                    <vs-button
                      class="mr-4"
                      type="border"
                      icon-pack="feather"
                      color="#00aaff"
                      icon="icon-twitter"
                      radius
                    ></vs-button>
                    <vs-button
                      class="mr-4"
                      type="border"
                      icon-pack="feather"
                      color="#c4302b"
                      icon="icon-youtube"
                      radius
                    ></vs-button>
                    <vs-button
                      class="mr-4"
                      type="border"
                      icon-pack="feather"
                      color="#405DE6"
                      icon="icon-instagram"
                      radius
                    ></vs-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </vx-card>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.min.css';
import StarRating from 'vue-star-rating';
import axios from '../../axios';
import constants from '../../../constant';

export default {
  name: 'DetailViewVideo',
  components: {
    StarRating
  },
  data() {
    return {
      item_data: {},
      error_occured: false,
      btndisab: false,
      error_msg: '',
      constants,
      // Below is data which is common in any item
      // Algolia's dataSet don't provide this kind of data. So, here's dummy data for demo
      available_item_colors: [
        '#7367F0',
        '#28C76F',
        '#EA5455',
        '#FF9F43',
        '#1E1E1E'
      ],
      opt_color: '#7367F0',
      is_hearted: false
    };
  },
  computed: {
    itemColor() {
      return obj => {
        const style_obj = {};

        obj.style.forEach(p => {
          style_obj[p] = obj.color;
        });

        return style_obj;
      };
    }
  },
  methods: {
    forkVideo() {
      try {
        this.btndisab = true;
      } catch (err) {
        console.log(err);
      } finally {
        this.btndisab = false;
      }
    },
    fetch_item_details(id) {
      axios
        .get(constants.apiUrl + '/api/videos?slug=' + id)
        .then(response => {
          response = response.data || response;
          response = response.results;
          if (response.length) {
            this.item_data = response[0];
          } else {
            this.$router.push('/error/404');
          }
        })
        .catch(error => {
          console.log(error);
          this.$router.push('/error/404');
        });
    }
  },
  created() {
    this.fetch_item_details(this.$route.params.slug);
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/vuexy/_variables.scss';

#item-detail-page {
  .color-radio {
    height: 2.28rem;
    width: 2.28rem;

    > div {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .item-features {
    background-color: #f7f7f7;

    .theme-dark & {
      background-color: $theme-dark-secondary-bg;
    }
  }

  .product-sales-meta-list {
    .vs-list--icon {
      padding-left: 0;
    }
  }

  .related-product-swiper {
    // padding-right: 2rem;
    // padding-left: 2rem;

    .swiper-wrapper {
      padding-bottom: 2rem;

      > .swiper-slide {
        background-color: #f7f7f7;
        box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.1),
          0 5px 12px 0 rgba(0, 0, 0, 0.08) !important;

        .theme-dark & {
          background-color: $theme-light-dark-bg;
        }
      }
    }

    .swiper-button-next,
    .swiper-button-prev {
      transform: scale(0.5);
      filter: hue-rotate(40deg);
    }

    .swiper-button-next {
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
    }
  }
}
</style>
