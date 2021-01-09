<template>
  <div>
    <div class="section flex bg-white">
      <div class="lg:w-1/2 w-full">
        <div class="lg:w-4/5 lg:mx-auto">
          <h1 class="lg:text-4xl font-extrabold mb-8 lg:text-left text-center">
            Video conferencing tools don’t work for students
          </h1>
          <p class="text-base font-medium mb-10 text-left">
            The present-day has witnessed teachers using video conferencing
            tools for conducting online classes. But at the same time, there are
            numerous examples and even some personal experiences of students
            falling asleep during online classes.

            <br /><br /><br />
            Teachers and parents blame it on students but we see it as a fault
            in the mechanism of teaching. Using video conferencing tools for
            Online Class is like using a hammer to put in a screw.
          </p>
        </div>
      </div>
      <div class="lg:w-1/2 hidden lg:flex justify-center">
        <img src="@/assets/images/landing-page/Frame4.svg" />
      </div>
    </div>

    <!---------------------------------------------------------------------->
    <vs-divider class="m-0 p-0" />

    <div class="section bg-white">
      <div class="text-center mb-20">
        <h2 class="font-extrabold lg:text-4xl mb-4">
          The system has the following shortcomings
        </h2>
      </div>
      <div class="flex flex-wrap justify-center -m-4">
        <template v-for="(point, idx) in shortcomings">
          <div
            class="flex items-start lg:w-1/2 w-full flex-wrap justify-center p-4 -m-4"
            :key="idx"
          >
            <div class="p-4">
              <div class="custom-check flex justify-center items-center">
                <vs-icon size="50px" icon="done" />
              </div>
            </div>
            <div class="p-4 lg:w-2/3 md:w-4/5 w-4/5 mx-auto">
              <h3
                class="mb-base font-semibold lg:text-left md:text-left sm:text-left text-center"
              >
                {{ point.title }}
              </h3>
              <p class="text-left">
                {{ point.desc }}
              </p>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!---------------------------------------------------------------------->
    <vs-divider class="p-0 m-0" />
    <div class="section bg-white">
      <p class="text-base font-medium mb-10 text-left">
        <b>With VideoWiki.pt we solve this issue</b> by creating a platform
        keeping online education in mind. At the same time, we also make it
        easier for the teachers to make engaging video content without the need
        to master expensive video-editing tools. Our AI-based content creation
        platform creates a video based on the script which the creator and
        further modify to his need.
      </p>
    </div>

    <!--------------------------------------------------------------------->
    <div class="section">
      <NewsLetter />
    </div>
  </div>
</template>
<script>
import NewsLetter from './components/NewsLetter';
export default {
  name: 'Goals',
  components: {
    NewsLetter
  },
  data() {
    return {
      shortcomings: [
        {
          title: 'Interactive Learning',
          desc:
            'Video conferencing becomes a source of one-way communication and students don’t have a standard platform for interaction and interactive learning.',
        },
        {
          title: 'Online Classrooms',
          desc:
            'It’s difficult for someone to keep on concentrating for hours and hence online classrooms become boring and hard to focus on.',
        },
        {
          title: 'Quick Memorization',
          desc:
            'The content isn’t associated with proper visual effects, which would help students in a proper understanding of the topic and quick memorization.',
        },
        {
          title: 'Feedback',
          desc: 'Lack of a robust feedback system',
        },
      ],
    };
  },
};
</script>
<style scoped>
.section {
  padding: 8%;
}
.custom-check {
  color: #ffffff;
  text-align: center;
  height: 69px;
  width: 72px !important;
  font-weight: bold;
  font-size: 26px;
  background: linear-gradient(180deg, #8d56f8 0%, #a06fff 100%);
  box-shadow: 0px 6px 12px #e4d7ff;
  border-radius: 50%;
}
</style>
