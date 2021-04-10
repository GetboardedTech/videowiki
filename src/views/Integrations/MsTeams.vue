<template>
  <div>
    <div class="teams-banner-wrapper bg-white">
      <div class="teams-banner flex justify-center items-center">
        <div class="text-center" style="margin-top: -14%">
          <h1
            class="text-white lg:text-5xl sm:text-4xl text-3xl font-extrabold"
          >
            VideoWiki; Now <br />Microsoft Teams Plugin
          </h1>
        </div>
        <img
          src="../../assets/images/pages/videowikiClass/classroom-header.svg"
        />
      </div>
      <div class="demo-video-wrapper text-center">
        <iframe
          src="https://www.youtube.com/embed/zbZ3P9tllJY"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        >
        </iframe>
      </div>
    </div>
    <div class="section bg-white">
      <div class="text-center mb-20">
        <h2 class="font-extrabold text-4xl mb-4">About our Plugin</h2>
        <p>
          VideoWiki, now as a teams plugin, in the Microsoft Apps market place,
          helps users to:
        </p>
      </div>
      <div class="flex flex-wrap justify-center -m-4">
        <template v-for="(feature, idx) in features">
          <div
            class="flex items-start lg:w-1/2 flex-wrap justify-center p-4 -m-4"
            :key="idx"
          >
            <div class="p-2">
              <div class="custom-bullet flex justify-center items-center">
                {{ idx + 1 }}
              </div>
            </div>
            <div class="p-2 lg:w-2/3 md:w-4/5 w-4/5 ml-3">
              <h3
                class="mb-base font-semibold lg:text-left md:text-left sm:text-left text-center"
              >
                {{ feature.title }}
              </h3>
              <p class="text-left">
                {{ feature.desc }}
              </p>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="section flex flex-wrap">
      <div class="lg:w-1/2 w-full">
        <h1 class="font-extrabold lg:text-4xl mb-6 lg:text-left text-center">
          How It Works
        </h1>
        <p class="font-medium mb-10 lg:w-3/4">
          VideoWiki uses AI-based text classification methods, we can identify
          the context of the content and make queries to public video media
          libraries using APIs. These can be given back to the teachers as an
          assisted course creation tool to develop interactive digital media.
        </p>
      </div>
      <div class="lg:w-1/2 flex justify-center">
        <img
          src="https://dapi.videowiki.pt/media/teams-card/videowiki_teams.gif"
          width="80%"
          height="100%"
        />
      </div>
    </div>
    <div class="bg-white pb-base" style="padding-top: 10%">
      <vx-card noShadow class="w-4/5 mx-auto" style="margin-top: -14%">
        <template v-for="(item, idx) in integrationList">
          <div class="flex items-start" :key="idx">
            <img src="../../assets/images/pages/arrow-right-custom.svg" />
            <p style="transform: translate(0px, 8px)">{{ item }}</p>
          </div>
        </template>
      </vx-card>
      <vx-card class="w-4/5 mx-auto mt-base text-center">
        <div class="flex flex-wrap justify-between items-center -m-2">
          <div class="p-2 w-full sm:w-auto">
            <h4>For query, help and support</h4>
          </div>
          <div class="p-2 w-full sm:w-auto text-center">
            <vs-button type="filled" to="/contact-us">Contact Us</vs-button>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>
<script>
import VxCard from '../../components/vx-card/VxCard.vue';
export default {
  components: { VxCard },
  data() {
    return {
      features: [
        {
          title: 'Convert any media',
          desc:
            'Possibility to convert any shared media format (text, ppt, doc, weblink) into an immersive video'
        },
        {
          title: 'Generate Video Logs',
          desc:
            'Save and post-produce recorded meeting streams to make better video logs.'
        },
        {
          title: 'Create Video Notes',
          desc:
            'Create video notes, minutes of meetings, and track record of important information with editor features like trim, split, switch, etc.'
        },
        {
          title: 'Forking the videos',
          desc:
            'Collaborate on video by forking the videos to add your own input, revisit and review to keep information up-to-date. All without re-doing the whole video or knowledge of complicated video editing software.'
        }
      ],
      integrationList: [
        'Using the message extension one can jump to our video creation platform.',
        'Any uploaded PowerPoint or recorded session can be directly used to create the video.',
        `A Videowiki Bot; that gives a tour and guides on how to create video-based content from texts or presentations.`,
        'Using commands, one can jump to the creation platform',
        `Task Module to view already created content and creating new videos`
      ]
    };
  }
};
</script>
<style scoped>
.section {
  padding: 8%;
}
.teams-banner {
  /* background-image: url('../../assets/images/pages/videowikiClass/classroom-header.svg');
  background-size: cover;
  height: 550px; */
  position: relative;
}
.teams-banner img {
  height: auto;
  width: 100%;
}
.teams-banner {
  max-height: 550px;
  overflow: hidden;
}
.teams-banner div {
  position: absolute;
}
.custom-bullet {
  color: #ffffff;
  text-align: center;
  height: 69px;
  width: 72px !important;
  font-weight: bold;
  font-size: 26px;
  background: linear-gradient(135deg, #e64980 14.25%, #ffafcb 87.25%);
  box-shadow: 0px 6px 12px #ffd6e4;
  border-radius: 50%;
}
.demo-video-wrapper {
  position: relative;
  overflow: hidden;
  width: 68%;
  padding-top: 40%;
  margin: auto;
  margin-top: -20%;
}
.demo-video-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border-radius: 18px;
}
</style>
