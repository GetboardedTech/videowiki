<template>
  <div>
    <div class="bg-white pb-base lg:pb-0">
      <div class="banner relative">
        <the-header navbarType="static" class="text-base" />
        <div class="text-center intro">
          <h1 class="lg:text-6xl font-extrabold mb-8 mt-2 text-5xl text-white">
            Welcome to VideoWiki Class
          </h1>
          <p class="lg:text-2xl text-xl text-white lg:w-3/5 w-4/5 mx-auto">
            VideoWiki Class gives you access to create your own rooms to host
            sessions, or join others using a short and convenient link.
          </p>
        </div>
        <div>
          <img
            src="../../assets/images/pages/videowikiClass/vwclass-intro.png"
            height="auto"
            width="100%"
          />
        </div>
      </div>
    </div>
    <div class="bg-white">
      <div class="lg:w-4/5 w-full mx-auto pb-20">
        <div class="text-center mb-base">
          <h1 class="font-extrabold mb-4 lg:text-4xl text-3xl">
            VideoWiki Features
          </h1>
          <p>vitae ligula erat. Phasellus pulvinar, nisl vel eleifend</p>
        </div>
        <div class="flex flex-wrap -m-6">
          <template v-for="(feature, idx) in featureList">
            <div class="p-6 w-full sm:w-1/2 md:w-1/3 lg:w-1/3" :key="idx">
              <vx-card class="w-full h-full">
                <div slot="no-body" class="card-img h-36">
                  <img :src="getCardIcon(feature.icon)" :alt="feature.icon" />
                </div>
                <div class="text-center">
                  <h5 class="mb-2 font-semibold text-xl mb-8">
                    {{ feature.title }}
                  </h5>
                  <p>{{ feature.description }}</p>
                </div>
              </vx-card>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="pt-20 pb-20 w-5/6 mx-auto">
      <NewsLetter />
    </div>
  </div>
</template>
<script>
import TheHeader from '@/layouts/components/navbar/videowiki-class/Navbar.vue';
import NewsLetter from '@/views/components/NewsLetter';
export default {
  components: {
    TheHeader,
    NewsLetter
  },
  data() {
    return {
      featureList: [
        {
          icon: 'play-circle',
          title: 'Record and Playback',
          description:
            'Allows you to record your content and to play back at convenient time'
        },
        {
          icon: 'edit',
          title: 'Whiteboard',
          description:
            'Lets you elucidate your topic with a better visual presentation.'
        },
        {
          icon: 'monitor',
          title: 'Screen Sharing',
          description:
            'Share your screen to explain the content right through your desktop.'
        },
        {
          icon: 'mic',
          title: 'Audio',
          description:
            'Enables you to include your own voice snippets in tune with the video.'
        },
        {
          icon: 'trello',
          title: 'Presentation',
          description:
            'Upload your own files, documents (PDFs , Microsoft office documents and other presentations).'
        },
        {
          icon: 'video',
          title: 'Webcam',
          description: 'Have an interactive meeting with the webcam support.'
        },
        {
          icon: 'smile',
          title: 'Emoji',
          description:
            'Makes learning a two way path by allowing users to use emoji for questions and feedbacks.'
        },
        {
          icon: 'check-square',
          title: 'Polling',
          description:
            'Know the interest of your audience with frequent polls and updates.'
        },
        {
          icon: 'group-chat',
          title: 'Chat',
          description:
            'Reach out to the creators and learners by dropping in a message for them.'
        },
        {
          icon: 'aperture',
          title: 'Live Captioning',
          description: 'Include real time captions to your presentations.'
        },
        {
          icon: 'users',
          title: 'Breakout Rooms',
          description:
            'Divide and effectively rule by addressing only to the concerned individuals.'
        },
        {
          icon: 'eye',
          title: 'Screen Reader',
          description:
            'Help users with disabilities to have an easy and interactive experience on Videowiki.'
        }
      ]
    };
  },
  methods: {
    getCardIcon(iconName) {
      return require(`../../assets/images/pages/videowikiClass/${iconName}.svg`);
    }
  }
};
</script>
<style scoped>
.banner {
  background: url('../../assets/images/pages/videowikiClass/classroom-header.svg');
  background-repeat: no-repeat;
}
.intro {
  margin: auto;
  padding-top: 5rem;
}
.card-img {
  display: flex;
  justify-content: center;
  padding: 2rem;
}
@media only screen and (min-width: 1100px) {
  .intro {
    margin-bottom: -5rem;
  }
}
</style>
