<!-- =========================================================================================
    File Name: Dashboard.vue
    Description: Knowledge Base Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="knowledge-base-page" class="">
    <!-- JUMBOTRON -->

    <div class="section flex flex-wrap bg-white">
      <div class="lg:w-1/2 w-full lg:text-left text-center">
        <h1 class="lg:text-7xl font-extrabold mb-8 mt-2 text-5xl">
          Welcome To VideoWiki
        </h1>
        <p class="lg:text-2xl text-xl mb-10">
          Consider the tool as a "Video Wikipedia
          <br class="hidden lg:block" />for Learners and Creators"
        </p>
        <div class="lg:text-left text-center">
          <vs-button
            type="filled"
            class="bg-custom-purple text-base font-bold"
            @click="$router.push('/studio')"
            >Create Videos</vs-button
          >
        </div>
      </div>
      <div class="lg:w-1/2 hidden md:hidden sm:hidden lg:block">
        <img src="@/assets/images/landing-page/Frame1.svg" />
      </div>
    </div>

    <!-- JUMBOTRON /-->

    <!--ABOUT US-->

    <div class="section flex flex-wrap md:justify-between">
      <div class="lg:w-1/2 hidden md:hidden sm:hidden lg:block">
        <img src="@/assets/images/landing-page/Frame2.svg" />
      </div>
      <div class="lg:w-1/2 lg:mx-auto w-full text-left">
        <div class="lg:w-4/5 lg:mx-auto">
          <h1 class="text-4xl font-extrabold mb-8 lg:text-left text-center">
            About Us
          </h1>
          <p class="text-base font-medium mb-10">
            A collaborative platform for learners and educators to secure
            learning continuity in times of restrictions and beyond.
            <br /><br />
            A simple tool for teachers to create teaching content without any
            advance knowledge of a tool or code. They create by using various
            media and graphics from the open stock libraries and merging it with
            their own content to keep it engaging and diverse.
            <br /><br />
            Consider the tool as a
            <span class="font-bold"
              >"Video Wikipedia for Learners and Creators".</span
            >
          </p>
          <div class="text-center lg:text-left">
            <vs-button
              type="filled"
              class="bg-custom-purple text-base font-bold"
              @click="$router.push('/about')"
              >Learn More</vs-button
            >
          </div>
        </div>
      </div>
    </div>

    <!--ABOUT US /-->

    <!-- PROBLEM AND SOLUTION -->

    <div class="section bg-white">
      <h1 class="font-extrabold text-4xl mb-8 lg:text-left text-center">
        Problem &amp; Solution
      </h1>
      <p class="text-base text-left">
        In the education system, more than 90% of students are impacted due to
        school and university closures. Learning has been disrupted due to the
        pandemic. There is a requirement for a new education model. The map is a
        depiction of countries that are experiencing lockdown in terms of a
        countrywide or a localized lockdown. The education sector is affected by
        these lockdowns. An estimate of 1.5 billion students have been affected
        worldwide due to the pandemic.
      </p>
      <br />
      <p class="mb-base">
        <strong>
          Solution: Online and immersive digitalization of Content, Curriculum,
          Coaching, and Classroom.
        </strong>
      </p>
      <br />
      <div class="flex flex-wrap sm:-mx-6">
        <div class="sm:px-6 w-full mx-auto mb-base sm:w-2/3 md:w-1/3 lg:w-1/3">
          <vx-card>
            <div slot="no-body" class="card-img h-36">
              <img
                src="@/assets/images/landing-page/cpu.jpg"
                alt="content-img"
                class="card-img-top"
              />
            </div>
            <div class="text-center">
              <h5 class="mb-2 font-semibold text-xl mb-8">Digitize</h5>
              <p>Open Enterprise supports best in sociocratic management.</p>
            </div>
          </vx-card>
        </div>

        <div class="sm:px-6 w-full sm:w-2/3 mb-base md:w-1/3 lg:w-1/3 mx-auto">
          <vx-card>
            <div slot="no-body" class="card-img h-36">
              <img
                src="@/assets/images/landing-page/servers.png"
                alt="content-img"
                class="card-img-top"
              />
            </div>
            <div class="text-center">
              <h5 class="mb-2 font-semibold text-xl mb-8">Digitalize</h5>
              <p>Open Enterprise supports best in sociocratic management.</p>
            </div>
          </vx-card>
        </div>
        <div class="sm:px-6 w-full mx-auto mb-base sm:w-2/3 md:w-1/3 lg:w-1/3">
          <vx-card>
            <div slot="no-body" class="card-img h-36">
              <img
                src="@/assets/images/landing-page/audio-wave.png"
                alt="content-img"
                class="card-img-top"
              />
            </div>
            <div class="text-center">
              <h5 class="mb-2 font-semibold text-xl mb-8">
                Digitally Transform
              </h5>
              <p>Open Enterprise supports best in sociocratic management.</p>
            </div>
          </vx-card>
        </div>
      </div>
    </div>

    <!--PROBLEM AND SOLUTION /-->

    <vs-divider class="m-0" />

    <!-- INSPIRATION AND VISION -->

    <div class="section flex flex-wrap bg-white">
      <div class="lg:w-1/2 w-full text-left">
        <h1 class="font-extrabold text-4xl mb-10 lg:text-left text-center">
          Insipiration &amp; Vision
        </h1>
        <p class="font-medium">
          Theoretical knowledge online is what most universities have achieved,
          but practical training online so far seems unique. We are building
          tools to auto-generate (convert) text-based content to video-based
          online content with an extension towards gamification and immersive
          techniques for advanced pieces of training.
        </p>
        <br />
        <p class="mb-8 font-medium">
          <strong> Vision To ensure learning continuity for all. </strong>
          <br />Standardized education and access to all with equal
          opportunities to educational processes.
        </p>
        <div class="flex flex-wrap lg:justify-start justify-center -m-2">
          <div
            v-for="(item, idx) in list"
            :key="idx"
            class="no-border text-lg font-medium lg:w-1/4 p-2"
          >
            <vs-icon
              icon-pack="feather"
              icon="icon icon-check-circle"
              color="rgb(230,73,128)"
              class="mr-2 text-xl"
            />{{ item }}
          </div>
        </div>
      </div>
      <div class="lg:w-1/2 hidden md:hidden sm:hidden lg:block">
        <img src="@/assets/images/landing-page/Frame3.svg" />
      </div>
    </div>
    <!-- INSPIRATION AND VISION /-->

    <!-- PROTOTYPE AND TECHNOLOGY -->
    <div class="section bg-white">
      <div class="mb-10">
        <h2 class="font-extrabold text-4xl text-center mb-4">
          Prototype & Technology
        </h2>
        <p class="text-center font-medium">
          See our prototype &amp; technology how it works
        </p>
      </div>
      <br />
      <div class="col-lg-3 col-md-6 col-sm-6">
        <video
          width="100%"
          height="100%"
          controls
          autoplay
          class="rounded-lg text-center"
        >
          <source
            src="../assets/images/landing-page/demo.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
    <!--PROTOTYPE AND TECHNOLOGY /-->

    <!-- PROJECT GOALS -->
    <div class="section flex bg-white">
      <div class="lg:w-1/2 w-full">
        <h1 class="font-extrabold text-4xl mb-6 lg:text-left text-center">
          Project goals and <br class="hidden lg:block" />
          alignment with the SGDs
        </h1>
        <p class="font-medium mb-10 text-left">
          The importance of education is highlighted in SDG 4 (“Ensure inclusive
          and equitable quality education and promote lifelong learning
          opportunities for all”). This goal encompasses various dimensions that
          are critical to supporting young workers’ transition
        </p>
        <div class="lg:text-left text-center">
          <vs-button
            type="filled"
            class="bg-custom-purple font-bold"
            @click="$router.push('/goals')"
            >Learn More</vs-button
          >
        </div>
      </div>
      <div class="lg:w-1/3 hidden md:hidden sm:hidden lg:block mx-auto">
        <img src="@/assets/images/landing-page/Frame4.svg" />
      </div>
    </div>
    <!-- PROJECT GOALS /-->

    <!-- MISSION -->
    <div class="section">
      <div class="text-center">
        <h2 class="font-extrabold text-4xl mb-4">Mission</h2>
        <p class="font-medium">
          Our mission and vision make simple digital education interface
        </p>
      </div>
      <section class="flex flex-wrap justify-between">
        <div class="lg:w-1/2 hidden md:hidden sm:hidden lg:flex h-72 -ml-80px">
          <img src="@/assets/images/landing-page/Frame5.svg" />
        </div>
        <div class="lg:w-1/2 w-full">
          <vs-collapse accordion type="margin">
            <template v-for="(item, idx) in list4">
              <vs-collapse-item
                not-arrow
                :key="idx"
                class="bg-white"
                :ref="`collapse_${idx}`"
              >
                <div slot="header">
                  <div class="flex items-center -mx-2">
                    <vs-icon
                      icon-pack="feather"
                      :icon="expand(idx) ? 'icon icon-plus' : 'icon icon-minus'"
                      color="rgb(114,71,196,1)"
                      class="px-2"
                    />
                    <div class=" px-2 font-medium text-xl">
                      {{ item.title }}
                    </div>
                  </div>
                </div>
                {{ item.description }}
              </vs-collapse-item>
            </template>
          </vs-collapse>
        </div>
      </section>
    </div>
    <!--MISSION/-->

    <!--TEAMS-->
    <!--div class="section bg-white">
      <div class="text-center mb-20">
        <h1 class="font-extrabold text-4xl mb-4">Our Awesome Team</h1>
        <p class="font-medium">
          Rapidly developed, working, and ready for use.
        </p>
      </div>
      <div class="vx-row">
        <div
          class="vx-col w-4/5 mx-auto sm:w-1/2 md:w-1/3 lg:w-1/4 mb-base"
          v-for="member in getTeamList"
          :key="member.name"
        >
          <div class="flex flex-wrap">
            <MemberCard :member="member" />
          </div>
        </div>
      </div>
    </div-->

    <!--TEAMS/-->

    <!--STRATEGY-->
    <div class="section">
      <div class="text-center mb-20">
        <h1 class="font-extrabold text-4xl mb-4">
          Strategy: Steps to build a <br />
          sustainable and scalable business
        </h1>
      </div>
      <div class="flex justify-center relative">
        <ul class="w-4/5 timeline">
          <template v-for="(step, idx) in steps">
            <li
              :key="idx"
              class="flex"
              :class="{
                'mb-20': idx !== steps.length - 1,
                'justify-end': idx % 2 === 0
              }"
            >
              <div class="hidden lg:block md:block timeline-icon">
                <img src="@/assets/images/landing-page/disc.png" />
              </div>
              <div class="vx-card rounded-lg p-4 lg:h-48 lg:w-2/5 md:w-2/5">
                <div class="timeline-content">
                  <div class="flex items-center mb-4">
                    <vs-avatar
                      class="mr-6 block"
                      size="50px"
                      :src="getStepIcon(idx)"
                    />
                    <h5 class="font-semibold text-3xl">
                      STEP {{ (idx + 1).toString() }}
                    </h5>
                  </div>
                  <p>{{ step }}</p>
                </div>
              </div>
            </li>
          </template>
        </ul>
      </div>
    </div>
    <!--STRATEGY /-->

    <!--SUPPORT-->
    <div class="section bg-white">
      <div class="vx-col w-full mb-base lg:w-full">
        <vx-card>
          <vs-tabs>
            <vs-tab label="Partners">
              <div class="con-tab-ejemplo mt-6">
                <div
                  v-for="(item, idx) in list1"
                  :key="idx"
                  class="no-border font-medium mb-3 flex items-start"
                >
                  <vs-icon
                    icon="check_circle"
                    color="success"
                    size="16px"
                    class="mr-3"
                  />
                  <span>{{ item }}</span>
                </div>
              </div>
            </vs-tab>
            <vs-tab label="Key Supporters">
              <div class="con-tab-ejemplo mt-6">
                <div
                  v-for="(item, idx) in list2"
                  :key="idx"
                  class="no-border font-medium mb-3 flex items-start"
                >
                  <vs-icon
                    icon="check_circle"
                    color="success"
                    size="16px"
                    class="mr-3"
                  />{{ item }}
                </div>
              </div>
            </vs-tab>
            <vs-tab label="Mentors">
              <div class="con-tab-ejemplo mt-6">
                <div
                  v-for="(item, idx) in list3"
                  :key="idx"
                  class="no-border font-medium mb-3 flex items-start"
                >
                  <vs-icon
                    icon="check_circle"
                    color="success"
                    size="16px"
                    class="mr-3"
                  />{{ item }}
                </div>
              </div>
            </vs-tab>
          </vs-tabs>
        </vx-card>
      </div>
    </div>

    <!--SUPPORT/-->

    <!--NEWSLETTER-->
    <div class="section">
      <NewsLetter />
    </div>

    <!--NEWSLETTER/-->

    <!--FOOTER>
    <div class="bg-white">
      <TheFooter />
    </div>
    <FOOTER/-->
  </div>
</template>

<script>
import NewsLetter from './components/NewsLetter';
// import { teamList } from './components/localDb';
// import MemberCard from './components/MemberCard';

export default {
  data() {
    return {
      expand: Function,
      list: ['Content', 'Curriculums', 'Coaching', 'Classroom'],
      list1: [
        'Burgas Free University, Bulgaria',
        'Department of Management of the University of Torino, Italy',
        'Ege University EBILTEM Technology',
        'Transfer Office, Turkey',
        'Free University of Bolzano-Bozen, Italy',
        'Metinvest Holding Corporate Polytechnic University, Ukraine',
        'Grygoriy Scovoroda University in Pereiaslav',
        'Universitat Ramon Llull, Barcelona, Spain',
        'Modern Education& Research Institute',
        'El observatorio del trabajo'
      ],
      list2: [
        'Martin Sutherland: CEO, Peopletree Group',
        'Emria Saharkhiz, CEO Treejer (Blockchain based reforestation solution) for Blockchain',
        'Sumit rathore, CEO Arbunize Digital Media for AI solutions'
      ],
      list3: [
        'Michael Liu, on the Board of OceanX exchange (one of Top 100 crypto exchanges in the world by volume.)',
        'Isidro Laso, Cabinet Expert at Commissioner Gabriel cabinet for Innovation, Research, Education, Culture and Youth. at European Commission.',
        'Michael Brodie, Founder of OurNet'
      ],
      list4: [
        {
          title: 'Enable Learning',
          description: 'Content platform for semi-automated content creation.',
          closed: true
        },
        {
          title: 'Enable Conversations',
          description: 'Add sharing, feedback and communication options.',
          closed: true
        },
        {
          title: 'Engagement with extensions',
          description:
            'Adding gamification capabilities with new sensors for advances sciences',
          closed: true
        },
        {
          title: 'Standarize curriculums',
          description:
            'Bring the global learning at a relatively more standarized norm',
          closed: true
        },
        {
          title: 'Reduce inequalities',
          description:
            'Reduce global inequalities on access to education and qualification gaps.',
          closed: true
        },
        {
          title: 'Immersive ecosystem',
          description:
            'One world education and immersive with equal opportunities for all.',
          closed: true
        }
      ],
      steps: [
        `Digital Automated Content Platform that teachers use to create engaging learning content using Video's`,
        `Students get the digital lectures, courses for self-paced, yet guided virtual coaching`,
        `Anyone can clone content and create more learning material from previous creators`,
        `Public knowledge is free, you pay for private. The private revenues are shared back to free contributors`,
        `You're all good to go start learning`
      ]
    };
  },
  components: {
    NewsLetter,
    // MemberCard
  },
  computed: {
    getTeamList() {
      return teamList.slice(0, 4);
    }
  },
  mounted() {
    this.expand = idx => this.isClosed(idx);
  },
  methods: {
    isClosed(idx) {
      if (this.$refs[`collapse_${idx}`][0].maxHeight === '0px') return true;
      return false;
    },
    getStepIcon(index) {
      return require(`../assets/images/landing-page/step${index + 1}.png`);
    }
  }
};
</script>

<style scoped>
p {
  color: #544837 !important;
}
.knowledge-base-jumbotron-content {
  background-image: url('../assets/images/banner-landing.png');
  background-size: cover;
}
.aligncenter {
  text-align: center;
}
.no-border {
  border-bottom: none;
}
.section {
  padding: 8%;
}
.card-img {
  display: flex;
  justify-content: center;
  padding: 2rem;
}
.timeline-icon {
  position: absolute;
  right: 50%;
  transform: translateX(50%);
}
@media only screen and (min-width: 768px) {
  .timeline::before {
    content: '';
    position: absolute;
    height: 85.5%;
    width: 1px;
    border-right: 0.5px dashed rgba(230, 73, 128, 0.7);
    left: 50%;
    transform: translateX(-50%);
  }
}
img {
  height: 100%;
}
</style>
