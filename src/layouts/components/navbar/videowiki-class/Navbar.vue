<template>
  <div class="relative">
    <div class="vx-navbar-wrapper custom-header navbar-full p-0">
      <vs-navbar class="navbar-custom navbar-skelton custom-header responsive">
        <div class="flex justify-between lg:w-11/12 w-full items-center">
          <div class="vx-logo cursor-pointer flex items-center">
            <img
              src="@/assets/images/logo/logo.svg"
              class="px-1 svg-white h-16"
            />
            <span
              class="px-1 text-white text-3xl font-bold hidden lg:block md:block sm:block"
              >Videowiki</span
            >
          </div>
          <div>
            <profile-drop-down v-if="accessToken" :forClassroom="true" />
            <vs-button
              v-else
              class="bg-white text-custom-purple font-bold text-base lg:text-lg"
              type="filled"
              @click="checkLoginStatus"
              >Login</vs-button
            >
          </div>
        </div>
      </vs-navbar>
    </div>
  </div>
</template>

<script>
import ProfileDropDown from '../components/ProfileDropDown.vue';
import { mapState } from 'vuex';

export default {
  name: 'the-class-navbar',
  components: {
    ProfileDropDown
  },
  computed: {
    ...mapState('auth', ['isUserLoggedIn', 'accessToken']),
    windowWidth() {
      return this.$store.state.windowWidth;
    }
  },
  methods: {
    checkLoginStatus() {
      if (this.isUserLoggedIn()) this.startClassModal = true;
      else this.$store.commit('TOGGLE_LOGIN_POPUP', true);
    }
  }
};
</script>
<style lang="scss" scoped>
.custom-header {
  height: 100px;
  background: none !important;
  border-bottom: none !important;
  box-shadow: none !important;
  display: flex;
  /*justify-content: space-between!important;
  padding-left: 120px!important;
  padding-right: 15px!important;*/
}
.svg-white {
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(130deg)
    brightness(106%) contrast(103%);
}
</style>
