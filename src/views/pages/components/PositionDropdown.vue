<template>
  <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
    <span class="cursor-pointer flex items-center">
      <img :src="selectedPositionIcon" :alt="selectedPosition" />
      <!--span class="hidden sm:block ml-2">{{ currentPosiitonLabel }}</span-->
    </span>
    <vs-dropdown-menu class="w-48 i18n-dropdown vx-navbar-dropdown">
      <vs-dropdown-item @click="updatePosition(1)"
        ><img
          class="h-4 w-5 mr-1"
          src="@/assets/images/pages/top.svg"
          alt="top"
        />
        &nbsp;Top</vs-dropdown-item
      >
      <vs-dropdown-item @click="updatePosition(2)"
        ><img
          class="h-4 w-5 mr-1"
          src="@/assets/images/pages/center.svg"
          alt="center"
        />
        &nbsp;Center</vs-dropdown-item
      >
      <vs-dropdown-item @click="updatePosition(3)"
        ><img
          class="h-4 w-5 mr-1"
          src="@/assets/images/pages/bottom.svg"
          alt="bottom"
        />
        &nbsp;Bottom</vs-dropdown-item
      >
    </vs-dropdown-menu>
  </vs-dropdown>
</template>

<script>
export default {
  name: 'LanguageSelect',
  props: {
    value: Number
  },
  data() {
    return {
      selectedPosition: this.value,
      positions: {
        1: 'top',
        2: 'center',
        3: 'bottom'
      }
    };
  },
  computed: {
    selectedPositionIcon() {
      return require(`@/assets/images/pages/${this.currentPositionLabel}.svg`);
    },
    currentPositionLabel() {
      return this.positions[this.selectedPosition];
    }
  },
  methods: {
    updatePosition(id) {
      this.selectedPosition = id;
      this.$emit('input', id);
    }
  }
};
</script>
