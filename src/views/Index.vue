<template>
  <div id="page-welcome">
    <IntroductionWelcome />
    <SearchIndex :show-search="false" />
  </div>
</template>

<script>
import IntroductionWelcome from './components/IntroductionWelcome';
import SearchIndex from './search/Index';

export default {
  name: 'Welcome',
  components: {
    IntroductionWelcome,
    SearchIndex
  }
};
</script>

<style lang="scss" scoped>
.info {
  width: 100%;
  background: rgb(115, 103, 240);
  background: linear-gradient(
    30deg,
    rgba(115, 103, 240, 1) 11%,
    rgba(234, 84, 85, 1) 100%
  );
}

.items-center {
  text-align: center;
  text-align: -moz-center;
  text-align: -webkit-center;
}

.items-left {
  text-align: left;
  text-align: -moz-left;
  text-align: -webkit-left;
}

.items-right {
  text-align: right;
  text-align: -moz-right;
  text-align: -webkit-right;
}
</style>
