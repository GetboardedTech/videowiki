<template>
  <div>
    <form>
      <div class="vx-row mb-6">
        <div class="vx-col w-full">
          <div class="mb-4">
            <h6>Email<span class="text-danger">*</span></h6>
            <div class="h-2">
              <span class="text-danger text-sm" v-show="errors.has('email')">{{
                errors.first('email')
              }}</span>
            </div>
          </div>
          <input
            v-validate="'required|email'"
            type="email"
            name="email"
            placeholder="Enter email address"
            class="modified-input"
            autocomplete="off"
            v-model="email"
          />
        </div>
      </div>
      <div class="vx-row mb-6">
        <div class="vx-col w-full">
          <h6 class="mb-4">Password<span class="text-danger">*</span></h6>
          <div class="flex relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              data-vv-validate-on="blur"
              v-validate="'required'"
              name="password"
              placeholder="Enter password"
              class="modified-input"
              autocomplete="off"
              v-model="password"
            />
            <vs-icon
              :icon="showPassword ? 'visibility_off' : 'visibility'"
              class="input-icon"
              @click="showPassword = !showPassword"
              size="25px"
            />
          </div>
        </div>
      </div>

      <div class="flex flex-wrap justify-between my-5" v-if="!popup">
        <vs-checkbox v-model="checkbox_remember_me" class="mb-3"
          >Remember Me</vs-checkbox
        >
        <router-link to="/pages/forgot-password">Forgot Password?</router-link>
      </div>
      <div class="flex flex-wrap mb-3">
        <vs-button
          :disabled="!validateForm"
          @click.prevent="loginJWT"
          class="flex-1 font-bold h-16"
          >Login</vs-button
        >
        <!--vs-button type="border" @click="registerUser">Register</vs-button-->
      </div>
    </form>
    <div class="flex flex-wrap mb-3 justify-center">
      You don't have an account ?
      <span class="ml-1 text-primary cursor-pointer" @click="navigateToRegister"
        >Create Account</span
      >
      <!--vs-button type="border" @click="registerUser">Create Account</vs-button-->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    popup: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data() {
    return {
      email: '',
      password: '',
      checkbox_remember_me: false,
      showPassword: false
    };
  },
  computed: {
    validateForm() {
      return !this.errors.any() && this.email !== '' && this.password !== '';
    }
  },
  methods: {
    checkLogin() {
      // If user is already logged in notify
      if (this.$store.state.auth.isUserLoggedIn()) {
        // Close animation if passed as payload
        // this.$vs.loading.close()

        this.$vs.notify({
          title: 'Login Attempt',
          text: 'You are already logged in!',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning'
        });

        return false;
      }
      return true;
    },
    loginJWT() {
      if (!this.checkLogin()) return;

      // Loading
      this.$vs.loading();

      const payload = {
        checkbox_remember_me: this.checkbox_remember_me,
        userDetails: {
          email: this.email,
          password: this.password
        }
      };

      this.$store
        .dispatch('auth/login', payload)
        .then(() => {
          this.$vs.loading.close();
          // window.location.href = '/';
          this.$acl.change('user');
          if (this.popup) this.$emit('loggedIn');
          else this.$router.push('/');
        })
        .catch(error => {
          this.$vs.loading.close();
          this.$vs.notify({
            title: 'Error',
            text: error.message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          });
        });
    },
    registerUser() {
      if (!this.checkLogin()) return;
      this.$router.push('/register').catch(() => {});
    },
    navigateToRegister() {
      if (this.popup) this.$emit('toRegister');
      else this.$router.push('/register');
    }
  }
};
</script>
<style scoped>
.modified-input {
  height: 60px;
  border: none;
  /* border-radius: 16px; */
  background: #f3f3f3;
  font-family: Montserrat;
  border-radius: 4px;
  padding: 2rem;
  width: 100%;
}
.input-icon {
  position: absolute;
  right: 5%;
  bottom: 30%;
  cursor: pointer;
}
</style>
<!--template>
  <div>
    <vs-input
      v-validate="'required|email|min:3'"
      data-vv-validate-on="blur"
      name="email"
      icon-no-border
      icon="icon icon-user"
      icon-pack="feather"
      label-placeholder="Email"
      v-model="email"
      class="w-full"
    />
    <span class="text-danger text-sm">{{ errors.first('email') }}</span>

    <vs-input
      data-vv-validate-on="blur"
      v-validate="'required|min:6|max:10'"
      type="password"
      name="password"
      icon-no-border
      icon="icon icon-lock"
      icon-pack="feather"
      label-placeholder="Password"
      v-model="password"
      class="w-full mt-6"
    />
    <span class="text-danger text-sm">{{ errors.first('password') }}</span>

    <div class="flex flex-wrap justify-between my-5">
      <vs-checkbox v-model="checkbox_remember_me" class="mb-3"
        >Remember Me</vs-checkbox
      >
      <router-link to="/pages/forgot-password">Forgot Password?</router-link>
    </div>
    <div class="flex flex-wrap justify-between mb-3">
      <vs-button :disabled="!validateForm" @click="loginJWT">Login</vs-button>
      <vs-button type="border" @click="registerUser">Register</vs-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      checkbox_remember_me: false
    };
  },
  computed: {
    validateForm() {
      return !this.errors.any() && this.email !== '' && this.password !== '';
    }
  },
  methods: {
    checkLogin() {
      // If user is already logged in notify
      if (this.$store.state.auth.isUserLoggedIn()) {
        // Close animation if passed as payload
        // this.$vs.loading.close()

        this.$vs.notify({
          title: 'Login Attempt',
          text: 'You are already logged in!',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning'
        });

        return false;
      }
      return true;
    },
    loginJWT() {
      if (!this.checkLogin()) return;

      // Loading
      this.$vs.loading();

      const payload = {
        checkbox_remember_me: this.checkbox_remember_me,
        userDetails: {
          email: this.email,
          password: this.password
        }
      };

      this.$store
        .dispatch('auth/login', payload)
        .then(() => {
          this.$vs.loading.close();
          window.location.href = '/dashboard';
        })
        .catch(error => {
          this.$vs.loading.close();
          this.$vs.notify({
            title: 'Error',
            text: error.message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          });
        });
    },
    registerUser() {
      if (!this.checkLogin()) return;
      this.$router.push('/register').catch(() => {});
    }
  }
};
</script-->
