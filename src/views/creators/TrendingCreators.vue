<template>
  <vx-card class="mr-4">
    <vs-list class="p-4">
      <vs-list-header
        title="Trending Creators"
        color="primary"
      ></vs-list-header>
      <vs-list-item title="Steve Jobes" subtitle="Top Contributor">
        <template slot="avatar">
          <vs-avatar />
        </template>
      </vs-list-item>
      <vs-list-item title="Matt" subtitle="121 Points">
        <template slot="avatar">
          <vs-avatar vs-text="Vuexy" />
        </template>
      </vs-list-item>
      <vs-list-item title="Shivam" subtitle="110 Points">
        <template slot="avatar">
          <vs-avatar vs-text="Vuexy" />
        </template>
      </vs-list-item>
      <vs-list-item title="Sumit" subtitle="101 Points">
        <template slot="avatar">
          <vs-avatar vs-text="Vuexy" />
        </template>
      </vs-list-item>
    </vs-list>
  </vx-card>
</template>
<script>
export default {
  name: 'TrendingCreators'
};
</script>
