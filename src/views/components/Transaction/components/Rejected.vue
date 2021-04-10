<template>
  <div>
    <div class="px-2">
      <h2 class="font-extrabold">Transaction Rejected</h2>
    </div>
    <vs-divider />
    <div class="flex justify-center items-center">
      <div class="text-center">
        <div class="mb-base">
          <vs-icon
            icon="cancel"
            size="80px"
            color="danger"
            rounded="true"
          ></vs-icon>
          <h4>
            {{ rejectMessage[currentTransactionStep - 1].title }}
          </h4>
        </div>
        <vs-button type="filled" @click="$emit('close')">Close</vs-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Rejected',
  props: ['txType'],
  data() {
    return {
      transactionRejectedMessage: {
        Publish: [
          {
            title: 'Aborting Data Token creation',
            description: ''
          },
          {
            title: 'Publishing rejected',
            description: ''
          },
          {
            title: 'Minting of tokens was rejected',
            description: ''
          },
          {
            title: 'Exchange was not approved',
            description: ''
          },
          {
            title: 'Exchange creation was rejected',
            description: ''
          }
        ],
        Buy: [
          {
            title: 'Permission Denied by the user',
            description: ''
          },
          {
            title: 'Swap rejected by the user',
            description: ''
          }
        ],
        Download: [
          {
            title: 'Transaction Rejected, aborting the service',
            description: ''
          },
          /* {
            title: 'Signature was not provided',
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
    rejectMessage() {
      return this.transactionRejectedMessage[this.txType];
    }
  }
};
</script>
