<template>
  <div>
    <TheHeader />
    <div
      class="vs-con-loading__container"
      id="div-with-loading"
      :class="{ 'h-72': isLoading }"
    ></div>
    <div v-if="!isLoading">
      <div class="vx-row p-8" v-if="reversedVideoList.length > 0">
        <VideoCard
          v-for="video in reversedVideoList"
          :key="video.id"
          :prop="video"
          :user="false"
          @click.native="detailView(video)"
        />
      </div>
      <div v-else class="flex h-72 justify-center items-center flex-wrap">
        <h4 class="text-danger">No videos published yet</h4>
      </div>
    </div>
    <vs-popup ref="custom_modal" :active.sync="showAssetModal">
      <div class="flex items-start -m-5">
        <div class="p-5">
          <img src="@/assets/images/pages/mp4.svg" />
        </div>
        <div class="p-5">
          <div class="mb-2">
            <h4>{{ selectedVideo.title }}</h4>
          </div>
          <div>
            <div class="text-2xl" v-if="!isWalletConnected">
              Connect Wallet !
            </div>
            <div v-else class="vs-con-loading__container" id="buy-download">
              <div v-if="!isDownloadable">
                <div class="mb-2">
                  <b>{{ oceanRequired }}</b> OCEAN
                </div>
                <vs-button
                  type="filled"
                  class="mb-2 font-semibold"
                  @click="buyContent"
                  >Buy</vs-button
                >
              </div>
              <vs-button
                v-else
                type="filled"
                class="font-semibold"
                @click="downloadAsset"
                >Download</vs-button
              >
            </div>
          </div>
        </div>
      </div>
      <!--vs-divider /-->
    </vs-popup>
    <Transaction
      :show="showTransactionModal"
      :transactionType="txType"
      :transactionPhase="currentTxPhase"
      @close="showTransactionModal = false"
      @retry="txType === 'Buy' ? buyContent() : downloadAsset()"
    />
  </div>
</template>
<script>
import TheHeader from '@/layouts/components/navbar/NavbarDashboard';
import Transaction from '@/views/components/Transaction/Transaction.vue';
import VideoCard from './components/VideoCard';
import { ajaxCallMixin } from '../../http/HttpCommon';
export default {
  name: 'Dashboard',
  mixins: [ajaxCallMixin],
  components: {
    TheHeader,
    VideoCard,
    Transaction
  },
  data() {
    return {
      videoList: [],
      isLoading: false,
      selectedVideo: {},
      oceanRequired: 0,
      showAssetModal: false,
      videoTxData: {},
      isDownloadable: false,
      showTransactionModal: false,
      txType: 'Buy',
      currentTxPhase: 'Processing'
    };
  },
  computed: {
    reversedVideoList() {
      return this.videoList.slice().reverse();
    },
    isWalletConnected() {
      return this.$store.state.isWalletConnected;
    },
    accountAddress() {
      return this.$store.state.accountAddress;
    }
  },
  mounted() {
    this.getVideoList();
    this.$refs.custom_modal.$el.childNodes[1].childNodes[0].style.display =
      'none';
    this.$refs.custom_modal.$el.childNodes[1].style.width = '400px';
  },
  methods: {
    getVideoList() {
      const url = '/videoapi/home_videos';
      this.$vs.loading({
        background: 'transparent',
        container: '#div-with-loading'
      });
      this.isLoading = true;
      this.getRequest(url, this.handleResponse);
    },
    handleResponse(apiResponse) {
      this.$vs.loading.close('#div-with-loading > .con-vs-loading');
      this.isLoading = false;
      this.videoList = apiResponse.data;
    },
    detailView(selectedVideo) {
      if (selectedVideo.paid) {
        this.showAssetModal = true;
        this.selectedVideo = selectedVideo;
        if (this.isWalletConnected) {
          this.getVideoTxData();
        }
      } else {
        const route = this.$router.resolve({
          name: 'Video View',
          params: { slug: selectedVideo.id },
          query: { url: selectedVideo.video }
        });
        window.open(route.href, '_blank');
      }
    },
    async buyContent() {
      this.showAssetModal = false;
      this.txType = 'Buy';
      this.$store.commit('SET_CURRENT_TRANSACTION_STEP', 1);
      this.showTransactionModal = true;
      this.currentTxPhase = 'Processing';
      try {
        await this.$store.dispatch(
          'initiateBuy',
          this.videoTxData.exchange_key
        );
        this.isDownloadable = await this.$store.dispatch('getDownloadStatus', {
          dataTokenAddress: this.videoTxData.dataToken,
          accountAddress: this.accountAddress
        });
        this.showTransactionModal = false;
        // this.detailView(this.selectedVideo);
      } catch (error) {
        if (error.code === 4001) this.currentTxPhase = 'Rejected';
        else this.currentTxPhase = 'Failed';
      }
    },
    async downloadAsset() {
      this.showAssetModal = false;
      this.txType = 'Download';
      this.$store.commit('SET_CURRENT_TRANSACTION_STEP', 1);
      this.showTransactionModal = true;
      this.currentTxPhase = 'Processing';
      try {
        await this.$store.dispatch('startDownload', {
          did: this.videoTxData.dod,
          dta: this.videoTxData.dataToken
        });
        setTimeout(() => (this.showTransactionModal = false), 2000);
      } catch (error) {
        if (error.code === 4001) this.currentTxPhase = 'Rejected';
        else this.currentTxPhase = 'Failed';
      }
    },
    getVideoTxData() {
      const url = `/transaction/oceanbuy?video_id=${this.selectedVideo.id}`;
      this.$vs.loading({
        container: `#buy-download`,
        background: '#fff',
        color: 'primary',
        scale: 0.8
      });
      // this.isLoading = true;
      this.getRequest(url, this.callBackVideoTxData);
    },
    async callBackVideoTxData(apiResponse) {
      // this.isLoading = false;
      this.videoTxData = apiResponse.data;
      const price = await this.$store.dispatch(
        'getAssetPrice',
        this.videoTxData.exchange_key
      );
      this.isDownloadable = await this.$store.dispatch('getDownloadStatus', {
        dataTokenAddress: this.videoTxData.dataToken,
        accountAddress: this.accountAddress
      });
      this.oceanRequired = price;
      this.$vs.loading.close(`#buy-download > .con-vs-loading`);
    }
  }
};
</script>
<style scoped>
/*.content {
  padding-top: 3rem;
  padding-left: 1.75rem;
  padding-right: 1.75rem;
  background: #e5e5e5;
}*/
</style>
