<template>
  <div class="flex" id="page-login">
    <div class="hidden lg:flex md:flex relative h-screen">
      <img
        src="@/assets/images/pages/loginbg.png"
        alt="login"
        class="w-11/12"
      />
      <router-link
        tag="div"
        to="/"
        class="cursor-pointer flex -mx-1 items-center absolute company-logo"
      >
        <img
          src="@/assets/images/logo/logo.svg"
          class="px-1 svg-white h-12"
        /><span class="px-1 text-white text-3xl font-bold">Videowiki</span>
      </router-link>
    </div>

    <div class="sm:w-full md:w-1/2 lg:w-1/2 flex justify-center">
      <div class="px-8 login-tabs-container lg:w-2/3">
        <div class="vx-card__title mb-4">
          <h1 class="mb-base text-center"><b>Login VideoWiki</b></h1>
          <!--p style="color:#8692A6;" class="text-xl">Login with your social media accounts</p-->
        </div>
        <!--vs-divider class="text-xs mb-base">Or</vs-divider-->
        <login-jwt></login-jwt>
      </div>
    </div>
  </div>
</template>

<script>
import LoginJwt from './LoginJWT.vue';

export default {
  components: {
    LoginJwt
  }
};
</script>

<style lang="scss">
.login-tabs-container {
  min-height: 505px;
  padding-top: 6rem;

  .con-tab {
    padding-bottom: 14px;
  }

  .con-slot-tabs {
    margin-top: 1rem;
  }
}
.svg-white {
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(130deg)
    brightness(106%) contrast(103%);
}
.company-logo {
  top: 5%;
  left: 10%;
}
/*div.login-background img {
  position: absolute;
  top: 0;
  left: 0;
  width: 47%;
  height: 100%;
  overflow: hidden;
}*/
</style>

<!-- =========================================================================================
    File Name: Login.vue
    Description: Login Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<!--template>
  <div
    class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center"
    id="page-login"
  >
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row no-gutter justify-center items-center">
            <div class="vx-col hidden lg:block lg:w-1/2 login-background">
              <img src="@/assets/images/pages/login.png" alt="login" />
            </div>

            <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
              <div class="px-8 pt-8 login-tabs-container">
                <div class="vx-card__title mb-4">
                  <h4 class="mb-4">Login</h4>
                  <p>Welcome back, please login to your account.</p>
                </div>

                <login-jwt></login-jwt>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import LoginJwt from './LoginJWT.vue';

export default {
  components: {
    LoginJwt
  }
};
</script>

<style lang="scss">
.login-tabs-container {
  min-height: 505px;

  .con-tab {
    padding-bottom: 14px;
  }

  .con-slot-tabs {
    margin-top: 1rem;
  }
}

div.login-background {
}
div.login-background img {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  overflow: hidden;
}
</style-->
