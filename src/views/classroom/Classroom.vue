<template>
  <div>
    <div class="section bg-white">
      <div class="lg:w-full text-center">
        <h1 class="lg:text-6xl font-extrabold mb-8">
          Engaging Video Classrooms
        </h1>
        <p class="text-2xl font-medium mb-10 text-custom-black">
          Simple video collaboration between students and teachers.<br />
          Set your room and start your class.
        </p>
        <vs-button
          type="filled"
          class="bg-custom-purple text-base font-bold"
          @click="checkLoginStatus"
          >Start My Class</vs-button
        >
      </div>
      <div class="lg:w-full hidden lg:flex justify-center">
        <img src="@/assets/images/pages/classroom1.svg" />
      </div>
    </div>
    <vs-popup ref="custom_modal" :active.sync="startClassModal">
      <div>
        <h1 class="lg:text-4xl font-extrabold mb-base">
          Create your Classroom
        </h1>
        <!--p class="font-medium mb-8 text-custom-black">
          This is your classoom link for video collaboration so make sure you
          like it
        </p>
        <p class="mb-8">{{ getClassroomLink }}</p-->
        <vs-input
          class="w-full"
          size="large"
          placeholder="Enter Room Name"
          v-model="classroomName"
        />
        <div class="flex justify-between items-center mt-4 mb-8">
          <div class="flex items-start -mx-4">
            <vs-icon icon="lock" size="24px" color="primary" class="px-4" />
            <div class="px-4">
              <span class="font-semibold text-custom-black text-xl"
                >Locked Classroom</span
              >
              <p class="font-medium text-custom-black">
                Guest need to knock to enter locked classrooms
              </p>
            </div>
          </div>
          <vs-switch color="success" v-model="isLocked" />
        </div>
        <vs-button
          type="filled"
          size="large"
          class="bg-custom-purple text-base font-bold w-full"
          target="_blank"
          :href="`https://${getClassroomLink}`"
          >Create my Classroom</vs-button
        >
      </div>
    </vs-popup>
    <vs-popup title="Login Required" :active.sync="loginPopup">
      <p>Please login to use this feature</p>
    </vs-popup>
    <!----------->
    <div class="section flex">
      <div class="lg:w-1/2 w-full">
        <h1 class="font-extrabold lg:text-4xl mb-6 lg:text-left text-center">
          Video conferencing Tools <br class="hidden lg:block" />
          don’t work for students
        </h1>
        <p class="font-medium mb-10 lg:w-3/4">
          Well of course they don’t. There are number of complicated video
          conferences tools that serve various purposes like corporate meetings,
          event, webinars and even live classes, but none is made focused to
          help learning, collaboration and knowledge sharing. This makes the
          difference. Classroom is a project to enhance your learning experience
          by engagement. Let's make online learning a little more lively.
        </p>
        <div class="lg:text-left text-center">
          <vs-button
            type="filled"
            class="bg-custom-purple font-bold"
            @click="$router.push('/vc')"
            >Learn More</vs-button
          >
        </div>
      </div>
      <div class="lg:w-1/2 hidden lg:flex justify-center">
        <img src="@/assets/images/pages/classroom2.svg" />
      </div>
    </div>
    <!---------->
    <div class="section bg-white text-center">
      <h1 class="font-extrabold text-4xl mb-8">Service and Technology</h1>
      <p class="text-base">
        Nam vitae ligula erat. Phasellus pulvinar, nisl vel eleifend
      </p>
      <div class="vx-row mt-8 sm:-mx-6">
        <div
          class="vx-col w-full mx-auto mb-base sm:w-2/3 md:w-1/3 lg:w-1/3 sm:px-6"
        >
          <vx-card style="height: 100%">
            <div slot="no-body" class="card-img h-36">
              <img
                src="@/assets/images/pages/compass1.png"
                alt="content-img"
                class="card-img-top"
              />
            </div>
            <div class="text-center">
              <h5 class="mb-2 font-semibold text-xl mb-8">Browser based</h5>
              <p>
                WebRTC JavaScript application that works right from the browser
                to provide high quality, secure and scalable video sessions.
              </p>
            </div>
          </vx-card>
        </div>

        <div
          class="vx-col w-full sm:w-2/3 mb-base md:w-1/3 lg:w-1/3 mx-auto sm:px-6"
        >
          <vx-card style="height: 100%">
            <div slot="no-body" class="card-img h-36">
              <img
                src="@/assets/images/pages/chat1.png"
                alt="content-img"
                class="card-img-top"
              />
            </div>
            <div class="text-center">
              <h5 class="mb-2 font-semibold text-xl mb-8">Not just Video</h5>
              <p>
                It's not just about video, audio and chat. Create and share
                engaging content right in the stream. Draw, create, collaborate.
              </p>
            </div>
          </vx-card>
        </div>
        <div
          class="vx-col w-full mx-auto mb-base sm:w-2/3 md:w-1/3 lg:w-1/3 sm:px-6"
        >
          <vx-card>
            <div slot="no-body" class="card-img h-36">
              <img
                src="@/assets/images/pages/group-chat1.png"
                alt="content-img"
                class="card-img-top"
              />
            </div>
            <div class="text-center">
              <h5 class="mb-2 font-semibold text-xl mb-8">
                Free up-to 50 students
              </h5>
              <p>
                We don’t expect the class size to be more than 50 students so we
                kept the limit to 50 for better experiences, need more free?
                Just drop a message.
              </p>
            </div>
          </vx-card>
        </div>
      </div>
    </div>
    <!-------------------->
    <div class="section">
      <div class="text-center mb-20">
        <h1 class="font-extrabold text-4xl mb-4">
          How VideoWiki is different from others
        </h1>
        <p class="font-medium lg:w-3/5 mx-auto">
          VideoWiki is focused to solve the challenge of learning continuity by
          providing digital options for learning. We are following the UN SDG 4
          and OECD 2030 vision of education.
        </p>
      </div>
      <Reviews :users="userList" />
    </div>
    <!-------------------->
    <div class="section bg-white">
      <div class="text-center mb-20">
        <h1 class="font-extrabold text-4xl mb-4">Frequently Asked Questions</h1>
        <p class="font-medium">
          Rapidly developed, working, and ready for use.
        </p>
        <div class="text-left">
          <vs-collapse accordion type="margin">
            <!--template v-for="(item, idx) in faqList"-->
            <vs-collapse-item
              :ref="`collapse_1`"
              not-arrow
              class="bg-white collapse-item-border"
            >
              <div slot="header" class="flex items-center">
                <vs-icon
                  icon-pack="feather"
                  :icon="expand(1) ? 'icon icon-plus' : 'icon icon-minus'"
                  class="mr-5 font-bold"
                  :class="{
                    'text-custom-purple': !expand(1),
                    'text-black': expand(1),
                  }"
                />
                <span
                  class="font-medium text-xl"
                  :class="{
                    'text-custom-purple': !expand(1),
                    'text-black': expand(1),
                  }"
                  >Why VideoWiki.pt</span
                >
              </div>
              <div class="p-8">
                <p class="mb-6">
                  VideoWiki is created with Efficient E-Learning in mind. It not
                  only overcomes the lacking of other E-Learning platforms but
                  offers even more features.<br />
                  Let's discuss how
                </p>
                <ol class="ml-4">
                  <li class="mb-base">
                    <b>Collaborative contribution :</b> Every tutorial becomes
                    outdated after a point of time and requires amendments at
                    regular intervals. In most platforms, this becomes the sole
                    responsibility of the creator. VideoWiki enables and
                    encourages collaborative effort in making e-learning
                    modules. Everyone can fork and contribute to an existing
                    module ensuring the contents are up to date and VideoWiki’s
                    versioning system manages that each fork is managed
                    properly. At the same time, every contributor is rewarded
                    with Crypto Coins.
                  </li>
                  <li class="mb-base">
                    <b>Feedback and Response System :</b> VideoWiki provides the
                    opportunity of conducting virtual classes where students get
                    the opportunity to interact directly with the teachers and
                    discuss the topic at hand. This enables the teachers to get
                    feedback and clear any confusion regarding the discussed
                    curriculum.
                  </li>
                  <li>
                    <b>Censorship Resistant :</b> The Education System is
                    responsible for shaping the future generation of the nation
                    and thus has often been subjected to political influence and
                    censorship. VideoWiki’s backend is based on Public
                    Distributed Blockchain network and thus is not only
                    Censorship Resistant but also open and publicly available to
                    all.
                  </li>
                </ol>
              </div>
            </vs-collapse-item>
            <!--/template-->
            <vs-collapse-item
              :ref="`collapse_2`"
              not-arrow
              class="bg-white collapse-item-border"
            >
              <div slot="header" class="flex items-center">
                <vs-icon
                  icon-pack="feather"
                  :icon="expand(2) ? 'icon icon-plus' : 'icon icon-minus'"
                  class="mr-5 font-bold"
                  :class="{
                    'text-custom-purple': !expand(2),
                    'text-black': expand(2),
                  }"
                />
                <span
                  class="font-medium text-xl"
                  :class="{
                    'text-custom-purple': !expand(2),
                    'text-black': expand(2),
                  }"
                  >What's new in VideoWiki.pt</span
                >
              </div>
              <div class="p-8">
                <p class="mb-6">
                  Now let’s have a look at what new VideoWiki.pt brings into the
                  E-Learning domain
                </p>
                <ol class="ml-4">
                  <li>
                    <b>Easy content creation :</b> It’s often difficult to
                    create engaging video content and thus video lecture often
                    becomes boring and students lose interest. In VideoWiki,
                    teachers don’t have to waste time with video editing
                    software to make engaging tutorials. VideoWiki uses
                    OpenSource Machine Learning Models to create a basic video
                    for the creator which can be further modified by the creator
                    according to the needs. It’s a quick and efficient way of
                    making video tutorials
                  </li>
                </ol>
              </div>
            </vs-collapse-item>

            <vs-collapse-item
              :ref="`collapse_3`"
              not-arrow
              class="bg-white collapse-item-border"
            >
              <div slot="header" class="flex items-center">
                <vs-icon
                  icon-pack="feather"
                  :icon="expand(3) ? 'icon icon-plus' : 'icon icon-minus'"
                  class="mr-5 font-bold"
                  :class="{
                    'text-custom-purple': !expand(3),
                    'text-black': expand(3),
                  }"
                />
                <span
                  class="font-medium text-xl"
                  :class="{
                    'text-custom-purple': !expand(3),
                    'text-black': expand(3),
                  }"
                  >Creating content using VideoWiki.pt</span
                >
              </div>
              <div class="p-8">
                <p class="mb-6">
                  Creating video content using the VideoWiki is extremely
                  simple. Content creation is a difficult task whether one has
                  to master a lot of tips and tricks to make it interesting and
                  engaging, but in our platform, you have an AI to help you out.
                </p>
                <p class="mb-base">So, here’s how you make the content:</p>
                <ol class="ml-4" style="list-style-type: decimal">
                  <li>
                    You prepare the transcript (the script you will be following
                    in your presentation).
                  </li>
                  <li>
                    You upload the transcript into our video creation platform
                    and our AI model searches the web for Royalty Free images
                    and video clips from the internet and creates video content
                    for you.
                  </li>
                  <li>
                    In most cases, you will want to edit the content and our
                    online-editor makes it very easy to edit the video, add or
                    remove contents in the video to make it best-suited for your
                    content.
                  </li>
                  <li>
                    You can also upload your own created/recorded video from
                    your local device.
                  </li>
                  <li>
                    Once you are satisfied with the outcome you can publish it
                    on our Public Blockchain Network for the world to see it.
                    You can also keep the video private if you want limited
                    access to the video.
                  </li>
                </ol>
              </div>
            </vs-collapse-item>

            <vs-collapse-item
              :ref="`collapse_4`"
              not-arrow
              class="bg-white collapse-item-border"
            >
              <div slot="header" class="flex items-center">
                <vs-icon
                  icon-pack="feather"
                  :icon="expand(4) ? 'icon icon-plus' : 'icon icon-minus'"
                  class="mr-5 font-bold"
                  :class="{
                    'text-custom-purple': !expand(4),
                    'text-black': expand(4),
                  }"
                />
                <span
                  class="font-medium text-xl"
                  :class="{
                    'text-custom-purple': !expand(4),
                    'text-black': expand(4),
                  }"
                  >Earning from VideoWiki.pt</span
                >
              </div>
              <div class="p-8">
                <p class="mb-base">
                  <i
                    ><b
                      >“Teachers are pillar of the society, builders of the
                      nation”</b
                    >
                    -Rosaiah</i
                  >
                </p>
                <p class="mb-6">
                  Everyone who is contributing to the VideoWiki library by
                  creating content is a Teacher, and we encourage them for their
                  efforts by paying them using Cryptocurrency. This
                  cryptocurrency can be used in an exchange to convert it into
                  native-currency or can be directly used in other online
                  platforms supporting payment in form of cryptocurrency
                </p>
              </div>
            </vs-collapse-item>

            <vs-collapse-item
              :ref="`collapse_5`"
              not-arrow
              class="bg-white collapse-item-border"
            >
              <div slot="header" class="flex items-center">
                <vs-icon
                  icon-pack="feather"
                  :icon="expand(5) ? 'icon icon-plus' : 'icon icon-minus'"
                  class="mr-5 font-bold"
                  :class="{
                    'text-custom-purple': !expand(5),
                    'text-black': expand(5),
                  }"
                />
                <span
                  class="font-medium text-xl"
                  :class="{
                    'text-custom-purple': !expand(5),
                    'text-black': expand(5),
                  }"
                  >Is cryptocurrency any different from real money?</span
                >
              </div>
              <div class="p-8">
                <p class="mb-base">The short answer is <b>"NO"</b></p>
                <p class="mb-base">
                  The traditional currency we use to buy our morning Coffee is
                  called Fiat Currency which is based on the Centralised Banking
                  System which has one governing body that controls the
                  currency. Cryptocurrency on the other hand is a part of the
                  Decentralised Finance (Defi) System which is based on the
                  principle that there is no one governing body. Every computer
                  connected to the system is a node and every node participates
                  in the public blockchain network which uses Cryptocurrency as
                  an incentive for each node to be a part of the network.
                </p>
                <p class="mb-base">
                  So, <b>Can I use cryptocurrency in the market?</b>
                </p>
                <p>
                  <b>Yes and No.</b> Just like there are different types of
                  currency across nations and one country’s currency can’t be
                  directly used in a local store of another country, the same is
                  true for crypto. You have to use an exchange to convert your
                  cryptocurrency into the native currency you are interested in
                  using. A direct crypto payment can only be done when the
                  vendor accepts payment in crypto.
                </p>
              </div>
            </vs-collapse-item>

            <vs-collapse-item
              :ref="`collapse_6`"
              not-arrow
              class="bg-white collapse-item-border"
            >
              <div slot="header" class="flex items-center">
                <vs-icon
                  icon-pack="feather"
                  :icon="expand(6) ? 'icon icon-plus' : 'icon icon-minus'"
                  class="mr-5 font-bold"
                  :class="{
                    'text-custom-purple': !expand(6),
                    'text-black': expand(6),
                  }"
                />
                <span
                  class="font-medium text-xl"
                  :class="{
                    'text-custom-purple': !expand(6),
                    'text-black': expand(6),
                  }"
                  >Do I have to pay for the course?</span
                >
              </div>
              <div class="p-8">
                <p class="mb-base">
                  You ONLY pay for the course when you want to create a
                  <b>Private</b>
                  fork of the repo. Private forks limit the access of the repo
                  (video course) to only the people you provide access to. In
                  other words, you make a private copy of the video tutorial,
                  where the changes you make are not publicly available to
                  everyone. Making a private fork requires you to make payment
                  in cryptocurrency.
                </p>
                <p>
                  There is no Price for viewing and adding to publicly available
                  content.
                </p>
              </div>
            </vs-collapse-item>
          </vs-collapse>
        </div>
      </div>
    </div>
    <!------------------->
    <div class="section">
      <div class="text-center mb-20">
        <h1 class="font-extrabold text-4xl mb-4">
          Simple free video collaboration
        </h1>
        <p class="font-medium">
          Rapidly developed, working, and ready for use.
        </p>
        <vs-button
          type="filled"
          to="/studio"
          class="bg-custom-purple text-base font-bold mt-8"
          >Get Started Now</vs-button
        >
      </div>
    </div>
    <!------------------------->
  </div>
</template>
<script>
import { mapState } from 'vuex';
import Reviews from './components/Reviews';
import VxCard from '../../components/vx-card/VxCard.vue';
export default {
  name: 'Classoom',
  components: {
    VxCard,
    Reviews,
  },
  data() {
    return {
      expand: Function,
      startClassModal: false,
      loginPopup: false,
      isLocked: false,
      classroomName: '',
      userList: [
        {
          name: 'AB John',
          desc: 'Teacher',
          review:
            'At our University, VideoWiki gives the teachers ability to digitize their learning content without a technical knowledge or using advanced tools.',
        },
        {
          name: 'CD Paula',
          desc: 'L&D HR',
          review:
            'VideoWiki could find use-cases in many segments where content is generated rapidly, modified, and distributed in usual media formats.',
        },
        {
          name: 'Rui Couto',
          desc: 'WPC Ambassador',
          review:
            'The project has the potential to become a Wikipedia for media. Creating the next editable encyclopaedia for video collaborations instead of text.',
        },
        {
          name: 'Bhaskar Dutta',
          desc: 'BlockChain Developer',
          review:
            'Both educational and corporate benefits could make the solution sustainable and beneficial. Decentralization of such solution also makes it a trusted, transparent and impartial knowledge repository.',
        },
      ],
      faqList: [
        {
          title: 'Why Videowiki.pt',
          description: `VideoWiki is created with Efficient E-Learning in mind. It not only overcomes the lacking of other E-Learning platforms but offers even more features. Let's discuss how.
          
          Collaborative contribution: Every tutorial becomes outdated after a point of time and requires amendments at regular intervals. In most platforms, this becomes the sole responsibility of the creator. VideoWiki enables and encourages collaborative effort in making e-learning modules. Everyone can fork and contribute to an existing module ensuring the contents are up to date and VideoWiki’s versioning system manages that each fork is managed properly. At the same time, every contributor is rewarded with Crypto Coins.
          
          Feedback and Response System: VideoWiki provides the opportunity of conducting virtual classes where students get the opportunity to interact directly with the teachers and discuss the topic at hand. This enables the teachers to get feedback and clear any confusion regarding the discussed curriculum.`,
          closed: true,
        },
        {
          title: `What's new in VideoWiki.pt`,
          description: 'Add sharing, feedback and communication options.',
          closed: true,
        },
        {
          title: 'Creating content using VideoWiki.pt',
          description:
            'Adding gamification capabilities with new sensors for advances sciences',
          closed: true,
        },
        {
          title: 'Earning from VideoWiki.pt',
          description:
            'Bring the global learning at a relatively more standarized norm',
          closed: true,
        },
        {
          title: 'Is cryptocurrency any different from real money?',
          description:
            'Reduce global inequalities on access to education and qualification gaps.',
          closed: true,
        },
        {
          title: 'Do I have to pay for the course?',
          description:
            'One world education and immersive with equal opportunities for all.',
          closed: true,
        },
      ],
    };
  },
  mounted() {
    this.expand = (idx) => this.isClosed(idx);
    this.$refs.custom_modal.$el.childNodes[1].childNodes[0].style.display =
      'none';
    this.$refs.custom_modal.$el.childNodes[1].style.width = '620px';
    this.$refs.custom_modal.$el.childNodes[1].style.borderRadius = '20px';
    this.$refs.custom_modal.$el.childNodes[1].childNodes[1].style.padding =
      '3rem';
  },
  computed: {
    ...mapState('auth', ['isUserLoggedIn']),
    getClassroomLink() {
      return `class.videowiki.pt/b/start_class?name=User&email=${this.userInfo.username}&room_name=${this.classroomName}`;
    },
    userInfo() {
      return this.$store.state.AppActiveUser;
    },
  },
  methods: {
    isClosed(idx) {
      if (this.$refs[`collapse_${idx}`].maxHeight === '0px') return true;
      return false;
    },
    checkLoginStatus() {
      if (this.isUserLoggedIn()) this.startClassModal = true;
      else this.$store.commit('TOGGLE_LOGIN_POPUP', true);
    },
  },
};
</script>

<style scoped>
.card-img {
  display: flex;
  justify-content: center;
  padding: 2rem;
}
.collapse-item-border {
  border-radius: 0;
  box-shadow: none;
  border: 1px solid rgba(0, 0, 0, 0.1) !important;
}
.section {
  padding: 8%;
}
img {
  height: 100%;
}
ol {
  list-style-type: disc;
}
</style>
