<template>
  <div class="bg-white p-20">
    <!-- VIDEO -->
    <video width="100%" height="auto" :src="videoUrl" controls>
      Your browser does not support the video tag.
    </video>
    <!--vs-card class="custom-border-box c-mb-4 p-0">
      <div class="tag-share-section ml-1 mt-n2">
        <vs-row vs-justify="space-between">
          <vs-col vs-w="5" vs-type="flex" vs-justify="start">
            <div class="category-tag">#biology</div>
            <div class="category-tag">#science</div>
            <div class="category-tag">#chemistry</div>
          </vs-col>
          <vs-col vs-w="5" vs-type="flex" class="text-right">
            <vs-button
              color="rgb(130,130,130,1)"
              type="border"
              icon="share"
              class="ml-4 text-custom"
              >share</vs-button
            >
            <vs-button
              color="rgb(130,130,130,1)"
              type="border"
              icon="watch_later"
              class="ml-4 text-custom"
              >10.24 Min</vs-button
            >
            <vs-button
              color="rgb(130,130,130,1)"
              type="border"
              icon="start"
              class="ml-4 text-custom"
              >4.6</vs-button
            >
          </vs-col>
        </vs-row>
      </div>
      <div class="creator-info-section pl-3">
        <vs-row vs-align="center" vs-justify="space-between">
          <vs-col
            vs-w="3"
            vs-type="flex"
            vs-align="center"
            vs-justify="flex-start"
          >
            <vs-avatar size="large" class="mr-4" />
            <div>
              <div class="text-variant-1 text-dark">Science</div>
              <div class="text-variant-2">By Chinmay</div>
            </div>
          </vs-col>
          <vs-col vs-w="6" vs-type="flex" vs-align="center" vs-justify="center">
            <div class="flex">
              <vs-button
                color="rgb(217,217,217,1)"
                icon="flag"
                size="large"
                text-color="rgb(130,130,130,1)"
                class="text-variant-1 ml-4 btn-size-custom"
                >Report</vs-button
              >
              <vs-button
                color="warning"
                icon="star"
                size="large"
                class="text-variant-1 ml-4 btn-size-custom"
                >Rating</vs-button
              >
              <div>
                <vs-button
                  color="rgb(114,71,196,1)"
                  size="large"
                  class="text-variant-1 ml-4 btn-size-custom"
                  @click="showBranch = true"
                  >Fork It
                </vs-button>
                <img
                  src="../../assets/images/pages/git-branch.png"
                  class="branch-icon"
                />
              </div>
            </div>
          </vs-col>
        </vs-row>
      </div>
    </vs-card-->
    <!--SCRIPT-->
    <!--vs-collapse type="margin" class="custom-border-box p-0 c-mb-4">
      <vs-collapse-item not-arrow="true" class="c-collapse">
        <div slot="header" @click="versionChip = !versionChip">
          <vs-row vs-type="flex" vs-align="center">
            <vs-col vs-type="flex" vs-w="10" vs-justify="flex-start">
              <vs-avatar size="large" class="m-0" />
              <vs-avatar size="large" class="custom-avatar" />
              <vs-avatar size="large" class="custom-avatar" />
              <vs-avatar
                size="large"
                class="custom-avatar"
                color="primary"
                text="+20"
              />
            </vs-col>
            <vs-col vs-w="1">
              <vs-chip class="version-chip c-version-chip" v-show="versionChip"
                >Version</vs-chip
              >
            </vs-col>
            <vs-col vs-w="1" vs-type="flex" vs-justify="center">
              <img
                src=""
                height="34"
                width="34"
              />
            </vs-col>
          </vs-row-->
    <!--div class="flex justify-between">
            <div class="flex items-center">
              <ul class="users-liked user-list ml-3 sm:ml-6">
                <li
                  v-for="(user, userIndex) in post.usersLiked"
                  :key="userIndex"
                >
                  <vx-tooltip :text="user.name" position="bottom">
                    <vs-avatar
                      :src="user.img"
                      size="30px"
                      class="border-2 border-white border-solid -m-1"
                    ></vs-avatar>
                  </vx-tooltip>
                </li>
              </ul>
              <small class="ml-2">+{{ post.likes - 5 }} more</small>
            </div>
            <div class="flex items-center">
              <feather-icon
                class="mr-2"
                icon="MessageSquareIcon"
                svgClasses="h-5 w-5"
              ></feather-icon>
              <span>{{ post.comments }}</span>
            </div>
          </div-->
    <!--/div>
        <div class="mt-5">
          <vs-tabs>
            <vs-tab label="Version 4 Script" class="mr-5">
              <div class="con-tab-ejemplo video-script">
                <div class="updated-date text-variant-1 mt-5">
                  <b>Updated on April 29, 2018</b>
                </div>
                <div class="text-variant-para mt-5">
                  Who are some of the players to start focusing on for the 2020
                  U.S. Open? Phil Mickelson, the 2006 runner-up at Winged Foot,
                  is working hard to become fully exempt. And we have a review
                  of the par-4 18th hole. The United States Golf Association
                  (USGA) conducts many of golf's most prestigious championships,
                  highlighted by the U.S. Open, the U.S. Women's Open and the
                  world’s premier amateur championships. Based in Liberty
                  Corner, N.J., the USGA governs the game in the U.S., its
                  territories and Mexico. istoric footage and films from golf's
                  iconic moments and figures, get the FREE USGA streaming app
                  for Apple TV and Roku.
                </div>
              </div>
            </vs-tab>
            <vs-tab label="Version 3 Script">
              <div class="con-tab-ejemplo"></div>
            </vs-tab>
            <vs-tab label="Version 2 Script">
              <div class="con-tab-ejemplo"></div>
            </vs-tab>
            <vs-tab label="More">
              <div class="con-tab-ejemplo"></div>
            </vs-tab>
          </vs-tabs>
        </div>
      </vs-collapse-item>
    </vs-collapse-->
    <!--COMMENTS-->
    <!--vs-card class="custom-border-box">
      <div class="comment-section">
        <div class="mb-4 text-variant-3 text-dark">Comments(780)</div>
        <vs-textarea placeholder="Add a public comment.." class="comment-box" />
        <vs-row vs-type="flex" vs-justify="flex-end">
          <vs-button
            color="rgb(114,71,196,1)"
            size="large"
            class="btn-text-variant"
            >Post Comment</vs-button
          >
        </vs-row>
        <div class="comment-list">
          <div class="comment-thread">
            <Comment />
            <div class="replies">
              <Comment />
            </div>
          </div>
          <Comment />
          <Comment />
        </div>
      </div>
    </vs-card-->
    <!-- RELATED VIDEOS-->
    <!--div class="trending">
      <div class="trend-title text-dark" style="font-size: 20px">
        <b>Related Videos</b>
      </div>
      <vs-row vs-align="center" vs-type="flex" class="video-tiles">
        <vs-col
          vs-w="4"
          :key="index"
          v-for="(col, index) in 3"
          vs-type="flex"
          vs-justify="center"
        >
          <VideoCard />
        </vs-col>
      </vs-row>
    </div-->
    <!-- VIDEO BRANCH MODAL -->
    <!--vs-popup :active.sync="showBranch" button-close-hidden="true">
      <VideoBranch />
    </vs-popup-->
  </div>
</template>
<script>
import Comment from './components/Comment';
//import VideoBranch from './components/video-branch/VideoBranch';
import constants from '../../../constant';
import VideoCard from '@/views/components/VideoCard';
export default {
  name: 'DetailViewVideo',
  components: {
    Comment,
    VideoCard,
    //VideoBranch,
  },
  data() {
    return {
      versionChip: true,
      showBranch: false,
    };
  },
  computed: {
    videoUrl() {
      return `${constants.apiUrl}/media/${this.$route.query.url}`;
    }
  }
};
</script>
<style scoped>
.tag-share-section {
  min-height: 116px;
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.creator-info-section {
  min-height: 140px;
  display: flex;
  align-items: center;
}
.category-tag {
  margin-right: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: static;
  width: 108px;
  height: 39.83px;
  left: 0px;
  top: 0px;
  background: #f7f7f7;
  border-radius: 6px;
  font-weight: 500;
  font-size: 14px;
  color: #828282;
}
.comment-section {
  padding: 3.25rem;
}
.comment-box {
  height: 188px;
  border: none !important;
  color: #a9a9a9;
  background: #f9f9f9;
  border-radius: 16px;
  padding: 1rem;
}
.btn-size-custom {
  height: 45px;
  width: 140px;
}

.trending {
  margin-top: 7rem;
  margin-bottom: 4rem;
}
.video-tiles {
  margin-top: 4rem;
}
.text-custom {
  font-weight: 600;
  font-size: 14px;

  color: #828282;
}
.c-version-chip:first-child {
  padding-right: 20px;
  padding-left: 10px;
  font-weight: 500;
  font-size: 14px;
}

.video-script {
  height: 330px;
  overflow: scroll;
}
.replies {
  margin-left: 5rem;
}
</style>
