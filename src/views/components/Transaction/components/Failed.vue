<template>
  <div>
    <div class="px-2">
      <h2 class="font-extrabold">Transaction Failed</h2>
    </div>
    <vs-divider />
    <div class="flex justify-center items-center">
      <div class="text-center">
        <div class="mb-base">
          <vs-icon
            icon="error"
            size="80px"
            color="danger"
            rounded="true"
          ></vs-icon>
          <h4>
            {{ failedMessage[currentTransactionStep - 1].title }}
          </h4>
        </div>
        <div class="flex items-center justify-center">
          <vs-button type="filled" @click="$emit('retry')" class="mr-4"
            >Retry</vs-button
          >
          <vs-button type="filled" @click="$emit('close')">Close</vs-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Failed',
  props: ['txType'],
  data() {
    return {
      transactionFailedMessage: {
        Publish: [
          {
            title: 'Failed to create data-token. Aborting creation',
            description: ''
          },
          {
            title: 'Publishing Failed.',
            description: ''
          },
          {
            title: 'No tokens will be minted',
            description: ''
          },
          {
            title: 'Exchange was not approved',
            description: ''
          },
          {
            title: 'Exchange failed to create',
            description: ''
          }
        ],
        Buy: [
          {
            title: 'Exchange failed',
            description: ''
          },
          {
            title: 'Swap failed',
            description: ''
          }
        ],
        Download: [
          {
            title: 'Starting the download service failed',
            description: ''
          }
          /* {
            title: '',
            description: ''
          } */
        ]
      }
    };
  },
  computed: {
    currentTransactionStep() {
      return this.$store.state.currentTransactionStep;
    },
    failedMessage() {
      return this.transactionFailedMessage[this.txType];
    }
  }
};
</script>
