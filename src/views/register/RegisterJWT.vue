<template>
  <div class="clearfix">
    <!--vs-input
      v-validate="'required|alpha_dash|min:3'"
      data-vv-validate-on="blur"
      label-placeholder="First Name"
      name="firstName"
      placeholder="First Name"
      v-model="firstName"
      class="w-full"
    />
    <span class="text-danger text-sm">{{ errors.first('firstName') }}</span>

    <vs-input
      v-validate="'required|alpha_dash|min:3'"
      data-vv-validate-on="blur"
      label-placeholder="Last Name"
      name="lastName"
      placeholder="Last Name"
      v-model="lastName"
      class="w-full"
    />
    <span class="text-danger text-sm">{{ errors.first('lastName') }}</span>

    <vs-input
      v-validate="'required|email'"
      data-vv-validate-on="blur"
      name="email"
      type="email"
      label-placeholder="Email"
      placeholder="Email"
      v-model="email"
      class="w-full mt-6"
    />
    <span class="text-danger text-sm">{{ errors.first('email') }}</span>

    <vs-input
      ref="password"
      type="password"
      data-vv-validate-on="blur"
      v-validate="'required|min:6|max:10'"
      name="password"
      label-placeholder="Password"
      placeholder="Password"
      v-model="password"
      class="w-full mt-6"
    />
    <span class="text-danger text-sm">{{ errors.first('password') }}</span>

    <vs-input
      type="password"
      v-validate="'min:6|max:10|confirmed:password'"
      data-vv-validate-on="blur"
      data-vv-as="password"
      name="confirm_password"
      label-placeholder="Confirm Password"
      placeholder="Confirm Password"
      v-model="confirm_password"
      class="w-full mt-6"
    />
    <span class="text-danger text-sm">{{
      errors.first('confirm_password')
    }}</span-->
    <!--vs-divider> Or </vs-divider-->
    <form>
      <div class="vx-row mb-6">
        <div class="vx-col w-full">
          <!--vs-input
          class="w-full"
          type="email"
          label="Email Address"
          v-model="email"
        /-->
          <h6 class="mb-4">Email<span class="text-danger">*</span></h6>
          <input
            type="email"
            placeholder="Enter email address"
            class="modified-input"
            autocomplete="off"
            v-model="email"
          />
        </div>
      </div>
      <div class="vx-row mb-6">
        <div class="vx-col w-full">
          <!--vs-input
          class="w-full"
          icon-pack="feather"
          icon="icon icon-eye-off"
          icon-after
          type="password"
          label="Password"
          v-model="password"
        /-->
          <h6 class="mb-4">
            Create Password<span class="text-danger">*</span>
          </h6>
          <div class="flex relative">
            <input
              :type="create_showPassword ? 'text' : 'password'"
              placeholder="Enter password"
              class="modified-input"
              autocomplete="off"
              v-model="password"
            />
            <vs-icon
              :icon="create_showPassword ? 'visibility_off' : 'visibility'"
              class="input-icon"
              @click="create_showPassword = !create_showPassword"
              size="25px"
            />
          </div>
          <!--vx-input-group
          class="mb-base"
        >
          <vs-input
            class="w-full"
            type="password"
            label="Password"
            v-model="password"
          />
          <template slot="append">
            <div class="append-text btn-addon">
              <vs-button icon-pack="feather" icon="icon icon-eye-off"></vs-button>
            </div>
          </template>
        </vx-input-group-->
        </div>
      </div>
      <div class="vx-row mb-6">
        <div class="vx-col w-full">
          <!--vs-input
          class="w-full"
          icon-pack="feather"
          icon="icon icon-eye-off"
          icon-after
          type="Password"
          label="Repeat Password"
          v-model="confirm_password"
        /-->
          <h6 class="mb-4">
            Repeat Password<span class="text-danger">*</span>
          </h6>
          <div class="flex relative">
            <input
              :type="repeat_showPassword ? 'text' : 'password'"
              placeholder="Enter password"
              class="modified-input"
              autocomplete="off"
              v-model="confirm_password"
            />
            <vs-icon
              :icon="repeat_showPassword ? 'visibility_off' : 'visibility'"
              class="input-icon"
              @click="repeat_showPassword = !repeat_showPassword"
              size="25px"
            />
          </div>
          <!--vx-input-group
          class="mb-base"
        >
          <vs-input
            class="w-full"
            type="password"
            label="Password"
            v-model="password"
          />
          <template slot="append">
            <div class="append-text btn-addon">
              <vs-button icon-pack="feather" icon="icon icon-eye-off"></vs-button>
            </div>
          </template>
        </vx-input-group-->
        </div>
      </div>

      <vs-checkbox v-model="isTermsConditionAccepted" class="mt-6"
        >I accept the terms & conditions.</vs-checkbox
      >
      <div class="flex flex-wrap mb-3">
        <vs-button
          class="mt-6 flex-1 font-bold h-16"
          :disabled="!validateForm"
          @click.prevent="registerUserJWt"
        >
          Create Account</vs-button
        >
      </div>
    </form>
    <div class="flex flex-wrap mb-3 justify-center">
      <!--div class="flex-1"-->
      Do you already have an account?
      <span class="ml-1 text-primary cursor-pointer" @click="navigateToLogin"
        >Login</span
      >
      <!--/div-->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    popup: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirm_password: '',
      create_showPassword: false,
      repeat_showPassword: false,
      isTermsConditionAccepted: true,
    };
  },
  computed: {
    validateForm() {
      return (
        !this.errors.any() &&
        this.displayName !== '' &&
        this.email !== '' &&
        this.password !== '' &&
        this.confirm_password !== '' &&
        this.isTermsConditionAccepted === true
      );
    },
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
          color: 'warning',
        });

        return false;
      }
      return true;
    },
    registerUserJWt() {
      // If form is not validated or user is already login return
      if (!this.validateForm || !this.checkLogin()) return;

      this.$vs.loading();

      const payload = {
        userDetails: {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirm_password,
        },
        notify: this.$vs.notify,
      };
      this.$store
        .dispatch('auth/registerUser', payload)
        .then((response) => {
          const payload = {
            checkbox_remember_me: true,
            userDetails: {
              email: this.email,
              password: this.password,
            },
          };

          this.$store
            .dispatch('auth/login', payload)
            .then(() => {
              this.$vs.loading.close();
              // window.location.href = '/';
              this.$acl.change('user');
              if (this.popup) this.$emit('registered');
              else this.$router.push('/');
            })
            .catch((error) => {
              this.$vs.loading.close();
              this.$vs.notify({
                title: 'Login Error',
                text: error.message,
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'danger',
              });
            });
        })
        .catch((error) => {
          this.$vs.loading.close();
          this.$vs.notify({
            title: 'Register Error',
            text: error.message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger',
          });
        });
    },
    navigateToLogin() {
      if (this.popup) this.$emit('toLogin');
      else this.$router.push('/login');
    },
  },
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
<!-- =========================================================================================
File Name: RegisterJWT.vue
Description: Register Page for JWT
----------------------------------------------------------------------------------------
Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<!--template>
  <div class="clearfix">
    <vs-input
      v-validate="'required|alpha_dash|min:3'"
      data-vv-validate-on="blur"
      label-placeholder="First Name"
      name="firstName"
      placeholder="First Name"
      v-model="firstName"
      class="w-full"
    />
    <span class="text-danger text-sm">{{ errors.first('firstName') }}</span>

    <vs-input
      v-validate="'required|alpha_dash|min:3'"
      data-vv-validate-on="blur"
      label-placeholder="Last Name"
      name="lastName"
      placeholder="Last Name"
      v-model="lastName"
      class="w-full"
    />
    <span class="text-danger text-sm">{{ errors.first('lastName') }}</span>

    <vs-input
      v-validate="'required|email'"
      data-vv-validate-on="blur"
      name="email"
      type="email"
      label-placeholder="Email"
      placeholder="Email"
      v-model="email"
      class="w-full mt-6"
    />
    <span class="text-danger text-sm">{{ errors.first('email') }}</span>

    <vs-input
      ref="password"
      type="password"
      data-vv-validate-on="blur"
      v-validate="'required|min:6|max:10'"
      name="password"
      label-placeholder="Password"
      placeholder="Password"
      v-model="password"
      class="w-full mt-6"
    />
    <span class="text-danger text-sm">{{ errors.first('password') }}</span>

    <vs-input
      type="password"
      v-validate="'min:6|max:10|confirmed:password'"
      data-vv-validate-on="blur"
      data-vv-as="password"
      name="confirm_password"
      label-placeholder="Confirm Password"
      placeholder="Confirm Password"
      v-model="confirm_password"
      class="w-full mt-6"
    />
    <span class="text-danger text-sm">{{
      errors.first('confirm_password')
    }}</span>

    <vs-checkbox v-model="isTermsConditionAccepted" class="mt-6"
      >I accept the terms & conditions.</vs-checkbox
    >
    <vs-button class="mt-6" @click="registerUserJWt" :disabled="!validateForm"
      >Register</vs-button
    >
    <vs-button type="border" to="/login" class="float-right mt-6"
      >Login</vs-button
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirm_password: '',
      isTermsConditionAccepted: true
    };
  },
  computed: {
    validateForm() {
      return (
        !this.errors.any() &&
        this.displayName !== '' &&
        this.email !== '' &&
        this.password !== '' &&
        this.confirm_password !== '' &&
        this.isTermsConditionAccepted === true
      );
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
    registerUserJWt() {
      // If form is not validated or user is already login return
      if (!this.validateForm || !this.checkLogin()) return;

      this.$vs.loading();

      const payload = {
        userDetails: {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirm_password
        },
        notify: this.$vs.notify
      };
      this.$store
        .dispatch('auth/registerUser', payload)
        .then(response => {
          const payload = {
            checkbox_remember_me: true,
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
                title: 'Login Error',
                text: error.message,
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'danger'
              });
            });
        })
        .catch(error => {
          this.$vs.loading.close();
          this.$vs.notify({
            title: 'Register Error',
            text: error.message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          });
        });
    }
  }
};
</script-->
