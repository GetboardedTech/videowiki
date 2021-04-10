<template>
  <div>
    <vs-button
      v-if="!this.$store.state.isWalletConnected"
      class="bg-custom-purple text-base font-bold"
      type="filled"
      @click="connect"
      >Connect Wallet</vs-button
    >

    <div v-else>
      <vs-dropdown vs-custom-content class="cursor-pointer">
        <div class="flex items-center relative">
          <vs-button
            type="filled"
            class="text-base font-bold pr-4"
            text-color="#544837"
            color="#f1f1f1"
          >
            {{ truncate(accountAddress) }}
          </vs-button>
          <vs-icon
            icon="radio_button_checked"
            color="success"
            size="18px"
            class="absolute"
            style="left: 3%;"
          />
        </div>
        <vs-dropdown-menu class="vx-navbar-dropdown">
          <ul style="min-width: 9rem">
            <li class="flex py-2 px-4 font-bold">
              <!--feather-icon icon="UserIcon" svgClasses="w-4 h-4" /-->
              <span class="ml-2">{{ accountAddress }}</span>
            </li>

            <vs-divider class="m-1" />

            <li
              class="flex py-2 px-4 cursor-pointer hover:bg-danger hover:text-white"
              @click="disconnect"
            >
              <!--feather-icon icon="HomeIcon" svgClasses="w-4 h-4" /-->
              <span class="ml-2">Disconnect</span>
            </li>
          </ul>
        </vs-dropdown-menu>
      </vs-dropdown>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Wallet',
  computed: {
    accountAddress() {
      return this.$store.state.accountAddress;
    },
  },
  methods: {
    connect() {
      this.$store.dispatch('connectWallet');
    },
    disconnect() {
      this.$store.dispatch('disconnectWallet');
    },
    truncate(addressString) {
      return addressString.slice(0, 6) + '...' + addressString.slice(38);
    },
  },
};
</script>
<style scoped>
.wallet-btn {
  background: rgba(84, 72, 55, 0.1);
}
</style>
