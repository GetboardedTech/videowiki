export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    attribute: {
      type: String,
      required: true
    }
  },
  computed: {
    currentRefinement() {
      return this.$store.state.search.filters.topics;
    }
  },
  methods: {
    refine(value) {
      return this.$store.commit('search/SET_FILTERS_ATTR', {
        key: 'topics',
        value
      });
    }
  },
  render() {
    return this.$scopedSlots.default({
      items: this.items,
      currentRefinement: this.currentRefinement,
      refine: this.refine
    });
  }
};
