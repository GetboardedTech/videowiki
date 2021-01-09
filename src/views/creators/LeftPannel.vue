<template>
  <div>
    <vx-card class="ml-4" v-show="!isLogin">
      <h1>Join Video Wiki</h1>
      <h4>(or sign in)</h4>
      <p class="my-4">
        to find videos, people, and topics catered to your interests.
      </p>
      <vs-button>Sign Up for FREE</vs-button>
      <img src="@/assets/images/pages/graphic-2.png" width="250px" />
    </vx-card>
    <vx-card class="ml-4 items-center text-center" v-show="isLogin">
      <vs-avatar
        size="70px"
        src="@/assets/images/portrait/small/avatar-s-1.jpg"
      />
      <h1 class="pt-4">User Name</h1>
      <hr />
      <h6 class="pt-4">3 Starred Repositries</h6>
      <h6 class="pt-4">10 Cloned Repositries</h6>
      <img src="@/assets/images/pages/graphic-2.png" width="250px" />
    </vx-card>
  </div>
</template>
<script>
export default {
  name: 'left-pannel',
  data() {
    return {
      isLogin: true
    };
  }
};
</script>
