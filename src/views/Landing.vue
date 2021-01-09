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
    <!--div class="knowledge-base-jumbotron">
      <div
        class=" aligncenter knowledge-base-jumbotron-content lg:p-32 md:p-24 sm:p-16 p-8 rounded-lg mb-base"
      >
        <h1 class="mb-2 text-white" style="font-size: 32px">
          Welcome To VideoWiki
        </h1>
        <p class="text-white" style="font-size: 16px">
          The Faster Way To Create Value Videos
        </p>
        <br /><br /><br /><br /><br />
        <vs-button size="large" @click="$router.push('/welcome')">
          Get Started
        </vs-button>
        <br /><br />
      </div>
    </div-->
    <div class="section flex bg-white">
      <div class="lg:w-1/2">
        <h1 class="text-7xl font-extrabold mb-8 mt-2">Welcome To VideoWiki</h1>
        <p class="text-2xl mb-10">
          Consider the tool as a "Video Wikipedia <br />for Learners and
          Creators
        </p>
        <vs-button type="filled" class="bg-custom text-base font-bold"
          >Create Videos</vs-button
        >
      </div>
      <div class="lg:w-1/2">
        <img src="@/assets/images/landing-page/Frame.png" />
      </div>
    </div>
    <div class="section flex">
      <!-- <h1 class="goals m-6 sm:inline-flex">Inspiration</h1> -->
      <!--vx-card class="m-0" title="About Us">
        <p>
          A collaborative platform for learners and educators to secure learning
          continuity in times of restrictions and beyond.
        </p>
        <br />
        <p>
          A simple tool for teachers to create teaching content without any
          advance knowledge of a tool or code. They create by using various
          media and graphics from the open stock libraries and merging it with
          their own content to keep it engaging and diverse.
          <br /><br /><strong>
            Consider the tool as a "Video Wikipedia for Learners and Creators".
          </strong>
        </p>
      </vx-card-->
      <div class="lg:w-1/2">
        <img src="@/assets/images/landing-page/svg.png" />
      </div>
      <div class="lg:w-1/2">
        <div class="w-3/4 mx-auto">
          <h1 class="text-4xl font-extrabold mb-8">About Us</h1>
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
          <vs-button type="filled" class="bg-custom text-base font-bold"
            >Learn More</vs-button
          >
        </div>
      </div>
    </div>
    <!--br />
    <vs-divider />
    <br /-->
    <div class="section bg-white">
      <!--vx-card class="m-0" title="Problem & Solution">
        <p>
          In the education system, more than 90% of students are impacted due to
          school and university closures. Learning has been disrupted due to the
          pandemic. There is a requirement for a new education model. The map is
          a depiction of countries that are experiencing lockdown in terms of a
          countrywide or a localized lockdown. The education sector is affected
          by these lockdowns. An estimate of 1.5 billion students have been
          affected worldwide due to the pandemic.
        </p>
        <br />
        <p>
          <strong>
            Solution: Online and immersive digitalization of Content,
            Curriculum, Coaching, and Classroom.
          </strong>
        </p>
        <br />
        <div class="vx-row">
          <div class="vx-col w-full sm:w-1/1 md:w-1/3 lg:w-1/3 xl:w-1/3">
            <statistics-card-line
              hideChart
              class="mb-base"
              icon="CpuIcon"
              icon-right
              statistic="Digitize"
              statisticTitle=""
            />
          </div>

          <div class="vx-col w-full sm:w-1/1 md:w-1/3 lg:w-1/3 xl:w-1/3">
            <statistics-card-line
              hideChart
              class="mb-base"
              icon="ServerIcon"
              icon-right
              statistic="Digitalize"
              statisticTitle=""
              color="success"
            />
          </div>

          <div class="vx-col w-full sm:w-1/1 md:w-1/3 lg:w-1/3 xl:w-1/3">
            <statistics-card-line
              hideChart
              class="mb-base"
              icon="ActivityIcon"
              icon-right
              statistic="Digitally Transform"
              statisticTitle=""
              color="danger"
            />
          </div>
        </div>

        <p>
          <br />The solution is to tackle the situation by providing the
          teachers with an assisted course creation tool to develop interactive
          media lessons for the students. This shift to virtual learning enables
          students to learn through this digitized media anytime and at any
          place. In this manner, the teachers, as well as students, can continue
          the education from a place of safety and protected environment of
          their homes.
        </p>
      </vx-card-->
      <h1 class="font-extrabold text-4xl mb-8">Problem &amp; Solution</h1>
      <p class="text-black text-base">
        In the education system, more than 90% of students are impacted due to
        school and university closures. Learning has been disrupted due to the
        pandemic. There is a requirement for a new education model. The map is a
        depiction of countries that are experiencing lockdown in terms of a
        countrywide or a localized lockdown. The education sector is affected by
        these lockdowns. An estimate of 1.5 billion students have been affected
        worldwide due to the pandemic.
      </p>
      <br />
      <p>
        <strong>
          Solution: Online and immersive digitalization of Content, Curriculum,
          Coaching, and Classroom.
        </strong>
      </p>
      <br />
      <div class="vx-row">
        <div class="vx-col w-full sm:w-1/1 md:w-1/3 lg:w-1/3 xl:w-1/3">
          <vx-card>
            <div slot="no-body" class="card-img">
              <img
                src="@/assets/images/landing-page/cpu.png"
                alt="content-img"
                class="card-img-top"
              />
            </div>
            <div class="text-center">
              <h5 class="mb-2 font-semibold text-xl mb-8">Digitize</h5>
              <p class="text-black">
                Open Enterprise supports best in sociocratic management.
              </p>
            </div>
          </vx-card>
        </div>

        <div class="vx-col w-full sm:w-1/1 md:w-1/3 lg:w-1/3 xl:w-1/3">
          <vx-card>
            <div slot="no-body" class="card-img">
              <img
                src="@/assets/images/landing-page/servers.png"
                alt="content-img"
                class="card-img-top"
              />
            </div>
            <div class="text-center">
              <h5 class="mb-2 font-semibold text-xl mb-8">Digitalize</h5>
              <p class="text-black">
                Open Enterprise supports best in sociocratic management.
              </p>
            </div>
          </vx-card>
        </div>
        <div class="vx-col w-full sm:w-1/1 md:w-1/3 lg:w-1/3 xl:w-1/3">
          <vx-card>
            <div slot="no-body" class="card-img">
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
              <p class="text-black">
                Open Enterprise supports best in sociocratic management.
              </p>
            </div>
          </vx-card>
        </div>
      </div>
    </div>
    <!--br />
    
    <br /-->
    <vs-divider class="m-0" />
    <div class="section flex bg-white">
      <!-- <h1 class="goals m-6 sm:inline-flex">Inspiration</h1> -->
      <!--vx-card class="m-0" title="Inspiration & Vision">
        <p>
          Theoretical knowledge online is what most universities have achieved,
          but practical training online so far seems unique. We are building
          tools to auto-generate (convert) text-based content to video-based
          online content with an extension towards gamification and immersive
          techniques for advanced pieces of training.
        </p>
        <br />
        <p>
          <strong> Vision To ensure learning continuity for all. </strong>
          <br />Standardized education and access to all with equal
          opportunities to educational processes.
        </p>
        <vx-list :list="list" class="mt-5"></vx-list>
      </vx-card-->
      <div class="lg:w-1/2">
        <h1 class="font-extrabold text-4xl mb-10">Insipiration &amp; Vision</h1>
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
        <vs-list class="flex justify-start">
          <vs-list-item
            v-for="(item, idx) in list"
            :key="idx"
            class="no-border font-medium"
          >
            <vs-icon
              icon-pack="feather"
              icon="icon icon-check-circle"
              color="rgb(230,73,128)"
              class="mr-5"
            />{{ item }}</vs-list-item
          >
        </vs-list>
      </div>
      <div class="lg:w-1/2">
        <img src="@/assets/images/landing-page/Frame2.png" />
      </div>
    </div>
    <div class="section bg-white">
      <div class="mb-10">
        <h2 class="font-extrabold text-4xl text-center mb-4">
          Prototype & Technology
        </h2>
        <p class="text-center font-medium">
          Rapidly developed, working, and ready for use.
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
        <!--vx-card class="m-0">
          <p>
            Using AI-based text classification methods, we can identify the
            context of the content and make queries to public video media
            libraries using APIs. These can be given back to the teachers as an
            assisted course creation tool to develop interactive digital media
            lessons for their students.
            <br />
            <br />
            <strong>
              We offer a tool for teachers. They copy-paste the content they
              want to convert to a video.
            </strong>
            <br />
            <br />
            • The AI uses 'sentence detection' algorithms to break the content
            into scenes or Short or Long intervals (As selected by teacher), the
            grammar and punctuation are checked by another AI process similar to
            the common spell-checker.
            <br />
            • Then another AI algorithm detects the important keywords from each
            scene. This tagging helps in identifying the context of the
            sentence/scene might be.
            <br />
            • Then we use the open media libraries to check stock videos around
            those tags and fetch the relevant clips to present back to the
            teacher to pick. (Until here, the only part the teacher/creator has
            done is paste the required content, rest all is done automatically.)
            <br />
            • Now the teacher can review the suggested scene sequence, the
            overlaying text and if everything is correct with prediction, then
            go ahead and stick the videos together preview and publish.
            <br />
            • If the teacher wants to add narration, or change text, or change
            video scenes, he would be able to do that and customize the course.
            <br /><br />
            We offer a method for students to participate in applied educational
            processes from their homes. Many technological mobile devices such
            as computers and tablets are widely used in homes. These tools are
            effective for students to be involved in applied training. For the
            K12 level or up to university students we build video solutions,
            using simple AI techniques and some APIs available openly (list
            available on request). We developed endpoints for these services for
            others to use and innovate their own solutions.
          </p>
        </vx-card-->
      </div>
    </div>
    <!--br />
    <vs-divider />
    <br /-->
    <div class="section flex bg-white">
      <!-- <h1 class="goals m-6 sm:inline-flex">Inspiration</h1> -->
      <!--vx-card
        class="m-0"
        title="Goals: Project goals and alignment with the SDGs"
      -->
      <div class="lg:w-1/2">
        <h1 class="font-extrabold text-4xl mb-6">
          Project goals and <br />
          alignment with the SGDs
        </h1>
        <p class="lg:w-3/4 text-left font-medium mb-10">
          The importance of education is highlighted in SDG 4 (“Ensure inclusive
          and equitable quality education and promote lifelong learning
          opportunities for all”). This goal encompasses various dimensions that
          are critical to supporting young workers’ transition into the labor
          market and career progression. <br /><br />
          <strong> Target 4.3: </strong> “By 2030, ensure equal access for all
          women and men to affordable quality technical, vocational and tertiary
          education, including university.” <br /><br />
          <strong> Target 4.4: </strong> “By 2030, substantially increase the
          number of youth and adults who have relevant skills, including
          technical and vocational skills, for employment, decent jobs and
          entrepreneurship.” <br /><br />
          The main goal of the project is to create an impressive easy-to-use
          website. The marketing of this site will emphasize its educational
          value for students, teachers, companies that provide educational
          services. A feature of the website and pages on social networks will
          be the presence of a chatbot to improve navigation, technical support,
          and collect feedback and suggestions from learners.
        </p>
      </div>
    </div>
    <br />
    <vs-divider />
    <section class="boxes-area">
        <div class="container">
          <div class="row">
            <div class="col-lg-3 col-md-6 col-sm-6">
              <div class="single-box">
                <<div class="icon">
                  <feather type="server"></feather>
                </div>>
                <h3>Enable Learning</h3>
                <p>Content platform for semi-automated content creation.</p>
              </div>
            </div>

            <div class="col-lg-3 col-md-6 col-sm-6">
              <div class="single-box">
                <h3>Enable Conversations</h3>
                <p>Add sharing, feedback and communication options.</p>
              </div>
            </div>

            <div class="col-lg-3 col-md-6 col-sm-6">
              <div class="single-box">
                <h3>Engagement with extensions</h3>
                <p>
                  Adding gamification capabilities with new sensors for advances
                  sciences
                </p>
              </div>
            </div>

            <div class="col-lg-3 col-md-6 col-sm-6">
              <div class="single-box bg-f78acb">
                <h3>Standarize curriculums</h3>
                <p>
                  Bring the global learning at a relatively more standarized
                  norm.
                </p>
              </div>
            </div>

            <div class="col-lg-3 col-md-6 col-sm-6">
              <div class="single-box bg-c679e3">
                <h3>Reduce inequalities</h3>
                <p>
                  Reduce global inequalities on access to education and
                  qualification gaps.
                </p>
              </div>
            </div>

            <div class="col-lg-3 col-md-6 col-sm-6">
              <div class="single-box bg-eb6b3d">
                <h3>Immersive ecosystem</h3>
                <p>
                  One world education and immersive with equal opportunities for
                  all.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    <section class="team-area ptb-80 bg-f9f6f6">
      <div class="container">
        <div class="section-title">
          <h2>Our Awesome Team</h2>
          <div class="bar1"></div>
        </div>
      </div>

      <div class="team-slides">
        <carousel
          :items="5"
          :autoplay="true"
          :loop="true"
          :autoplaySpeed="true"
          :autoplayTimeout="5000"
          :perPageCustom="[
            [0, 1],
            [576, 2],
            [768, 2],
            [1200, 4],
            [1500, 5],
          ]"
        >
          <slide>
            <div class="single-team">
              <div class="team-image">
                <img
                  src="../assets/images/landing-page/1.jpg"
                  alt="image"
                  width="100"
                  height="100"
                />
              </div>
              <div class="team-content">
                <div class="team-info">
                  <h3>Nataliia Rheskava</h3>
                  <span>Co-Founder / CIO</span>
                </div>

                <p>
                  PhD in Learning and Pedagogy. An expert in Neuropedagogy and
                  AI working on the subjects of cognitive future for students
                  while supporting teachers at university level.
                  <br /><br /><br /><br />
                </p>
              </div>
            </div>
          </slide>

          <slide>
            <div class="single-team">
              <div class="team-image">
                <img
                  src="../assets/images/landing-page/1.jpg"
                  alt="image"
                  width="100"
                  height="100"
                />
              </div>
              <div class="team-content">
                <div class="team-info">
                  <h3>Shivam Dhawan</h3>
                  <span>Co-Founder / CTO</span>
                </div>

    <!--<ul>
                <li><a href="#"><feather type="facebook"></feather></a></li>
                <li><a href="#"><feather type="twitter"></feather></a></li>
                <li><a href="#"><feather type="linkedin"></feather></a></li>
                <li><a href="#"><feather type="gitlab"></feather></a></li>
                </ul-->

    <p>
                  Tech Entrepreneur. Strategy and Analytics background.
                  Technology evangelist and business strategy.
                  <br /><br /><br /><br /><br /><br />
                </p>
              </div>
            </div>
          </slide>

          <slide>
            <div class="single-team">
              <div class="team-image">
                <img
                  src="../assets/images/landing-page/1.jpg"
                  alt="image"
                  width="100"
                  height="100"
                />
              </div>
              <div class="team-content">
                <div class="team-info">
                  <h3>Rui Couto</h3>
                  <span>Chief Accessibility Officer</span>
                </div>
                <p>
                  20 years of experience in SAP Consulting, the largest business
                  information systems software. Worked with complex project
                  across many industries and service provider companies.
                  Business information systems consultant. World Parkinson
                  Congress Ambassador.
                </p>
              </div>
            </div>
          </slide>

          <slide>
            <div class="single-team">
              <div class="team-image">
                <img
                  src="../assets/images/landing-page/1.jpg"
                  alt="image"
                  width="100"
                  height="100"
                />
              </div>
              <div class="team-content">
                <div class="team-info">
                  <h3>Sumit Rathore</h3>
                  <span>C.AI.O</span>
                </div>
                <p>
                  Artificial intelligence and machine learning expert.
                  Technologist and product strategy.
                  <br /><br /><br /><br /><br /><br />
                </p>
              </div>
            </div>
          </slide>

          <slide>
            <div class="single-team">
              <div class="team-image">
                <img
                  src="../assets/images/landing-page/1.jpg"
                  alt="image"
                  width="100"
                  height="100"
                />
              </div>
              <div class="team-content">
                <div class="team-info">
                  <h3>Sourav Ahuja</h3>
                  <span>Full Stack Web Developer</span>
                </div>
                <p>
                  Computer Science Engineer, Full Stack Developer and an
                  Aspiring Tech Enthusiast. I like conducting events and leading
                  the teams. I have held positions of responsibility in many
                  societies and clubs.
                  <br /><br /><br />
                </p>
              </div>
            </div>
          </slide>

          <slide>
            <div class="single-team">
              <div class="team-image">
                <img
                  src="../assets/images/landing-page/1.jpg"
                  alt="image"
                  width="100"
                  height="100"
                />
              </div>
              <div class="team-content">
                <div class="team-info">
                  <h3>Sunidhi Singh</h3>
                  <span>Blockchain Developer</span>
                </div>
                <p>
                  Blockchain Analyst with a history of working in the e-learning
                  industry. Skilled in C++, Python, and Solidity. Strong
                  operations professional with a Bachelor of Technology focused
                  in B tech from Bharati Vidyapeeth's College Of Engineering.
                  <br /><br />
                </p>
              </div>
            </div>
          </slide>

          <slide>
            <div class="single-team">
              <div class="team-image">
                <img
                  src="../assets/images/landing-page/1.jpg"
                  alt="image"
                  width="100"
                  height="100"
                />
              </div>
              <div class="team-content">
                <div class="team-info">
                  <h3>Prabuddh Kumar Ashok</h3>
                  <span>Blockchain Developer</span>
                </div>
                <p>
                  A keen enthusiast of Sustainability of nature, education, and
                  people's lifestyles. Believer in the vision of bettering
                  people's lives and providing value. Interests lie in
                  Technology, Finance, and Management domains.
                </p>
              </div>
            </div>
          </slide>
          <slide>
            <div class="single-team">
              <div class="team-image">
                <img
                  src="../assets/images/landing-page/1.jpg"
                  alt="image"
                  width="100"
                  height="100"
                />
              </div>
              <div class="team-content">
                <div class="team-info">
                  <h3>Abhishek Manjunath</h3>
                  <span>Blockchain Developer</span>
                </div>
                <p>
                  Aspiring to change the world sustainably with the
                  implementation of Blockchain and Embedded Systems.I’ve worked
                  with International organisations that promote cultural
                  exchanges.
                  <br /><br /><br />
                </p>
              </div>
            </div>
          </slide>
          <slide>
            <div class="single-team">
              <div class="team-image">
                <img
                  src="../assets/images/landing-page/1.jpg"
                  alt="image"
                  width="100"
                  height="100"
                />
              </div>
              <div class="team-content">
                <div class="team-info">
                  <h3>Ruthvika Mohan</h3>
                  <span>Backend Developer</span>
                </div>
                <p>
                  I am motivated to taking up positions of responsibilities and
                  executing challenging strategic plans with an eye for detail.
                  My vision is to look out for experiences that add value to my
                  being.
                  <br /><br /><br />
                </p>
              </div>
            </div>
          </slide>

    <!-- <slide>
            <div class="single-team">
              <div class="team-image">
                <img
                  src="../assets/images/landing-page/1.jpg"
                  alt="image"
                  width="100"
                  height="100"
                />
              </div>
              <div class="team-content">
                <div class="team-info">
                  <h3>Alex Maxwel</h3>
                  <span>Marketing Manager</span>
                </div>
                <p>
                  Risus commodo viverra maecenas accumsan lacus vel facilisis
                  quis ipsum.
                  <br /><br /><br /><br /><br /><br /><br />
                </p>
              </div>
            </div>
          </slide> -->
    </carousel>
    </div>
    </section>
    <vs-divider />
    <vs-divider />

    <div>
      <div class="section-title">
        <br />
        <h2>Impact</h2>
        <div class="bar1"></div>
      </div>
      <div class="aligncenter">
        <img
          src="../assets/images/landing-page/impact.png"
          alt="impact"
          width="80%"
        />
      </div>
    </div>
    <vs-divider />

    <div>
      <div class="section-title">
        <br />
        <h2>Market Shift: Traditional to Transformed Education</h2>
        <p class="inline-flex" style="font-size: 16px; color: blue">
          Traditional to Transformed Education
        </p>
        <div class="bar1"></div>
      </div>
      <carousel
        :items="5"
        :autoplay="true"
        :loop="true"
        :autoplaySpeed="true"
        :autoplayTimeout="5000"
        :perPageCustom="[[0, 1]]"
      >
        <slide>
          <div class="aligncenter">
            <img
              src="../assets/images/landing-page/shift2.png"
              alt="shift"
              width="80%"
            />
          </div>
        </slide>
        <slide>
          <div class="aligncenter">
            <img
              src="../assets/images/landing-page/shift.png"
              alt="shift"
              width="80%"
            />
          </div>
        </slide>
      </carousel>
    </div>
    <vs-divider />
    <br />
    <div>
    <!-- <h1 class="goals m-6 sm:inline-flex">Inspiration</h1> -->
    <vx-card class="m-0" title="Key Partners & Mentors">
        <vx-list :list="list1" class="mt-0"></vx-list>
        <p class="mt-2">
          <strong> Partners </strong>
        </p>
        <vx-list :list="list2" class="mt-2"></vx-list>
        <p class="mt-2">
          <strong> Mentors </strong>
        </p>
        <vx-list :list="list3" class="mt-2"></vx-list>
      </vx-card>
    </div>
    <footer class="footer-area">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 col-md-12">
            <div class="copyright-area">
              <p>Copyright &copy;2020 VideoWiki. All Rights Reserved</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import StatisticsCardLine from './statistics-cards/StatisticsCardLine.vue';
import { Carousel, Slide } from 'vue-carousel';
import TheFooter from '../layouts/components/footer/TheFooter';

export default {
  data() {
    return {
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
        'El observatorio del trabajo',
      ],
      list2: [
        'Martin Sutherland: CEO, Peopletree Group',
        'Emria Saharkhiz, CEO Treejer (Blockchain based reforestation solution) for Blockchain',
        'Sumit rathore, CEO Arbunize Digital Media for AI solutions',
      ],
      list3: [
        'Michael Liu, on the Board of OceanX exchange (one of Top 100 crypto exchanges in the world by volume.)',
        'Isidro Laso, Cabinet Expert at Commissioner Gabriel cabinet for Innovation, Research, Education, Culture and Youth. at European Commission.',
        'Michael Brodie, Founder of OurNet',
      ],
      list4: [
        {
          title: 'Enable Learning',
          description: 'Content platform for semi-automated content creation.',
          closed: true,
        },
        {
          title: 'Enable Conversations',
          description: 'Add sharing, feedback and communication options.',
          closed: true,
        },
        {
          title: 'Engagement with extensions',
          description:
            'Adding gamification capabilities with new sensors for advances sciences',
          closed: true,
        },
        {
          title: 'Standarize curriculums',
          description:
            'Bring the global learning at a relatively more standarized norm',
          closed: true,
        },
        {
          title: 'Reduce inequalities',
          description:
            'Reduce global inequalities on access to education and qualification gaps.',
          closed: true,
        },
        {
          title: 'Immersive ecosystem',
          description:
            'One world education and immersive with equal opportunities for all.',
          closed: true,
        },
      ],
      steps: [
        {
          number: '1',
          text: `Digital Automated Content Platform that teachers use to create engaging learning content using Video's`,
        },
        {
          number: '2',
          text: `Students get the digital lectures, courses for self-paced, yet guided virtual coaching`,
        },
        {
          number: '3',
          text: `Anyone can clone content and create more learning material from previous creators`,
        },
        {
          number: '4',
          text: `Public knowledge is free, you pay for private. The private revenues are shared back to free contributors`,
        },
        {
          number: '5',
          text: 'Your all good to go start larning',
        },
      ],
    };
  },
  components: {
    //StatisticsCardLine,
    //Carousel,
    //Slide,
    TheFooter,
  },
};
</script>

<style scoped>
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
  /*padding: 3rem 9rem 3rem 9rem;*/
}
.card-img {
  display: flex;
  justify-content: center;
  padding: 2rem;
}
.timeline-icon {
  margin-left: -12px;
  float: left;
}
.timeline-icon-last {
  margin-bottom: -7px;
}
.last-step {
  border-left: 1px solid #f7f7f7;
  margin-left: -1px;
}
.vx-timeline {
  border-left: 1px dashed rgba(230, 73, 128, 0.7);
}
.on-right {
  margin-left: 10%;
}
.on-left {
  margin-left: -85%;
}
.set-height {
  min-height: 545px;
}
/*Section Title*/
.section-title {
  text-align: center;
  margin-bottom: 30px;
}
.section-title h2 {
  margin-bottom: 0;
  text-transform: capitalize;
  font-size: 28px;
  font-weight: 600;
}
.section-title p {
  max-width: 520px;
  margin: 0 auto;
}
.section-title .bar {
  height: 5px;
  width: 90px;
  background: #cdf1d8;
  margin: 20px auto;
  position: relative;
  border-radius: 30px;
}
.section-title .bar1 {
  height: 5px;
  width: 90px;
  background: #cdf1d8;
  margin: 20px auto;
  position: relative;
  border-radius: 30px;
}
.section-title .bar::before {
  content: '';
  position: absolute;
  left: 0;
  top: -2.7px;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background: #44ce6f;
  -webkit-animation-duration: 3s;
  animation-duration: 3s;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -webkit-animation-name: MOVE-BG;
  animation-name: MOVE-BG;
}
.section-title .sub-title {
  display: inline-block;
  color: #c679e3;
  background-color: #f5dffd;
  margin-bottom: 18px;
  border-radius: 30px;
  padding: 5px 20px 4px;
  font-size: 13px;
}
@-webkit-keyframes MOVE-BG {
  from {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
  to {
    -webkit-transform: translateX(88px);
    transform: translateX(88px);
  }
}
@keyframes MOVE-BG {
  from {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
  to {
    -webkit-transform: translateX(88px);
    transform: translateX(88px);
  }
}
.goals {
  align-content: center;
}
.boxes-area {
  position: relative;
  /* padding-bottom: 80px; */
  /* margin-top: -130px; */
  z-index: 1;
}
.single-box {
  border: 1px dashed #cdf1d8;
  padding: 30px 20px;
  position: relative;
  z-index: 1;
  border-radius: 5px;
  background: #ffffff;
  -webkit-box-shadow: 0 0 10px rgba(72, 69, 224, 0.1);
  box-shadow: 0 0 10px rgba(72, 69, 224, 0.1);
  -webkit-transition: 0.5s;
  transition: 0.5s;
}
.single-box .icon {
  display: inline-block;
  text-align: center;
  width: 55px;
  height: 55px;
  line-height: 70px;
  background: #cdf1d8;
  border-radius: 50%;
  color: #44ce6f;
  -webkit-transition: 0.5s;
  transition: 0.5s;
}
.single-box h3 {
  font-size: 18px;
  margin-top: 25px;
  margin-bottom: 15px;
  -webkit-transition: 0.5s;
  transition: 0.5s;
}
.single-box::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  border-radius: 5px;
  height: 100%;
  background: linear-gradient(135deg, #23bdb8 0%, #43e794 100%);
  z-index: -1;
  opacity: 0;
  visibility: hidden;
  -webkit-transition: 0.5s;
  transition: 0.5s;
}
.single-box p {
  -webkit-transition: 0.5s;
  transition: 0.5s;
}
.single-box.bg-f78acb {
  border-color: rgba(247, 138, 203, 0.3);
}
.single-box.bg-f78acb .icon {
  color: #f78acb;
  background: rgba(247, 138, 203, 0.3);
}
.single-box.bg-c679e3 {
  border-color: #edc3fc;
}
.single-box.bg-c679e3 .icon {
  color: #c679e3;
  background: #edc3fc;
}
.single-box.bg-eb6b3d {
  border-color: rgba(235, 107, 61, 0.3);
}
.single-box.bg-eb6b3d .icon {
  color: #eb6b3d;
  background: rgba(235, 107, 61, 0.3);
}
.single-box:hover {
  -webkit-transform: translateY(-9px);
  transform: translateY(-9px);
  border-color: transparent;
}
.single-box:hover::before {
  opacity: 1;
  visibility: visible;
}
.single-box:hover .icon {
  background: #ffffff;
  color: #44ce6f;
}
.single-box:hover h3 {
  color: #ffffff;
}
.single-box:hover p {
  color: #ffffff;
}
.single-box:hover.bg-f78acb .icon {
  color: #f78acb;
}

.single-box:hover.bg-c679e3 .icon {
  color: #c679e3;
}

.single-box:hover.bg-eb6b3d .icon {
  color: #eb6b3d;
}

.team-area {
  padding-bottom: 50px;
}
.team-area .owl-dots {
  margin-bottom: 30px;
}

.single-team {
  background: #ffffff;
  padding-top: 35px;
  padding-bottom: 35px;
  margin-bottom: 30px;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  z-index: 1;
  text-align: center;
}

.single-team .team-image {
  position: relative;
  z-index: 1;
  padding-left: 35px;
  padding-right: 35px;
}

.single-team .team-image img {
  border: 3px solid #cdf1d8;
  width: auto !important;
  border-radius: 50%;
  display: inline-block !important;
  -webkit-transition: 0.5s;
  transition: 0.5s;
}

.single-team .team-image::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  background: #f9f6f6;
  height: 10px;
  width: 100%;
  z-index: -1;
  -webkit-transition: 0.5s;
  transition: 0.5s;
}

.single-team .team-content {
  padding-left: 35px;
  padding-right: 35px;
}

.single-team .team-content ul {
  padding: 0;
  margin: 0;
  list-style-type: none;
}

.single-team .team-content ul li {
  display: inline-block;
  margin: 0 5px;
}

.single-team .team-content ul li a {
  color: #c679e3;
}

.single-team .team-content ul li a:hover {
  -webkit-transform: translateY(-5px);
  transform: translateY(-5px);
  color: #44ce6f;
}

.single-team .team-content ul li a svg {
  width: 19px;
}

.single-team .team-content p {
  margin-top: 20px;
  margin-bottom: 0;
}

.single-team .team-info {
  background: linear-gradient(135deg, #23bdb8 0%, #43e794 100%);
  background: red;
  padding: 10px 15px;
  border-radius: 75px;
  margin-bottom: 25px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 25px;
  -webkit-transition: 0.5s;
  transition: 0.5s;
}

.single-team .team-info h3 {
  font-size: 18px;
  margin-bottom: 5px;
  color: #ffffff;
}

.single-team .team-info span {
  color: #ffffff;
  font-size: 13px;
}

.single-team:hover {
  -webkit-box-shadow: 0 2px 48px 0 rgba(0, 0, 0, 0.08);
  box-shadow: 0 2px 48px 0 rgba(0, 0, 0, 0.08);
}

.single-team:hover .team-image::before {
  height: 0;
}

.single-team:hover .team-image img {
  border-color: #44ce6f;
}

.single-team:hover .team-info {
  margin-left: 0;
  margin-right: 0;
  border-radius: 0;
}
.team-area {
  padding-bottom: 20px;
}
.single-team {
  padding-top: 30px;
  padding-bottom: 30px;
}
.single-team .team-image {
  padding-left: 20px;
  padding-right: 20px;
}
.single-team .team-content {
  padding-left: 20px;
  padding-right: 20px;
}
.single-team .team-content .team-info {
  margin-right: 10px;
  margin-left: 10px;
}
.single-team .team-content .team-info h3 {
  font-size: 17px;
}
.ptb-80 {
  padding-top: 50px;
  padding-bottom: 50px;
}
/* Footer CSS */
.footer-area {
  position: relative;
  z-index: 1;
  /* padding-top: 80px; */
}

.copyright-area {
  margin-top: 80px;
  padding-top: 25px;
  padding-bottom: 25px;
  border-top: 1px solid #d8ebfd;
  text-align: center;
}
</style>
