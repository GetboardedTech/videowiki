<template>
  <div>
    <div class="section flex bg-white">
      <div class="lg:w-1/2 w-full text-left">
        <div class="lg:w-4/5 lg:mx-auto">
          <h1 class="lg:text-4xl font-extrabold mb-8 lg:text-left text-center">
            Project goals and alignment with the SDGs
          </h1>
          <p class="font-bold">SDG and SDG4</p>
          <p class="text-base font-medium mb-10">
            The Sustainable Development Goals (SDGs), also known as the Global
            Goals, were adopted by all United Nations Member States in 2015 as a
            universal call to action to end poverty, protect the planet and
            ensure that all people enjoy peace and prosperity by 2030.

            <br /><br /><br />
            <b>SDG 4</b> deals with the importance of a sustainable education
            system. It targets ensuring the completion of primary and secondary
            education by all boys and girls and guaranteeing equal access to
            opportunities for access to quality technical and vocational
            education for everyone.
          </p>
        </div>
      </div>
      <div class="lg:w-1/2 hidden lg:block">
        <img src="@/assets/images/pages/goals1.svg" />
      </div>
    </div>

    <!---------------------------------------------------------------------->

    <div class="section">
      <div class="text-center mb-20">
        <h2 class="font-extrabold text-4xl mb-4">The targets of SDG4 are</h2>
      </div>
      <div class="flex flex-wrap justify-center -m-4">
        <template v-for="(target, idx) in targets">
          <div
            class="flex items-start lg:w-1/2 flex-wrap justify-center p-4 -m-4"
            :key="idx"
          >
            <div class="p-4">
              <div class="custom-bullet flex justify-center items-center">
                {{ bulletNumber(idx) }}
              </div>
            </div>
            <div class="p-4 lg:w-2/3 md:w-4/5 w-4/5 mx-auto">
              <h3
                class="mb-base font-semibold lg:text-left md:text-left sm:text-left text-center"
              >
                {{ target.title }}
              </h3>
              <p class="text-left">
                {{ target.desc }}
              </p>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!---------------------------------------------------------------------->
    <div class="section flex bg-white">
      <div class="lg:w-1/2 hidden lg:block">
        <img src="@/assets/images/pages/goals2.svg" />
      </div>
      <div class="lg:w-1/2 text-left">
        <div class="lg:w-4/5 lg:mx-auto">
          <h1 class="text-4xl font-extrabold mb-8 lg:text-left text-center">
            Vision of VideoWiki.pt
          </h1>
          <p class="text-base font-medium mb-10">
            We have realized that two of the greatest threat to sustainable
            education are
          </p>
          <div class="mb-4 flex items-start lg:items-center">
            <!--vs-icon
              icon-pack="feather"
              icon="icon icon-check-circle"
              color="rgb(230,73,128)"
              class="mr-2 text-xl"
            /--><span>Access to an educational institution</span>
          </div>
          <div class="mb-base flex items-start lg:items-center">
            <!--vs-icon
              icon-pack="feather"
              icon="icon icon-check-circle"
              color="rgb(230,73,128)"
              class="mr-2 text-xl"
            /--><span>Highly censored and syllabus based education system</span>
          </div>
          <p>
            In most developing countries, there is no infrastructure for
            sustainable education neither do children have access to the few
            proper schooling systems available. On the contrary, most people
            have access to the internet. So if
            <i
              >“Student can’t reach the school, the school can reach to the
              students”</i
            >
            <br /><br />
            With the help of the global community, we at VideoWiki.pt believe
            that we can remove the lack of infrastructure and qualified
            teachers, hence ensuring that everyone has proper education up to
            the global standards.
            <br /><br />
            Censorship has negatively affected the literacy and awareness of
            people resulting in social disputes. VideoWiki.pt is based on a
            <b>Decentralized Blockchain network</b> which ensures that there is
            no ‘single’ governing body that controls or censors any source of
            information, and the global community ensures a proper and equitable
            standard received by all.
          </p>
        </div>
      </div>
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
      targets: [
        {
          title: 'Learning Outcomes',
          desc:
            'By 2030, ensure that all girls and boys complete free, equitable, and quality primary and secondary education leading to relevant and Goal-4 effective learning outcomes.',
        },
        {
          title: 'Primary Education',
          desc:
            'By 2030, ensure that all girls and boys have access to quality early childhood development, care, and pre-primary education so that they are ready for primary education.',
        },
        {
          title: 'Tertiary Education',
          desc:
            'By 2030, ensure equal access for all women and men to affordable and quality technical, vocational and tertiary education, including university.',
        },
        {
          title: 'Achieve Literacy',
          desc:
            'By 2030, ensure that all youth and a substantial proportion of adults, both men, and women, achieve literacy and numeracy.',
        },
        {
          title: 'Gender Disparities',
          desc:
            'By 2030, eliminate gender disparities in education and ensure equal access to all levels of education and vocational training for the vulnerable, including persons with disabilities, indigenous peoples, and children in vulnerable situations.',
        },
        {
          title: 'Entrepreneurship',
          desc:
            'By 2030, substantially increase the number of youth and adults who have relevant skills, including technical and vocational skills, for employment, decent jobs, and entrepreneurship.',
        },
        {
          title: 'Higher Education',
          desc:
            'By 2020, substantially expand globally the number of scholarships available to developing countries, in particular, least developed countries, small island developing states, and African countries, for enrolment in higher education, including vocational training and information and communications technology, technical, engineering, and scientific programs, in developed countries and other developing countries.',
        },
        {
          title: 'Sustainable Development',
          desc:
            'By 2030, ensure that all learners acquire the knowledge and skills needed to promote sustainable development, including, among others, through education for sustainable development and sustainable lifestyles, human rights, gender equality, promotion of a culture of peace and non-violence, global citizenship, and appreciation of cultural diversity and of culture’s contribution to sustainable development.',
        },
        {
          title: 'Learning Environments',
          desc:
            'Build and upgrade education facilities that are child, disability, and gender-sensitive and provide safe, nonviolent, inclusive, and effective learning environments for all.',
        },
        {
          title: 'Developing Island',
          desc:
            'By 2030, substantially increase the supply of qualified teachers, including through international co‑operation for teacher training in developing countries, especially the least developed countries and small island developing states.',
        },
      ],
    };
  },
  methods: {
    bulletNumber(index) {
      if (index + 1 < 10) return `0${index + 1}`;
      return `${index + 1}`;
    },
  },
};
</script>
<style scoped>
.section {
  padding: 8%;
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
</style>
