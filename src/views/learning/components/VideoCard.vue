<template>
  <vs-card class="cardx card-dimension custom-border-box">
    <div slot="media" class="thumbnail">
      <img src="@/assets/images/cardImage.jpeg" height="208" width="368" />
      <vs-chip class="video-length">31:20</vs-chip>
    </div>
    <div>
      <vs-row vs-type="flex" vs-align="center">
        <vs-chip class="video-tag">#biology</vs-chip>
        <vs-chip class="video-tag">#science</vs-chip>
      </vs-row>
      <div class="video-title text-dark mt-3" style="font-size: 15px">
        <b> WORLD'S BIGGEST MIRROR Uyuni Salt Flats, Bolivia</b>
      </div>
      <div class="creator-profile mt-3">
        <vs-row
          vs-type="flex"
          vs-justify="space-between"
          vs-align="center"
          class="pl-5"
        >
          <vs-col vs-w="5">
            <vs-row>
              <vs-avatar size="38px" class="custom-avatar" />
              <vs-avatar size="38px" class="custom-avatar" />
              <vs-avatar size="38px" class="custom-avatar" />
              <vs-avatar
                size="38px"
                class="custom-avatar"
                color="primary"
                text="+20"
              />
            </vs-row>
          </vs-col>
          <vs-col vs-w="5"
            ><vs-chip
              closable
              close-icon="keyboard_arrow_down"
              class="version-chip"
              >Version 3</vs-chip
            ></vs-col
          >
        </vs-row>
      </div>
    </div>
  </vs-card>
</template>
<script>
export default {};
</script>
<style scoped>
.card-dimension {
  height: 90%;
  width: 90%;
  overflow: hidden;
  border-radius: 16px;
}
.custom-avatar {
  margin: 0;
  margin-left: -13px;
}
.custom-avatar :first-child {
  font-size: 16px;
}
.thumbnail {
  position: relative;
}
.video-length {
  position: absolute;
  z-index: 10;
  bottom: 15px;
  right: 20px;
  background: rgba(0, 0, 0, 0.62);
}
.video-length :first-child {
  color: #fff;
  font-weight: 600;
}
.video-tag {
  width: 61px;
  height: 20px;
}

.version-chip :last-child {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 1px solid #e64980;
  cursor: pointer;
  color: #e64980;
  background: none;
}
</style>
