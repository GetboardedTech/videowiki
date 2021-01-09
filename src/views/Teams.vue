<template>
  <div>
    <div class="section bg-white">
      <div class="text-center mb-20">
        <h1 class="font-extrabold text-4xl mb-4">Dedicated Team</h1>
        <p class="font-medium mb-base">
          The passionate people behind this initiative
        </p>
      </div>
      <div class="vx-row">
        <div
          class="vx-col w-full mx-auto md:w-1/3 lg:w-1/4 sm:w-1/2 mb-base"
          v-for="(member, idx) in getTeamList"
          :key="idx"
        >
          <div class="flex flex-wrap">
            <MemberCard :member="member" />
          </div>
        </div>
      </div>
    </div>

    <div>
      <Map :memberList="getTeamList" />
    </div>

    <div class="section bg-white">
      <div class="w-full">
        <div class="vx-card" style="height: 100%">
          <div class="vx-card__collapsible-content vs-con-loading__container">
            <div class="vx-card__body flex flex-wrap justify-between">
              <div class="mb-6 w-full">
                <h3 class="mb-6 lg:text-left text-center">
                  Join Our Volunteer Team
                </h3>
                <div class="vx-row -m-2">
                  <div class="vx-col w-1/2 p-2">
                    <h6 class="mb-4">
                      Full Name<span class="text-danger">*</span>
                    </h6>
                    <!--input
                      class="w-full base-input"
                      type="text"
                      placeholder="Enter your full name.."
                    /-->
                    <vs-input
                      placeholder="Enter your FullName"
                      v-model="fullName"
                      class="w-full"
                    />
                  </div>
                  <div class="vx-col w-1/2 p-2">
                    <h6 class="mb-4">
                      Email<span class="text-danger">*</span>
                    </h6>
                    <!--input
                      class="w-full base-input"
                      type="Email"
                      placeholder="Enter your email.."
                    /-->
                    <vs-input
                      class="w-full"
                      type="email"
                      v-model="email"
                      placeholder="Enter your Email"
                    />
                  </div>
                  <div class="vx-col w-1/2 p-2">
                    <h6 class="mb-4">
                      Contact<span class="text-danger">*</span>
                    </h6>
                    <!--input
                      class="w-full base-input"
                      type="Email"
                      placeholder="Enter your mobile number.."
                    /-->
                    <vs-input
                      class="w-full"
                      type="tel"
                      pattern="[0-9]{10}"
                      maxLength="10"
                      v-model="mob"
                      placeholder="Enter your Mobile Number"
                    />
                  </div>
                  <div class="vx-col w-1/2 p-2">
                    <h6 class="mb-4">
                      Resume<span class="text-danger">*</span>
                    </h6>
                    <vx-input-group class="mb-base">
                      <vs-input
                        placeholder="resume.pdf"
                        :value="selectedFile.name"
                        disabled
                      />
                      <input
                        type="file"
                        class="hidden"
                        ref="FileInput"
                        accept=".pdf"
                        @change="selectFile"
                      />
                      <template slot="append">
                        <div class="append-text btn-addon">
                          <vs-button
                            class="bg-custom-purple"
                            @click="$refs.FileInput.click()"
                            >Choose File</vs-button
                          >
                        </div>
                      </template>
                    </vx-input-group>
                  </div>
                </div>
                <div class="vx-row mb-6">
                  <div class="vx-col w-full">
                    <h6 class="mb-4">Short Description About You</h6>
                    <textarea
                      class="message-box"
                      v-model="description"
                      placeholder="Enter your message here.."
                    />
                  </div>
                </div>
                <div class="text-center">
                  <vs-button
                    type="filled"
                    class="font-bold text-base bg-custom-purple"
                    >Submit</vs-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <NewsLetter />
    </div>
  </div>
</template>
<script>
import Map from './components/Map';
import NewsLetter from './components/NewsLetter';
import { teamList } from './components/localDb';
import MemberCard from './components/MemberCard';
export default {
  name: 'Teams',
  components: {
    Map,
    NewsLetter,
    MemberCard,
  },
  data() {
    return {
      fullName: '',
      email: '',
      mob: '',
      description: '',
      selectedFile: '',
    };
  },
  computed: {
    getTeamList() {
      return teamList;
    }
  },
  methods: {
    selectFile(event) {
      this.selectedFile = event.target.files[0];
    },
  },
};
</script>

<style scoped>
.section {
  padding: 8%;
}

.message-box {
  height: 250px !important;
  /* border: none; */
  /* background: #f3f4f6; */
  border-color: rgba(0, 0, 0, 0.2);
  font-size: 12px !important;
  overflow-y: auto;
  border-radius: 6px;
  color: #626262;
  width: 100%;
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
.base-input {
  height: 45px;
  background: #f3f4f6;
  border-radius: 6px;
  border: none;
  padding: 1rem;
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  font-weight: normal;
  font-size: 12px;
}
.address-box {
  background: #f4f5f7;
  border-radius: 8px;
}
</style>
