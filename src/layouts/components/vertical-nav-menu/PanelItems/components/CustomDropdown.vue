<template>
  <vs-dropdown
    vs-custom-content
    @click="showDropdownMenu"
    class="cursor-pointer"
  >
    <span>
      <a href.prevent>
        <vs-icon icon="shuffle" size="20px" />
      </a>
    </span>
    <vs-dropdown-menu style="z-index: 300000" ref="dropdownMenu">
      <vs-dropdown-item disabled>
        <span class="text-dark font-semibold">Select Transition</span>
      </vs-dropdown-item>
      <template v-for="(option, idx) in options">
        <vs-dropdown-item
          :key="idx"
          @click="$emit('input', option.value)"
          :class="option.value === value ? 'bg-primary text-white' : ''"
          class="hover:bg-primary hover:text-white"
        >
          &nbsp;{{ option.label }}
        </vs-dropdown-item>
      </template>
    </vs-dropdown-menu>
  </vs-dropdown>
</template>

<script>
export default {
  name: 'CustomDropdown',
  props: {
    options: {
      type: Array,
      required: true
    },
    value: {
      type: String,
      required: false
    }
  },
  methods: {
    showDropdownMenu() {
      console.log(this.$refs.dropdownMenu);
    }
  }
};
</script>
