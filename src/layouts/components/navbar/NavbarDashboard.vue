<template>
  <div class="relative">
    <div class="vx-navbar-wrapper navbar-full p-0">
      <vs-navbar class="navbar-custom navbar-skelton custom-header">
        <router-link
          tag="div"
          to="/"
          class="vx-logo cursor-pointer flex mx-auto w-1/6 items-center"
        >
          <!--logo class="w-10 mr-4 fill-current text-primary" /-->
          <img src="@/assets/images/logo/logo.svg" class="mr-2 h-12" />
          <span class="vx-logo-text text-custom-purple" style="font-size: 20px"
            >VideoWiki</span
          >
        </router-link>
        <div
          class="vx-row w-full md:w-2/3 sm:w-1/1 p-2 items-center justify-center"
        >
          <div
            class="w-full lg:w-1/2 md:w-1/1 sm:w-1/1 relative hidden lg:block"
          >
            <input
              placeholder="Search project"
              v-model="videoSearchQuery"
              class="w-full border-0 search-bar"
            />
            <vs-icon
              icon-pack="feather"
              icon="icon-search"
              size="20px"
              class="absolute search-icon"
            />
          </div>
          <div class="ml-3">
            <vs-button
              class="bg-custom-purple text-base font-bold hidden lg:flex"
              type="filled"
              icon="add_circle"
              @click="$router.push('/studio')"
              >Create Videos</vs-button
            >
          </div>
        </div>
        <div class="vx-row justify-end w-1/3">
          <div class="mr-3">
            <vs-button
              class="bg-custom-purple text-base font-bold hidden lg:block"
              type="filled"
              >Connect Wallet</vs-button
            >
          </div>
          <div>
            <profile-drop-down v-if="accessToken" />
            <vs-button
              v-else
              class="bg-custom-purple"
              type="filled"
              style="font-weight: bold; font-size: 14px"
              @click="handleLogin"
              >Login</vs-button
            >
          </div>
        </div>
      </vs-navbar>
    </div>
  </div>
</template>

<script>
import ProfileDropDown from './components/ProfileDropDown.vue';
import { mapState } from 'vuex';

export default {
  name: 'the-navbar-horizontal',
  components: {
    ProfileDropDown,
  },
  data() {
    return {
      videoSearchQuery: '',
    };
  },
  computed: {
    ...mapState('auth', ['isUserLoggedIn', 'accessToken']),
  },
  methods: {
    handleLogin() {
      this.$router.push('/login');
    },
  },
};
</script>
<style lang="scss" scoped>
.custom-header {
  height: 100px;
  border-bottom: none !important;
  box-shadow: none !important;
  display: flex;
  /*justify-content: space-between!important;
  padding-left: 120px!important;
  padding-right: 15px!important;*/
}
.search-bar {
  height: 40px;
  padding: 1rem;
  border-radius: 10px;
}
.search-icon {
  right: 3%;
  top: 20%;
}
</style>
