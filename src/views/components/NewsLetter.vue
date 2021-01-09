<template>
  <div>
    <div class="text-center mb-20">
      <h1 class="font-extrabold text-4xl mb-4">Subscribe to our newsletter</h1>
      <p class="font-medium">
        Subscribe to our newsletter and stay up to date about the VideoWiki!
      </p>
    </div>
    <div class="flex lg:w-2/4 justify-center">
      <vx-input-group class="mb-base">
        <vs-input
          icon-pack="feather"
          icon="icon-mail"
          :size="$store.state.windowWidth < 500 ? 'default' : 'large'"
          placeholder="Email Address"
          icon-no-border
        />

        <template slot="append">
          <div class="append-text btn-addon">
            <vs-button
              class="bg-custom-purple"
              :size="$store.state.windowWidth < 500 ? 'default' : 'large'"
              >Subscribe</vs-button
            >
          </div>
        </template>
      </vx-input-group>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NewsLetter',
};
</script>
