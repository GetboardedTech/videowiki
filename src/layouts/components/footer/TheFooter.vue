<template>
  <div class="footer-stciky">
    <footer class="footer bg-white">
      <vs-row class="section flex flex-wrap">
        <vs-col class="company-info lg:w-1/3 mb-4 mx-auto">
          <router-link
            tag="div"
            to="/"
            class="vx-logo cursor-pointer flex items-center mb-6"
          >
            <img
              src="@/assets/images/logo/logo.svg"
              class="mr-2 lg:h-16 h-12"
            />
            <span class="vx-logo-text text-prp">VideoWiki</span>
          </router-link>
          <div class="text-base flex lg:w-2/3 vs-justify-center">
            <p class="lg:w-full">
              VideoWiki is an open Collaboratory content editing platform that
              enables rapid creation, modification, protection and monetization
              of immersive content.
            </p>
          </div>
          <!--div class="social-tags">
            <div class="social-tag-item">Follow us:</div>
            <vs-row vs-type="flex" vs-align="center" vs-justify="flex-start" class="mt-5">
              <vs-icon
                icon-pack="feather"
                icon="icon-linkedin"
                rounded="true"
                size="20px"
                class="mr-5"
              ></vs-icon>
              <vs-icon
                icon-pack="feather"
                icon="icon-facebook"
                rounded="true"
                size="20px"
                class="mr-5"
              ></vs-icon>
              <vs-icon
                icon-pack="feather"
                icon="icon-instagram"
                rounded="true"
                size="20px"
                class="mr-5"
              ></vs-icon>
              <vs-icon
                icon-pack="feather"
                icon="icon-twitter"
                rounded="true"
                size="20px"
              ></vs-icon>
            </vs-row>
          </div-->
        </vs-col>
        <vs-col class="lg:w-3/5">
          <vs-row>
            <vs-col class="w-1/2 lg:w-1/3 md:w-1/3 sm:w-1/3">
              <FooterLinks sectionName="Product" class="footer-links" />
            </vs-col>
            <vs-col class="w-1/2 lg:w-1/3 md:w-1/3 sm:w-1/3">
              <FooterLinks sectionName="Company" class="footer-links" />
            </vs-col>
            <!--vs-col vs-w="3">
              <FooterLinks sectionName="Resources" class="footer-links" />
            </vs-col>
            <vs-col vs-w="3.5">
              <FooterLinks
                sectionName="Terms and Conditions"
                class="footer-links"
              />
            </vs-col-->
          </vs-row>
        </vs-col>
      </vs-row>
      <vs-divider class="m-0" />
      <div
        class="flex justify-between lg:w-10/12 md:w-2/3 w-full mt-2 mx-auto p-2"
      >
        <div class="flex">
          <router-link class="text-black mr-5" to="/terms-of-use"
            >Terms</router-link
          >
          <router-link class="text-black mr-5" to="/privacy-policy"
            >Privacy</router-link
          >
          <a class="text-black">License</a>
        </div>
        <div>
          <vs-icon
            icon-pack="feather"
            icon="icon-linkedin"
            rounded="true"
            size="20px"
            class="mr-5 cursor-pointer"
            @click="openUrl('https://www.linkedin.com/company/videowiki.pt/')"
          ></vs-icon>
          <vs-icon
            icon-pack="feather"
            icon="icon-file-text"
            rounded="true"
            size="20px"
            class="mr-5 cursor-pointer"
            @click="openUrl('https://medium.com/videowiki-pt')"
          ></vs-icon>
          <vs-icon
            icon-pack="feather"
            icon="icon-twitter"
            rounded="true"
            size="20px"
            class="cursor-pointer"
            @click="openUrl('https://twitter.com/VideoWiki_PT')"
          ></vs-icon>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import FooterLinks from './components/FooterLinks';
export default {
  name: 'the-footer',
  components: {
    FooterLinks
  },
  props: {
    classes: {
      type: String
    }
  },
  methods: {
    openUrl(url) {
      window.open(url, '_blank');
    }
  }
};
</script>
<style scoped>
.section {
  padding: 3%;
}
</style>
