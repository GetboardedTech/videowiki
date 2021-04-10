<template>
  <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
    <span class="cursor-pointer flex items-center">
      <img :src="selectedAlignmentIcon" :alt="selectedAlignment" />
      <!--span class="hidden sm:block ml-2">{{ currentPosiitonLabel }}</span-->
    </span>
    <vs-dropdown-menu class="w-48 i18n-dropdown vx-navbar-dropdown">
      <vs-dropdown-item @click="updateAlignment('left')"
        ><img
          class="h-4 w-5 mr-1"
          src="@/assets/images/pages/align-left.svg"
          alt="top"
        />
        &nbsp;Left</vs-dropdown-item
      >
      <vs-dropdown-item @click="updateAlignment('right')"
        ><img
          class="h-4 w-5 mr-1"
          src="@/assets/images/pages/align-right.svg"
          alt="center"
        />
        &nbsp;Right</vs-dropdown-item
      >
      <vs-dropdown-item @click="updateAlignment('center')"
        ><img
          class="h-4 w-5 mr-1"
          src="@/assets/images/pages/align-center.svg"
          alt="bottom"
        />
        &nbsp;Center</vs-dropdown-item
      >
    </vs-dropdown-menu>
  </vs-dropdown>
</template>

<script>
export default {
  name: 'AlignmentDropdown',
  props: {
    value: String
  },
  data() {
    return {
      selectedAlignment: this.value,
      alignments: {
        left: 'align-left',
        right: 'align-right',
        center: 'align-center'
      }
    };
  },
  computed: {
    selectedAlignmentIcon() {
      return require(`@/assets/images/pages/${this.currentAlignmentLabel}.svg`);
    },
    currentAlignmentLabel() {
      return this.alignments[this.selectedAlignment];
    }
  },
  methods: {
    updateAlignment(align) {
      this.selectedAlignment = align;
      this.$emit('input', align);
    }
  }
};
</script>
