<!-- =========================================================================================
  File Name: TheNavbar.vue
  Description: Navbar component
  Component Name: TheNavbar
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div v-if="!insideIframe" class="relative">
    <div class="vx-navbar-wrapper" :class="classObj">
      <vs-navbar
        class="vx-navbar navbar-custom navbar-skelton"
        :color="navbarColorLocal"
        :class="textColor"
      >
        <!-- SM - OPEN SIDEBAR BUTTON -->
        <feather-icon
          class="sm:inline-flex xl:hidden cursor-pointer p-2"
          icon="MenuIcon"
          @click.stop="showSidebar"
        />

        <!--        <bookmarks :navbarColor="navbarColor" v-if="windowWidth >= 992" />-->

        <vs-spacer />

        <!--i18n class="mr-3" /-->

        <!--<search-bar />-->

        <!--        <notification-drop-down />-->
        <div class="flex mr-4 flex-wrap">
          <wallet />
        </div>
        <profile-drop-down v-if="accessToken" />
        <vs-button
          v-else
          class="bg-custom-purple font-bold"
          @click="$store.commit('TOGGLE_LOGIN_POPUP', true)"
          type="filled"
          >Login</vs-button
        >
      </vs-navbar>
    </div>
  </div>
</template>

<script>
import Bookmarks from './components/Bookmarks.vue';
import I18n from './components/I18n.vue';
import SearchBar from './components/SearchBar.vue';
import NotificationDropDown from './components/NotificationDropDown.vue';
import ProfileDropDown from './components/ProfileDropDown.vue';
import { mapState } from 'vuex';
import Wallet from './components/Wallet.vue';

export default {
  name: 'the-navbar-vertical',
  props: {
    navbarColor: {
      type: String,
      default: '#fff'
    }
  },
  components: {
    Bookmarks,
    I18n,
    SearchBar,
    NotificationDropDown,
    ProfileDropDown,
    Wallet
  },
  computed: {
    ...mapState('auth', ['isUserLoggedIn', 'accessToken']),
    navbarColorLocal() {
      return this.$store.state.theme === 'dark' && this.navbarColor === '#fff'
        ? '#10163a'
        : this.navbarColor;
    },
    textColor() {
      return {
        'text-white':
          (this.navbarColor != '#10163a' &&
            this.$store.state.theme === 'dark') ||
          (this.navbarColor != '#fff' && this.$store.state.theme !== 'dark')
      };
    },
    windowWidth() {
      return this.$store.state.windowWidth;
    },
    // NAVBAR STYLE
    classObj() {
      let classStr = '';
      if (this.$store.state.insideIframe) {
        classStr += 'reduced-width-iframe ';
      }
      if (this.$store.state.verticalNavMenuWidth === 'default')
        classStr += 'navbar-default ';
      else if (this.$store.state.verticalNavMenuWidth === 'reduced')
        classStr += 'navbar-reduced ';
      else classStr += 'navbar-full';
      return classStr;
    },
    insideIframe() {
      return this.$store.state.insideIframe;
    }
  },
  methods: {
    showSidebar() {
      this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE_STUDIO', true);
    }
  }
};
</script>
<style scoped>
.reduced-width-iframe {
  width: 72% !important;
}
</style>
