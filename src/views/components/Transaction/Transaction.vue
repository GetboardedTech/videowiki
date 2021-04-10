<template>
  <vs-popup ref="custom_tx_modal" :active="show">
    <component
      v-if="show"
      :is="currentTransactionPhase"
      :txType="transactionType"
      v-on="$listeners"
    ></component>
  </vs-popup>
</template>
<script>
import TransactionProcessing from './components/Processing';
import TransactionFailed from './components/Failed';
import TransactionRejected from './components/Rejected';
export default {
  name: 'Transaction',
  props: {
    show: {
      type: Boolean,
      default: false,
      required: true
    },
    transactionType: {
      type: String
    },
    transactionPhase: {
      type: String,
      default: 'Processing'
    }
  },
  components: {
    TransactionProcessing,
    TransactionFailed,
    TransactionRejected
  },
  computed: {
    currentTransactionPhase() {
      return 'Transaction' + this.transactionPhase;
    }
  },
  mounted() {
    this.$refs.custom_tx_modal.$el.childNodes[1].childNodes[0].style.display =
      'none';
  }
};
</script>
