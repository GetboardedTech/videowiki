<template>
  <div>
    <NavbarHorizontal
      navbarType="static"
      class="text-base"
      v-if="notInsideIframe"
    />
    <div class="bg-white">
      <img src="../assets/images/pages/map-bg.png" width="100%" />
      <div class="bg-white contact-us-section">
        <div class="vx-card w-4/5" style="height: 100%">
          <div class="vx-card__collapsible-content vs-con-loading__container">
            <div class="vx-card__body flex flex-wrap justify-between -m-3">
              <div class="w-full lg:w-1/2 p-3">
                <h3 class="mb-6 lg:text-left text-center">Write Us</h3>
                <div class="vx-row mb-6">
                  <div class="vx-col w-1/2">
                    <h6 class="mb-4">
                      Full Name<span class="text-danger">*</span>
                      <div class="h-2">
                        <span
                          class="text-danger text-sm"
                          v-show="errors.has('fullName')"
                          >{{ errors.first('fullName') }}</span
                        >
                      </div>
                    </h6>
                    <input
                      class="w-full base-input"
                      v-validate="'required|alpha_spaces'"
                      type="text"
                      name="fullName"
                      v-model="fullName"
                      placeholder="your name"
                    />
                  </div>
                  <div class="vx-col w-1/2">
                    <h6 class="mb-4">
                      Email<span class="text-danger">*</span>
                      <div class="h-2">
                        <span
                          class="text-danger text-sm"
                          v-show="errors.has('email')"
                          >{{ errors.first('email') }}</span
                        >
                      </div>
                    </h6>
                    <input
                      class="w-full base-input"
                      v-validate="'required|email'"
                      type="Email"
                      name="email"
                      v-model="email"
                      placeholder="your email"
                    />
                  </div>
                </div>
                <div class="vx-row mb-6">
                  <div class="vx-col w-full">
                    <h6 class="mb-4">Message</h6>
                    <textarea
                      class="message-box"
                      placeholder="your message"
                      v-model="message"
                    />
                  </div>
                </div>
                <div class="lg:text-left text-center">
                  <vs-button
                    type="filled"
                    class="font-bold text-base bg-custom-purple"
                    @click.prevent="handleSendMessage"
                    :disabled="submitInProgress"
                    >Send Message</vs-button
                  >
                </div>
              </div>
              <div class="lg:w-1/2 w-full mx-auto p-3">
                <vx-card no-shadow class="address-box pl-8 h-full">
                  <h3 class="mb-12">Find us</h3>
                  <div class="mb-8">
                    <h5 class="mb-8">Portugal</h5>
                    <p class="mb-4">
                      Technologies PCI - Creative Science Park, 3830-352 Ílhavo,
                      Portugal
                    </p>
                    <p class="mb-4">
                      <span class="address-label">Phone</span>: +011-667-4647
                    </p>
                    <p class="mb-4">
                      <span class="address-label">Email</span>:
                      support@videowiki.pt
                    </p>
                  </div>
                  <div>
                    <h5 class="mb-8">India</h5>
                    <p class="mb-4">
                      SG alpha tower, Tower 2, 302, Vasundhara, Sector 9,
                      Ghaziabad
                    </p>
                    <p class="mb-4">
                      <span class="address-label">Phone</span>: +011-667-4647
                    </p>
                    <p class="mb-4">
                      <span class="address-label">Email</span>:
                      support@videowiki.pt
                    </p>
                  </div>
                </vx-card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section v-if="notInsideIframe">
      <NewsLetter />
    </section>
    <TheFooter v-if="notInsideIframe" />
  </div>
</template>
<script>
import NavbarHorizontal from '@/layouts/components/navbar/NavbarHorizontal2.vue';
import NewsLetter from '@/views/components/NewsLetter';
import TheFooter from '@/layouts/components/footer/TheFooter';
export default {
  components: {
    NavbarHorizontal,
    NewsLetter,
    TheFooter
  },
  data() {
    return {
      fullName: '',
      email: '',
      message: '',
      submitInProgress: false
    };
  },
  computed: {
    notInsideIframe() {
      return !this.$store.state.insideIframe;
    }
  },
  created() {
    if (window.location !== window.parent.location) {
      document.body.style.zoom = '0.8';
    }
  },
  methods: {
    handleSendMessage() {
      this.$validator.validateAll().then(result => {
        if (result) {
          const data = {};
          data.name = this.fullName;
          data.email = this.email;
          data.message = this.message;
          // const url = '/community/volunteer/';
          this.submitInProgress = true;
          this.callBackSendMessage();
          // this.ajaxCall(url, data, this.callbackSubmit);
        } else {
          this.$vs.notify({
            title: 'Invalid Input',
            text: 'Please fill all the required fields correctly',
            color: 'danger'
          });
        }
      });
    },
    callBackSendMessage() {
      setTimeout(() => {
        this.fullName = '';
        this.email = '';
        this.message = '';
        this.$validator.reset();
        this.submitInProgress = false;
        this.$vs.notify({
          title: 'Success',
          text: 'Your response has been recorded',
          color: 'success'
        });
      }, 2000);
    }
  }
};
</script>
<style scoped>
.map-section {
  /* background: url('../assets/images/pages/map-bg.png'); */
  background-repeat: no-repeat;
  background-size: cover;
}
section {
  padding: 3rem 0;
}

.message-box {
  height: 250px !important;
  border: none;
  background: #f3f4f6;
  font-size: 12px;
  overflow-y: auto;
  border-radius: 12px;
  color: #626262;
  width: 100%;
  opacity: 1;
  text-indent: 0.01%;
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-style: normal;
  font-variant: normal;
  text-decoration: none solid rgb(98, 98, 98);
  text-align: start;
  line-height: 22.4px;
  vertical-align: baseline;
  padding: 9px;
}
.base-input {
  height: 45px;
  background: #f3f4f6;
  border-radius: 12px;
  color: #626262;
  border: none;
  padding: 1rem;
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  font-weight: normal;
  font-size: 12px;
}
.address-box {
  background: #f4f5f7;
  border-radius: 8px;
}
.address-label {
  font-weight: 600;
}
.contact-us-section {
  display: flex;
  justify-content: center;
  margin-top: -20%;
  padding-bottom: 15%;
}
</style>
