<template>
  <div class="vx-card items-center">
    <div class="vx-card__collapsible-content">
      <div class="vx-card__body">
        {{ /*$t('studio.sidebarPanel.publish.p1')*/ }}
        <!--div class="mt-10">
          <vx-timeline :data="timelineData"></vx-timeline>
        </div-->
        <div>
          <div
            v-for="(status, action, idx) in actionList"
            :key="idx"
            class="no-border relative font-medium flex items-center timeline-view"
          >
            <vs-icon
              :icon="status ? 'done' : 'clear'"
              :bg="status ? 'success' : 'danger'"
              round
              size="20px"
              class="text-white"
            />

            <span>{{ action }}</span>
          </div>
        </div>
        <div class="text-left mb-2 mt-6">
          <div>
            <h6 class="mb-2">Title</h6>
            <span class="text-danger text-sm" v-show="errors.has('title2')"
              >This field is required</span
            >
          </div>
          <input
            v-model="title"
            type="text"
            class="title2"
            name="title2"
            v-validate="'required'"
          />
        </div>
        <div class="text-left mb-2">
          <div>
            <h6 class="mb-2">Description</h6>
            <span class="text-danger text-sm" v-show="errors.has('desc')"
              >This field is required</span
            >
          </div>
          <textarea
            v-model="description"
            class="w-full description2 desc"
            name="desc"
            placeholder="Enter video description"
            v-validate="'required'"
          />
        </div>
        <div class="flex items-center mt-4" v-if="!insideIframe">
          <label for="paid-status" class="mr-2"><h6>Video Access</h6></label>
          <vs-switch v-model="isPaid" id="paid-status">
            <span slot="on">Paid</span>
            <span slot="off">Free</span>
          </vs-switch>
        </div>
        <div class="mt-4 text-left mb-4 flex items-center">
          <h6 class="mr-2">Tags</h6>
          <vx-tooltip text="Delete all">
            <vs-icon icon="delete" size="20px" @click="deleteAll" />
          </vx-tooltip>
        </div>
        <div class="total w-full">
          <div class="vx-card p-3 flex flex-wrap">
            <vs-chip
              :key="idx"
              @click="$store.commit('studio/removeTag', chip)"
              v-for="(chip, idx) in getTags"
              closable
              color="grey"
            >
              {{ chip }}
            </vs-chip>
            <input
              type="text"
              ref="tag"
              class="m-2 h-8 border-0"
              @keyup.enter="addTag"
              placeholder="Enter Tags"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PublishPanel',
  components: {
    // VxTimeline,
  },
  data() {
    return {};
  },
  created() {
    if (!this.$route.params.videoId) {
      this.$store.dispatch('studio/summarizeScript');
      this.$store.dispatch('studio/generateTags');
    }
  },
  computed: {
    insideIframe() {
      return this.$store.state.insideIframe;
    },
    getTags() {
      return this.$store.state.studio.tags;
    },
    actionList() {
      const steps = {
        Script: true,
        Scenes: true,
        Subtitles: false,
        Sound: false
      };
      if (this.$store.state.studio.preparedScenesVideos.some(el => el)) {
        steps.Subtitles = true;
      }
      if (
        this.$store.state.studio.addedAudioVideos.some(el => el) ||
        this.$store.state.studio.backgroundMusic.url
      ) {
        steps.Sound = true;
      }
      return steps;
    },
    title: {
      get() {
        return this.$store.state.studio.video.title;
      },
      set(value) {
        this.$store.commit('studio/SET_VIDEO_ATTR', {
          key: 'title',
          value: value
        });
      }
    },
    description: {
      get() {
        return this.$store.state.studio.video.description;
      },
      set(value) {
        this.$store.commit('studio/SET_VIDEO_ATTR', {
          key: 'description',
          value: value
        });
      }
    },
    isPaid: {
      get() {
        return this.$store.state.studio.video.isPaid;
      },
      set(value) {
        this.$store.commit('studio/SET_VIDEO_ATTR', {
          key: 'isPaid',
          value: value
        });
      }
    }
  },
  methods: {
    addTag(e) {
      this.$store.commit('studio/addTag', e.target.value);
      this.$refs.tag.value = '';
    },
    deleteAll() {
      this.$store.commit('studio/setTags', []);
    }
  }
};
</script>

<style lang="scss" scoped>
.title2 {
  height: 40px !important;
  border: 0.5px solid lightgray;
  font-size: 14px;
  overflow-y: auto;
  border-radius: 5px;
  color: #626262;
  opacity: 1; /* Firefox */
  text-indent: 0.01%;
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-style: normal;
  font-variant: normal;
  text-decoration: none solid rgb(98, 98, 98);
  text-align: start;
  line-height: 22.4px;
  vertical-align: baseline;
  padding: 9px;
}
.description2 {
  height: 100px !important;
  border-radius: 5px;
  border: 0.5px solid lightgray;
  font-size: 14px;
  overflow-y: auto;
  color: #626262;
  opacity: 1;
  text-indent: 0.01%;
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-style: normal;
  font-variant: normal;
  text-decoration: none solid rgb(98, 98, 98);
  text-align: start;
  line-height: 22.4px;
  vertical-align: baseline;
  padding: 9px;
}
p {
  white-space: break-spaces;
}
.timeline-view {
  border-left: 1px solid;
  padding-bottom: 10%;
  i {
    margin-left: -10px;
    margin-right: 10px;
    margin-top: -2px;
  }
}
div.total {
  div {
    div.con-chips {
      justify-content: flex-start !important;
    }
  }
}
</style>
