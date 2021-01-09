<template>
  <div>
    <div class="bg-white awards-container">
      <div class="flex items-center mb-base">
        <div class="w-full lg:w-1/2">
          <h1 class="text-custom-black font-extrabold text-4xl mb-base">
            #EUvsVirus Hackathon Challenge Winner
          </h1>
          <p class="text-custom-purple mb-base">- Project conceptualization</p>
          <p class="text-black">
            The European Commission launched #EUvsVirus hackathon, a non-profit
            online hackathon to connect civil society,innovators, partners and
            buyers across Europe to develop innovative solutions to overcome
            coronavirus-related challenges. It is also the largest hackathon of
            the world. VideoWiki (“Video Wikipedia for Learners and Creators”)
            was one to the winning projects in the hackathon and is supported by
            the EUA members. It is a simple tool to create teaching content
            without any additional skills needed from the teacher’s side. It
            also targets today's created easily available and
            censorship-resistant content for everyone.
          </p>
        </div>
        <div class="hidden lg:w-2/5 lg:block mx-auto">
          <img src="@/assets/images/pages/awards1.svg" />
        </div>
        <!-------IMAGE---------------->
      </div>

      <!----------------------------------------------------------------------->

      <div class="flex items-center mb-24">
        <div class="hidden lg:w-1/2 lg:block mr-4">
          <img
            src="@/assets/images/pages/awards2.svg"
            class="h-full max-w-full block mx-auto"
          />
        </div>
        <!-------IMAGE---------------->
        <div class="w-full lg:w-1/2">
          <h1 class="text-custom-black font-extrabold text-4xl mb-base">
            #HackBack Overall Winner 2020
          </h1>
          <p class="text-custom-purple mb-base">
            - UX definitions and first prize
          </p>
          <p class="text-black mb-base">
            #HackBack, an online hackathon organised by What The Hack aims to
            address the needs of small to medium enterprises (SMEs) and startups
            during the recovery from Covid-19 crisis.
          </p>
          <p class="text-black">
            Besides securing the first prize in hackBack 2020, it has also been
            awarded for the user-friendly UX. VideoWiki platform is made keeping
            simplicity and ease of use in mind. It ensures continuous content
            consumption without any form of distraction or disturbance. The UI
            provides every needed tool in a simple step-by-step workflow which
            makes content-creation and consumption easy and effective.
          </p>
        </div>
      </div>

      <!----------------------------------------------------------------------->

      <div class="mb-10">
        <h2 class="font-extrabold text-4xl text-center mb-4">
          News & Media Coverage
        </h2>
        <p class="text-center font-medium">
          Rapidly developed, working, and ready for use.
        </p>
      </div>
      <div class="grid-container">
        <div class="vx-card h-full overflow-hidden grid-item">
          <div
            slot="no-body"
            class="bg-card-1 flex items-center justify-center inner-grid-item"
          >
            <img
              src="@/assets/images/pages/awards3.svg"
              alt="Not Found"
              width="220px"
            />
          </div>
          <div class="card-body">
            <p class="mb-2 text-base font-semibold">
              #EUvsVIRUS hackathon results: bringing solutions to Covid-19
              challenges to the next level
            </p>
            <p class="mb-2 text-base">
              VideoWiki: defined as a "Video Wikipedia for Learners and
              Creators", this simple tool helps teachers create teaching content
              without any advance knowledge of a tool or code.
            </p>
            <vs-button
              :href="
                `https://www.eua.eu/partners-news/519-euvsvirus-hackathon-results-bringing-solutions-to-covid-19-challenges-to-the-next-level.html?utm_source=social&utm_medium=LinkedIn&utm_name=LinkedIn-social-10-6-2020`
              "
              target="_blank"
              type="filled"
              >Read More</vs-button
            >
          </div>
        </div>
        <div class="vx-card h-full overflow-hidden grid-item">
          <div
            slot="no-body"
            class="bg-card-2 flex items-center justify-center inner-grid-item"
          >
            <img
              src="@/assets/images/pages/awards4.svg"
              alt="Not Found"
              width="220px"
            />
          </div>
          <div class="card-body">
            <p class="mb-2 text-base font-semibold">
              VideoWiki "Video Wikipedia for Learners and Creators
            </p>
            <p class="mb-2 text-base">
              We offer a tool for teachers. They copy-paste the content they
              want to convert to a video.A collaborative platform for learners
              and educators to secure learning continuity in times of
              restrictions and beyond.
            </p>
            <vs-button
              :href="
                `https://hundred.org/en/innovations/videowiki-video-wikipedia-for-learners-and-creators`
              "
              target="_blank"
              type="filled"
              >Read More</vs-button
            >
          </div>
        </div>
        <div class="vx-card h-full overflow-hidden grid-item">
          <div
            slot="no-body"
            class="bg-card-3 flex items-center justify-center"
          >
            <img
              src="@/assets/images/pages/awards5.svg"
              alt="Not Found"
              width="220px"
            />
          </div>
          <div class="card-body">
            <p class="mb-2 text-base font-semibold">
              Remote Working & Education - E-Learning methods & tools
            </p>
            <p class="mb-2 text-base">
              A collaborative platform for learners and educators to secure
              learning continuity in times of restrictions and beyond. A simple
              tool for teachers to create teaching content without any advance
              knowledge of a tool or code.
            </p>
            <vs-button
              :href="`https://covid-eic.easme-web.eu/solution/videowiki/about`"
              target="_blank"
              type="filled"
              >Read More</vs-button
            >
          </div>
        </div>
        <div class="vx-card h-full overflow-hidden grid-item">
          <div
            slot="no-body"
            class="bg-card-4 flex items-center justify-center"
          >
            <img
              src="@/assets/images/pages/awards6.svg"
              alt="Not Found"
              width="220px"
            />
          </div>
          <div class="card-body">
            <p class="mb-2 text-base font-semibold">
              UA Incubator Startup creates award-winning automatic content
              scanning project
            </p>
            <p class="mb-2 text-base">
              The VideoWiki - Video Wikipedia for Learners and Creators project
              consists of a platform that allows the automatic conversion of
              teaching content into appealing digital media.
            </p>
            <vs-button
              :href="`https://www.ua.pt/en/news/16/63381`"
              target="_blank"
              type="filled"
              >Read More</vs-button
            >
          </div>
        </div>
        <div class="vx-card h-full overflow-hidden grid-item">
          <div
            slot="no-body"
            class="bg-card-6 flex items-center justify-center inner-grid-item"
          >
            <img
              src="@/assets/images/pages/awards8.svg"
              alt="Not Found"
              width="220px"
            />
          </div>
          <div class="card-body">
            <p class="mb-2 text-base font-semibold">
              Sustainable education through digital learning spaces
            </p>
            <p class="mb-2 text-base">
              VideoWiki is a AI teaching assistant tool that quickly creates
              teaching courses to video format that can be shared online while
              streaming or sharing. The solution is to tackle the situation by
              providing the teachers with an assisted course creation tool to
              develop interactive media lessons for the students.
            </p>
            <vs-button
              type="filled"
              :href="`https://digieduhack.com/en/solutions/videowiki`"
              target="_blank"
              >Read More</vs-button
            >
          </div>
        </div>
        <div class="vx-card h-full overflow-hidden grid-item">
          <div
            slot="no-body"
            class="bg-card-5 flex items-center justify-center inner-grid-item"
          >
            <img
              src="@/assets/images/pages/awards7.svg"
              alt="Not Found"
              width="220px"
            />
          </div>
          <div class="card-body">
            <p class="mb-2 text-base font-semibold">
              Remote Working & Education - E-Learning methods & tools
            </p>
            <p class="mb-2 text-base">
              A collaborative platform for learners and educators to secure
              learning continuity in times of restrictions and beyond. A simple
              tool for teachers to create teaching content without any advance
              knowledge of a tool or code.
            </p>
            <vs-button
              :href="`https://www.euvsvirus.org/finalreport.pdf`"
              target="_blank"
              type="filled"
              >Read More</vs-button
            >
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
import NewsLetter from './components/NewsLetter';
export default {
  name: 'Awards',
  components: {
    NewsLetter
  }
};
</script>
<style scoped>
.awards-container {
  padding: 8%;
}
.section {
  padding: 8%;
}
.grid-container .grid-item .card-body {
  padding: 8%;
}
.bg-card-1 {
  background: linear-gradient(180deg, #00b3ec 0%, #00b3ec 100%);
}
.bg-card-2 {
  background: #99139b;
}
.bg-card-3 {
  background: #f8a629;
}
.bg-card-4 {
  background: #000000;
}
.bg-card-5 {
  background: #3432ab;
}
.bg-card-6 {
  background: #e04e82;
}
.grid-container {
  position: relative;
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-template-rows: minmax(300px, auto);
  grid-gap: 10px;
}
.grid-container .grid-item {
  display: grid;
  grid-auto-flow: dense;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-template-rows: minmax(300px, auto);
}

@media only screen and (min-width: 1100px) {
  .grid-container .grid-item:nth-child(2) .inner-grid-item {
    grid-column-start: 2;
  }
  .grid-container .grid-item:nth-child(6) .inner-grid-item {
    grid-column-start: 2;
  }
  .grid-container .grid-item:nth-child(1) {
    grid-row: span 2;
  }
  .grid-container .grid-item:nth-child(2) {
    grid-column: span 2;
  }
  .grid-container .grid-item:nth-child(3) {
    grid-column: span 2;
  }
  .grid-container .grid-item:nth-child(4) {
    grid-column: span 2;
  }
  .grid-container .grid-item:nth-child(6) {
    grid-column: span 2;
  }
  .grid-container .grid-item:nth-child(5) {
    grid-row: span 2;
  }
}
</style>
