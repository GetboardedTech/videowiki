<template>
  <div class="layout--full-page">
    <!--the-header navbarType="static" class="text-base" /-->
    <router-view></router-view>
    <the-footer />
  </div>
</template>
<script>
// import TheHeader from '@/layouts/components/navbar/videowiki-class/Navbar.vue';
import TheFooter from '@/layouts/components/footer/TheFooter';

export default {
  components: {
    // TheHeader,
    TheFooter
  }
};
</script>
