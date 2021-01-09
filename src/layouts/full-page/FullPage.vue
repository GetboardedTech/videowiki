<!-- =========================================================================================
  File Name: FullPage.vue
  Description: Full page layout
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div class="layout--full-page">
    <v-nav-menu
      title="VideoWiki"
      :navMenuItems="navMenuItems"
      parent=".layout--full-page"
    />
    <navbar-horizontal navbarType="static" class="text-base" />
    <router-view></router-view>
    <the-footer />
  </div>
</template>

<script>
import NavbarHorizontal from '@/layouts/components/navbar/NavbarHorizontal2.vue';
import navMenuItems from '@/layouts/components/vertical-nav-menu/navMenuItems.js';
import VNavMenu from '@/layouts/components/vertical-nav-menu/VerticalNavMenu.vue';
import TheFooter from '@/layouts/components/footer/TheFooter';

export default {
  components: {
    NavbarHorizontal,
    VNavMenu,
    TheFooter,
  },
  computed: {
    navMenuItems() {
      return navMenuItems;
    }
  }
};
</script>
