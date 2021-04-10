<template>
  <div class="relative">
    <div class="vx-navbar-wrapper navbar-full p-0">
      <vs-navbar class="navbar-custom navbar-skelton custom-header responsive">
        <div class="flex justify-between lg:w-11/12 w-full">
          <router-link
            tag="div"
            to="/"
            class="vx-logo cursor-pointer md:flex items-center hidden"
          >
            <!--logo class="w-10 mr-4 fill-current text-primary" /-->
            <img
              src="@/assets/images/logo/logo.svg"
              class="mr-2 text-custom-purple h-16"
            />
            <span
              class="vx-logo-text text-dark hidden sm:block md:block lg:block"
              >VideoWiki</span
            >
          </router-link>
          <feather-icon
            class="sm:inline-flex lg:hidden md:hidden cursor-pointer p-2"
            icon="MenuIcon"
            @click.stop="showSidebar"
          />
          <div class="flex items-center -mx-3">
            <div
              class="lg:flex md:flex hidden items-center -mx-base px-3"
              id="navBar"
            >
              <div class="navItem px-base">
                <router-link
                  to="/"
                  class="text-dark text-2xl hover-link relative"
                  exact-active-class="link-active"
                  >Content
                  <vs-chip class="absolute create-chip">
                    <span class="text-primary font-bold">CREATE</span>
                  </vs-chip>
                </router-link>
              </div>
              <!--div class="navItem px-base">
                <router-link
                  to="/dashboard"
                  class="text-dark text-2xl hover-link relative"
                  exact-active-class="link-active"
                  >Course
                  <vs-chip class="absolute create-chip">
                    <span class="text-primary font-bold">CREATE</span>
                  </vs-chip></router-link
                >
              </div-->
              <div class="navItem px-base">
                <router-link
                  to="/classroom"
                  class="text-dark text-2xl hover-link relative"
                  exact-active-class="link-active"
                  >Class
                  <vs-chip class="absolute create-chip">
                    <span class="text-primary font-bold">CREATE</span>
                  </vs-chip></router-link
                >
              </div>
            </div>
            <div class="px-3">
              <profile-drop-down v-if="accessToken" />
              <vs-button
                v-else
                class="bg-custom-purple font-bold text-base lg:text-lg"
                type="filled"
                to="/login"
                >Login</vs-button
              >
            </div>
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
  computed: {
    ...mapState('auth', ['isUserLoggedIn', 'accessToken']),
    windowWidth() {
      return this.$store.state.windowWidth;
    },
  },
  methods: {
    showSidebar() {
      this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', true);
    },
  },
};
</script>
<style lang="scss" scoped>
.custom-header {
  height: 100px;
  background: white !important;
  border-bottom: none !important;
  box-shadow: none !important;
  display: flex;
  /*justify-content: space-between!important;
  padding-left: 120px!important;
  padding-right: 15px!important;*/
}
.create-chip {
  top: -13px;
  left: -45px;
  min-height: 16px !important;
  visibility: hidden;
}
.create-chip span {
  font-size: 8px;
}
#navBar {
  .link-active {
    font-weight: bold;
  }
  .link-active .create-chip {
    visibility: visible;
  }
}
.navItem a:hover {
  font-weight: bold;
}
.navItem a:hover .create-chip {
  visibility: visible;
}
</style>
