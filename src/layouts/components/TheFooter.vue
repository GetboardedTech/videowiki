<!-- =========================================================================================
    File Name: TheFooter.vue
    Description: Footer component
    Component Name: TheFooter
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template functional>
  <footer class="the-footer flex-wrap justify-between" :class="classes">
    <span class="md:flex hidden items-center">
      <span>Created as a #EUvsVirus response to COVID19</span>
      <!--<feather-icon icon="HeartIcon" svgClasses="stroke-current text-danger w-6 h-6" class="ml-2" />-->
    </span>
    <p>
      <span>COPYRIGHT &copy;</span>
      <span>{{ new Date().getFullYear() }} </span>
      <a href="https://getboarded.com" target="_blank" rel="nofollow"
        >GetBoarded</a
      >
      <span class="hidden sm:inline-block">, All rights Reserved</span>
    </p>
  </footer>
</template>

<script>
export default {
  name: 'the-footer',
  props: {
    classes: {
      type: String
    }
  }
};
</script>
