<template>
  <div>
    <div class="relative mb-8">
      <!-- SEARCH INPUT -->
      <vx-input-group class="mb-base">
        <vs-input
          size="large"
          placeholder="What Do You Want To Learn ?"
          v-model="search"
        />
        <template slot="append">
          <div class="append-text btn-addon" style="background-color:#7367F0">
            <vs-button
              @click="searchVideos"
              size="large"
              color="primary"
              icon="search"
            ></vs-button>
          </div>
        </template>
      </vx-input-group>

      <!-- SEARCH LOADING -->
      <p :hidden="!isSearchStalled" class="mt-4 text-grey">
        <feather-icon
          icon="ClockIcon"
          svgClasses="w-4 h-4"
          class="mr-2 align-middle"
        />
        <span>Loading...</span>
      </p>

      <!-- SEARCH ICON -->
      <div
        slot="submit-icon"
        class="absolute top-0 right-0 py-4 px-6"
        v-show="!search"
      >
        <feather-icon icon="SearchIcon" svgClasses="h-6 w-6" />
      </div>

      <!-- CLEAR INPUT ICON -->
      <div
        slot="reset-icon"
        class="absolute top-0 right-0 py-4 px-6"
        v-show="search"
      >
        <feather-icon
          icon="XIcon"
          svgClasses="h-6 w-6 cursor-pointer"
          @click="search = ''"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BoxSearch',
  computed: {
    search: {
      get() {
        return this.$store.state.search.text;
      },
      set(value) {
        this.$store.commit('search/SET_TEXT', value);
      }
    },
    isSearchStalled() {
      return this.$store.state.search.isSearchStalled;
    }
  },
  methods: {
    searchVideos() {
      const payload = {
        text: this.search,
        notify: this.$vs.notify
      };
      this.$store.dispatch('search/searchVideos', payload);
    }
  }
};
</script>

<style scoped></style>
