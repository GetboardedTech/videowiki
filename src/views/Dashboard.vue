<!-- =========================================================================================
    File Name: Dashboard.vue
    Description: Knowledge Base Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="knowledge-base-page" class="container-fluid mx-auto">
    <!-- JUMBOTRON -->
    <div class="knowledge-base-jumbotron">
      <div class="knowledge-base-jumbotron-content lg:p-32 md:p-24 sm:p-16 p-8 rounded-lg mb-base">
        <h1 class="mb-1 text-white">Welcome To VideoWiki</h1>
        <p class="text-white">The Faster Way To Create Value Videos</p>
        <div class="vx-row">
          <div class="vx-col w-full md:w-2/3 sm:w-1/1 p-2">
            <vs-input
              icon-no-border
              placeholder="Search Topic or Keyword"
              v-model="knowledgeBaseSearchQuery"
              icon-pack="feather"
              icon="icon-search"
              size="large"
              class="w-full lg:w-2/3 md:w-1/1 sm:w-1/1"
            />
          </div>
          <div class="vx-col w-full md:w-1/3 sm:w-1/1 p-2">
            <vs-button size="large" :disabled="btndisable" @click="blockchain">Create A New Video</vs-button>
            <br /><br />
            <div v-if="!btndisable">
              <br><br><br>
            </div>
            <vue-loaders-ball-spin-fade-loader v-if="btndisable" color="blue" style="margin-left: 20%" scale="0.7" />
          </div>
        </div>
      </div>
    </div>

    <!-- KNOWLEDGE BASE CARDS  -->

    <div>
      <h1 class="m-4 sm:inline-flex">Your Videos</h1>
      <feather-icon
        icon="GridIcon"
        @click="currentItemView = 'item-grid-view'"
        class="p-2 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer float-right mx-4"
        :svgClasses="{
                    'text-primary stroke-current':
                      currentItemView == 'item-grid-view'
                  }"
      />
      <feather-icon
        icon="ListIcon"
        @click="currentItemView = 'item-list-view'"
        class="p-2 ml-4 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer hidden sm:inline-flex float-right"
        :svgClasses="{
                    'text-primary stroke-current':
                      currentItemView == 'item-list-view'
                  }"
      />
    </div>
    <template v-if="currentItemView == 'item-grid-view'">
      <div class="items-grid-view vx-row match-height">
        <div class="vx-col lg:w-1/3 sm:w-1/2 w-full" v-for="item in videos" :key="item.id">
          <item-grid-view :item="item">
            <!-- SLOT: ACTION BUTTONS -->
            <template slot="action-buttons">
              <div class="flex flex-wrap">
                <!-- PRIMARY BUTTON: ADD TO WISH LIST -->
                <div
                  class="item-view-primary-action-btn p-3 flex flex-grow items-center justify-center cursor-pointer"
                  @click="forkVideo(item)"
                >
                  <vs-icon icon="call_split"></vs-icon>

                  <span class="text-sm font-semibold ml-2">Fork</span>
                </div>

                <!-- SECONDARY BUTTON: ADD-TO/VIEW-IN CART -->
                <div
                  class="item-view-secondary-action-btn bg-primary p-3 flex flex-grow items-center justify-center text-white cursor-pointer"
                  @click="viewVideo(item)"
                >
                  <feather-icon icon="ShoppingBagIcon" svgClasses="h-4 w-4" />

                  <span class="text-sm font-semibold ml-2">VIEW</span>
                </div>
              </div>
            </template>
          </item-grid-view>
        </div>
      </div>
    </template>

    <!-- LIST VIEW -->
    <template v-else>
      <div class="items-list-view mb-base" v-for="item in videos" :key="item.objectID">
        <item-list-view :item="item">
          <!-- SLOT: ACTION BUTTONS -->
          <template slot="action-buttons">
            <div
              class="item-view-primary-action-btn p-3 rounded-lg flex flex-grow items-center justify-center cursor-pointer mb-3"
              @click="forkVideo(item)"
            >
              <vs-icon icon="call_split"></vs-icon>
              <span class="text-sm font-semibold ml-2">Fork</span>
            </div>
            <div
              class="item-view-secondary-action-btn bg-primary p-3 rounded-lg flex flex-grow items-center justify-center text-white cursor-pointer"
              @click="viewVideo(item)"
            >
              <feather-icon icon="ShoppingBagIcon" svgClasses="h-4 w-4" />

              <span class="text-sm font-semibold ml-2">VIEW</span>
            </div>
          </template>
        </item-list-view>
      </div>
    </template>
  </div>
</template>

<script>
import axios from '../axios';
import constants from '../../constant';

export default {
  data() {
    return {
      btndisable: false,
      constants,
      knowledgeBaseSearchQuery: '',
      videos: [],
      activeVideo: {
        title: '',
        url: '',
        description: '',
        script: '',
        image: ''
      },
      currentItemView: 'item-grid-view',
      popupActive: false
    };
  },
  computed: {
    filteredKB() {
      return this.kb.filter(
        item =>
          item.title
            .toLowerCase()
            .includes(this.knowledgeBaseSearchQuery.toLowerCase()) ||
          item.description
            .toLowerCase()
            .includes(this.knowledgeBaseSearchQuery.toLowerCase())
      );
    }
  },
  methods: {
    async blockchain(event) {
      try {
        this.btndisable = true;
        // event.preventDefault();
        // const accounts = await web3.eth.getAccounts();
        // await createVideo.methods.Create().send({from: accounts[0]});
        // const v = await createVideo.methods.getContract().call({from: accounts[0]});
        // // Node key is generated, signing the next transaction
        // const instance = new web3.eth.Contract(JSON.parse(Upload.interface), v);
        // await instance.methods.CreateNewMasterBranch().send({from: accounts[0]});
        // const ver = await instance.methods.getContract().call({from: accounts[0]});
        // console.log(ver);
        this.$router.push('/studio');
      }
      catch(err){
        console.log(err);
      }
      finally {
        this.btndisable = false;
      }
      },
    showPopup(item) {
      this.activeVideo = item;
      this.popupActive = true;
    },
    viewVideo(item) {
      this.$router.push({
        path: `/video/${item.slug}`
      });
    }
  },

components: {
    ItemGridView: () => import('./search/components/ItemGridView.vue'),
    ItemListView: () => import('./search/components/ItemListView.vue')
  },
  created() {
    axios
      .get(constants.apiUrl + '/api/user_videos')
      .then(response => {
        this.videos = response.data.data || response;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style lang="scss">
.knowledge-base-jumbotron-content {
  background-image: url('../assets/images/header banner.png');
  background-size: cover;
}
</style>
