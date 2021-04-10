<template>
  <div>
    <div class="px-2">
      <h2 class="font-extrabold">Transaction Completed</h2>
    </div>
    <vs-divider />
    <div class="flex justify-center items-center">
      <div class="text-center">
        <div class="mb-base">
          <vs-icon
            icon="verified_user"
            size="80px"
            color="success"
            rounded="true"
          ></vs-icon>
          <h4>Your video has been published to Ocean Market</h4>
        </div>
        <div class="flex items-center justify-center">
          <vs-button type="filled" @click="$emit('publish')">Next</vs-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Completed'
};
</script>
