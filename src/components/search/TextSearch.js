export default {
  props: {
    attribute: {
      type: String,
      required: true
    }
  },
  computed: {
    currentRefinement() {
      return this.$store.state.search.filters.text;
    }
  },
  methods: {
    refine(value) {
      return this.$store.commit('search/SET_FILTERS_ATTR', {
        key: 'text',
        value
      });
    }
  },
  render() {
    return this.$scopedSlots.default({
      currentRefinement: this.currentRefinement,
      refine: this.refine
    });
  }
};
