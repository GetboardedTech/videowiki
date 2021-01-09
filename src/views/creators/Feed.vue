<template>
  <vs-card class="cardx">
    <div slot="header">
      <h3>Title</h3>
    </div>
    <div slot="media">
      <img
        src="@/assets/images/pages/search-result.jpg"
        class="h-48 mx-auto"
        style="width:300px"
      />
    </div>
    <div class="py-4">
      <p>Description of Video</p>
    </div>

    <div class="grid grid-cols-4">
      <div>
        <vx-tooltip text="Star">
          <vs-button type="gradient" color="danger" icon="star" class="m-0"
            >2.5k</vs-button
          >
        </vx-tooltip>
      </div>
      <div class="col-span-2"></div>
      <div>
        <vx-tooltip text="Clone">
          <vs-button color="primary" icon="call_split" style="float:right"
            >1.8k</vs-button
          >
        </vx-tooltip>
      </div>
    </div>
  </vs-card>
</template>
<script>
export default {};
</script>
