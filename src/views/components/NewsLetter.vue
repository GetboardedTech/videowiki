<template>
  <div>
    <div class="text-center mb-20">
      <h1 class="font-extrabold text-4xl mb-4">Subscribe to our newsletter</h1>
      <p class="font-medium">
        Subscribe to our newsletter and stay up to date about the VideoWiki!
      </p>
    </div>
    <div class="flex lg:w-2/4 justify-center">
      <vx-input-group class="mb-base relative">
        <vs-input
          icon-pack="feather"
          icon="icon-mail"
          :size="$store.state.windowWidth < 500 ? 'default' : 'large'"
          v-validate="'required|email'"
          placeholder="Email Address"
          name="email"
          v-model="userEmail"
          icon-no-border
        />
        <!--span
          class="text-danger absolute text-sm"
          style="top:-20px"
          v-show="errors.has('email')"
          >{{ errors.first('email') }}</span
        -->

        <template slot="append">
          <div class="append-text btn-addon">
            <vs-button
              class="bg-custom-purple"
              :size="$store.state.windowWidth < 500 ? 'default' : 'large'"
              @click="startSubscription"
              :disabled="subscribeInProgress"
              >Subscribe</vs-button
            >
          </div>
        </template>
      </vx-input-group>
    </div>
  </div>
</template>
<script>
import { ajaxCallMixin } from '@/http/HttpCommon';
export default {
  name: 'NewsLetter',
  mixins: [ajaxCallMixin],
  data() {
    return {
      userEmail: '',
      subscribeInProgress: false
    };
  },
  methods: {
    startSubscription() {
      this.$validator.validateAll().then(result => {
        if (result) {
          const url = '/community/subscribe/';
          const data = {};
          data.email = this.userEmail;
          this.subscribeInProgress = true;
          this.ajaxCall(url, data, this.callBackSubscribe);
        } else {
          this.$vs.notify({
            title: 'Invalid Input',
            text: 'Please provide a valid Mail Id',
            color: 'danger'
          });
        }
      });
    },
    callBackSubscribe(apiResponse) {
      if (apiResponse.status === 409) {
        this.$vs.notify({
          title: 'Alert',
          text: 'You have already Subscribed with this Mail Id',
          color: 'warning'
        });
      } else if (apiResponse.status === 200) {
        this.$vs.notify({
          title: 'Success',
          text: 'Subscribed',
          color: 'success'
        });
        this.userEmail = '';
        this.$validator.reset();
      }
      this.subscribeInProgress = false;
    }
  }
};
</script>
