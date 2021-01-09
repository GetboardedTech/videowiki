<template>
  <div class="container-fluid mx-auto mt-5">
    <div
      id="algolia-instant-search-demo"
    >

      <div class="algolia-header mb-4">
        <div class="flex md:items-end items-center justify-between flex-wrap">
          <!-- TOGGLE SIDEBAR BUTTON -->
          <feather-icon
            class="inline-flex lg:hidden cursor-pointer mr-4"
            icon="MenuIcon"
            @click.stop="toggleFilterSidebar"
          />

          <p class="lg:inline-flex hidden font-semibold algolia-filters-label">
            Filters
          </p>

          <div class="float-right">

            <div class="flex flex-wrap">
              <!-- SORTING -->
              <sort-by-search
                :items="[
                  { value: 'recommended', label: 'Recommended' },
                  { value: 'popular', label: 'Popular' },
                  { value: 'trending', label: 'Trending' }
                ]"
              >
                <vs-select
                  :value="currentRefinement"
                  slot-scope="{ items, currentRefinement, refine }"
                  @input="val => refine(val)"
                  class="mr-4 vs-input-shadow-drop vs-select-no-border d-theme-input-dark-bg w-48"
                >
                  <vs-select-item
                    v-for="item in items"
                    :key="item.value"
                    :value="item.value"
                    :text="item.label"
                  />
                </vs-select>
              </sort-by-search>

              <!-- ITEM VIEW - GRID/LIST -->
              <div>
                <feather-icon
                  icon="GridIcon"
                  @click="currentItemView = 'item-grid-view'"
                  class="p-2 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer"
                  :svgClasses="{
                    'text-primary stroke-current':
                      currentItemView == 'item-grid-view'
                  }"
                />
                <feather-icon
                  icon="ListIcon"
                  @click="currentItemView = 'item-list-view'"
                  class="p-2 ml-4 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer hidden sm:inline-flex"
                  :svgClasses="{
                    'text-primary stroke-current':
                      currentItemView == 'item-list-view'
                  }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="algolia-content-container" class="relative clearfix">
        <vs-sidebar
          class="items-no-padding vs-sidebar-rounded background-absolute"
          parent="#algolia-content-container"
          :click-not-close="clickNotClose"
          :hidden-background="clickNotClose"
          v-model="isFilterSidebarActive"
        >
          <div class="p-6 filter-container">
            <!-- MULTI RANGE -->
            <h6 class="font-bold mb-3">Video Time Range</h6>
            <numeric-search attribute="price" :items="numericItems">
              <ul slot-scope="{ items, refine, currentRefinement }">
                <li
                  v-for="item in items"
                  :key="item.value"
                  class="flex items-center cursor-pointer py-1"
                  @click="refine(item.value)"
                >
                  <feather-icon
                    icon="CircleIcon"
                    :svgClasses="[
                      { 'text-primary fill-current': item.value === currentRefinement },
                      'h-5 w-5'
                    ]"
                  />
                  <span
                    class="ml-2"
                    :class="{ 'text-primary': item.value === currentRefinement }"
                    >{{ item.label }}</span
                  >
                </li>
              </ul>
            </numeric-search>

            <vs-divider />

            <!-- Brands -->
            <h6 class="font-bold mb-4">Topics</h6>
            <array-search attribute="brand" :items="topicsItems">
              <div slot-scope="{ items, currentRefinement, refine }">
                <ul>
                  <li v-if="!items.length">No results.</li>
                  <li
                    v-for="item in items"
                    :key="item.value"
                    class="mb-2 flex items-center justify-between"
                  >
                    <vs-checkbox
                      class="ml-0"
                      @click="refine(item.value)"
                      >{{ item.label }}</vs-checkbox
                    >
<!--                    <span>{{ item.count }}</span>-->
                  </li>
                </ul>
              </div>
            </array-search>
            <vs-divider />

            <!-- Rating -->
            <h6 class="font-bold mb-3">Rating</h6>
            <numeric-search attribute="rating" :items="ratingItems">
              <ul slot-scope="{ items, refine, createURL }">
                <li v-for="item in items" :key="item.value" class="mb-2">
                  <div
                    @click.prevent="refine(item.value)"
                    class="flex justify-between items-center"
                  >
                    <div class="flex items-center flex-wrap">
                      <feather-icon
                        icon="StarIcon"
                        :svgClasses="[
                          {
                            'text-warning': full,
                            'text-grey': !full,
                            'ml-1': index
                          },
                          'cursor-pointer stroke-current h-6 w-6'
                        ]"
                        v-for="(full, index) in item.value"
                        :key="index"
                      />
                      <span class="ml-2">&amp; up</span>
                    </div>
<!--                    <span>({{ item.count }})</span>-->
                  </div>
                </li>
              </ul>
            </numeric-search>

            <vs-divider />

            <div class="flex justify-center">
              <vs-button
                class="w-full"
                slot-scope="{ canRefine, refine, createURL }"
                @click.prevent="refine"
                :disabled="!canRefine"
                >Remove Filters</vs-button
              >
            </div>
          </div>
        </vs-sidebar>

        <!-- RIGHT COL -->
        <div :class="{ 'sidebar-spacer-with-margin': clickNotClose }">
          <!-- SEARCH BAR -->
          <box-search v-if="showSearch"></box-search>

          <!-- SEARCH RESULT -->
              <!-- GRID VIEW -->
              <template v-if="currentItemView == 'item-grid-view'">
                <div class="items-grid-view vx-row match-height">
                  <div
                    class="vx-col lg:w-1/3 sm:w-1/2 w-full"
                    v-for="item in videos"
                    :key="item.id"
                  >
                    <item-grid-view :item="item">
                      <!-- SLOT: ACTION BUTTONS -->
                      <template slot="action-buttons">
                        <div class="flex flex-wrap">
                          <!-- PRIMARY BUTTON: ADD TO WISH LIST -->
                          <div
                            class="item-view-primary-action-btn p-3 flex flex-grow items-center justify-center cursor-pointer"
                            @click="forkVideo"
                          >
                            <vs-icon icon="call_split"></vs-icon>
                            <button :disabled="btndisabl" style="border: none;"><span class="text-sm font-semibold ml-2"
                              >Fork</span
                            ></button>
                          </div>

                          <!-- SECONDARY BUTTON: ADD-TO/VIEW-IN CART -->
                          <div
                            class="item-view-secondary-action-btn bg-primary p-3 flex flex-grow items-center justify-center text-white cursor-pointer"
                            @click="viewVideo(item)"
                          >
                            <feather-icon
                              icon="ShoppingBagIcon"
                              svgClasses="h-4 w-4"
                            />

                            <span
                              class="text-sm font-semibold ml-2"
                              >VIEW</span>
                          </div>
                        </div>
                      </template>
                    </item-grid-view>
                  </div>
                </div>
              </template>

              <!-- LIST VIEW -->
              <template v-else>
                <div
                  class="items-list-view mb-base"
                  v-for="item in videos"
                  :key="item.objectID"
                >
                  <item-list-view :item="item">
                    <!-- SLOT: ACTION BUTTONS -->
                    <template slot="action-buttons">
                      <div
                        class="item-view-primary-action-btn p-3 rounded-lg flex flex-grow items-center justify-center cursor-pointer mb-3"
                        @click="forkVideo"
                      >
                        <vs-icon icon="call_split"></vs-icon>
                        <button :disabled="btndisabl" style="border: none;"><span class="text-sm font-semibold ml-2"
                          >Fork</span
                        ></button>
                      </div>
                      <div
                        class="item-view-secondary-action-btn bg-primary p-3 rounded-lg flex flex-grow items-center justify-center text-white cursor-pointer"
                        @click="viewVideo(item)"
                      >
                        <feather-icon
                          icon="ShoppingBagIcon"
                          svgClasses="h-4 w-4"
                        />

                        <span
                          class="text-sm font-semibold ml-2"
                          >VIEW</span
                        >
                      </div>
                    </template>
                  </item-list-view>
                </div>
              </template>

          <!-- PAGINATION -->
<!--          <ais-pagination>-->
<!--            <div-->
<!--              slot-scope="{-->
<!--                currentRefinement,-->
<!--                nbPages,-->
<!--                pages,-->
<!--                isFirstPage,-->
<!--                isLastPage,-->
<!--                refine,-->
<!--                createURL-->
<!--              }"-->
<!--            >-->
<!--              <vs-pagination-->
<!--                :total="nbPages"-->
<!--                :max="7"-->
<!--                :value="currentRefinement + 1"-->
<!--                @input="-->
<!--                  val => {-->
<!--                    refine(val - 1);-->
<!--                  }-->
<!--                "-->
<!--              />-->
<!--            </div>-->
<!--          </ais-pagination>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SortBySearch from "../../components/search/SortBySearch";
  import NumericSearch from "../../components/search/NumericSearch";
  import ArraySearch from "../../components/search/ArraySearch";
  import BoxSearch from "../../components/search/BoxSearch";

export default {
  name: 'Search',
  props: {
    showSearch: {
      type: Boolean,
      default() {
        return true
      }
    }
  },
  components: {
    BoxSearch,
    ItemGridView: () => import('./components/ItemGridView.vue'),
    ItemListView: () => import('./components/ItemListView.vue'),
    SortBySearch,
    NumericSearch,
    ArraySearch
  },
  data() {
    return {
      // Filter Sidebar
      btndisabl: false,
      isFilterSidebarActive: true,
      clickNotClose: true,
      currentItemView: 'item-grid-view',
      numericItems: [
        { label: 'All', value: 0 },
        { label: '<= 1 Min', value: 60 },
        { label: '1 - 2 Min', value: 120 },
        { label: '2 - 5 Min', value: 300 },
        { label: '>= 5 Min', start: 1000000000 }
      ],
      topicsItems: [
        { label: 'All', value: '' },
        { label: 'Science', value: 'science' },
        { label: 'Mathematics', value: 'mathematics' },
        { label: 'Biology', value: 'biology' },
        { label: 'Computer', start: 'computer' }
      ],
      ratingItems: [
        { label: 'All', value: 1 },
        { label: 'Science', value: 2 },
        { label: 'Mathematics', value: 3 },
        { label: 'Biology', value: 4 },
      ],
    };
  },
  computed: {
    // GRID VIEW
    videos() {
      return this.$store.state.search.videos;
    },
    windowWidth() {
      return this.$store.state.windowWidth;
    }
  },
  watch: {
    windowWidth() {
      this.setSidebarWidth();
    }
  },
  methods: {
    setSidebarWidth() {
      if (this.windowWidth < 992) {
        this.isFilterSidebarActive = this.clickNotClose = false;
      } else {
        this.isFilterSidebarActive = this.clickNotClose = true;
      }
    },
    // GRID VIEW - ACTIONS
    toggleFilterSidebar() {
      if (this.clickNotClose) return;
      this.isFilterSidebarActive = !this.isFilterSidebarActive;
    },
    forkVideo() {
      try {
        this.btndisabl = true;
        // Write blockchain code here!!!!
      }
      catch(err) {
        console.log(err);
      }
      finally {
        this.btndisabl = false;
      }
    },
    // forkVideo(item) {
    //   this.$vs.notify({
    //     title: 'Coming Soon',
    //     text: 'This Feature will add soon.',
    //     iconPack: 'feather',
    //     icon: 'icon-alert-circle',
    //     color: 'warning'
    //   });
    // },
    viewVideo(item) {
      this.$router.push({
        path: `/video/${item.slug}`
      })
    }
  },
  created() {
    this.setSidebarWidth();
    this.$store.dispatch('search/getVideos')
  }
};
</script>
<style lang="scss" scoped>
#algolia-instant-search-demo {
  .algolia-header {
    .algolia-filters-label {
      width: calc(260px + 2.4rem);
    }
  }

  #algolia-content-container {
    .vs-sidebar {
      position: relative;
      float: left;
    }
  }

  .algolia-search-input-right-aligned-icon {
    padding: 1rem 1.5rem;
  }

  .algolia-price-slider {
    min-width: unset;
  }

  .item-view-primary-action-btn {
    color: #2c2c2c !important;
    background-color: #f6f6f6;
    min-width: 50%;
  }

  .item-view-secondary-action-btn {
    min-width: 50%;
  }
}

@media (min-width: 992px) {
  .vs-sidebar-rounded {
    .vs-sidebar {
      border-radius: 0.5rem;
    }

    .vs-sidebar--items {
      border-radius: 0.5rem;
    }
  }
}

@media (max-width: 992px) {
  #algolia-content-container {
    .vs-sidebar {
      position: absolute !important;
      float: none !important;
    }
  }
}
</style>
