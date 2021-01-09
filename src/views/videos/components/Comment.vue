<template>
  <div>
    <div class="comment-container">
      <vs-row
        vs-type="flex"
        vs-align="center"
        vs-justify="flex-start"
        class="mb-1"
      >
        <vs-avatar size="large" class="mr-4" />
        <div>
          <div class="text-variant-1 text-dark">Chinmay</div>
          <div class="comment-date">Oct 26, 2020 2:53PM</div>
        </div>
      </vs-row>
      <div class="comment-text">
        Consequat ut nulla tempor commodo non nostrud in dolore velit nisi esse
        cupidatat. Ex occaecat in qui officia nostrud quis velit esse velit et
        mollit occaecat enim. Occaecat mollit eu id sit fugiat duis pariatur.
        Nostrud aute sit eiusmod enim culpa consectetur magna duis ipsum duis
        eiusmod dolore irure. Ad magna exercitation velit anim exercitation sit
        ut do amet.
      </div>
      <div class="comment-action">
        <vs-row vs-type="flex" vs-justify="flex-start">
          <vs-button
            text-color="rgb(130,130,130,1)"
            color="rgb(255,255,255)"
            icon="thumb_up"
            class="comment-action-item"
            >26K</vs-button
          >
          <vs-button
            text-color="rgb(130,130,130,1)"
            color="rgb(255,255,255)"
            icon="thumb_down"
            class="comment-action-item"
            >26K</vs-button
          >
          <vs-button
            color="rgb(114,71,196,1)"
            icon="reply"
            icon-after
            class="comment-action-item"
            >Reply</vs-button
          >
        </vs-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Comment'
};
</script>
<style scoped>
.comment-container {
  margin-bottom: 4.25rem;
}
.comment-date {
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  color: #787878;
}
.comment-text {
  font-weight: normal;
  font-size: 18px;
  margin-bottom: 1rem;
}
.comment-action-item {
  width: 79px;
  height: 32px;
  font-weight: bold;
  font-size: 12px;
  margin-right: 0.5rem;
}
.text-variant-1 {
  font-size: 16px;
  font-weight: 600;
}
</style>
