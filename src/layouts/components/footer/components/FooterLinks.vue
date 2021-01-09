<template>
  <div>
    <div class="text-xl font-bold text-black mb-6">{{ sectionName }}</div>
    <div class="title-links">
      <template v-for="subSection in sections[sectionName]">
        <div :key="subSection.title" class="text-base mb-3">
          <a :href="subSection.url" class="footer-link-item">{{
            subSection.title
          }}</a>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FooterLinks',
  props: {
    sectionName: String
  },
  data() {
    return {
      sections: {
        Product: [
          {
            title: 'Acquire Users',
            url: '#'
          },
          {
            title: 'Blockchain',
            url: '#'
          },
          {
            title: 'Content',
            url: '/'
          },
          {
            title: 'Coaching',
            url: '#'
          },
          {
            title: 'Curriculums',
            url: '#'
          },
          /* {
            title: 'Investores',
            url: '#'
          } */
        ],
        Company: [
          {
            title: 'About VideoWiki',
            url: '/about'
          },
          {
            title: 'Team',
            url: '/team'
          },
          {
            title: 'Brand Guidelines',
            url: '#'
          },
          {
            title: 'Press Kit',
            url: '#'
          }
        ],
        Resources: [
          {
            title: 'Study with VideoWiki',
            url: '#'
          },
          {
            title: 'Blog',
            url: '#'
          },
          {
            title: 'VideWiki Certified',
            url: '#'
          },
          {
            title: 'Help Center',
            url: '#'
          },
          {
            title: 'Library',
            url: '#'
          }
        ],
        'Terms and Conditions': [
          {
            title: 'Terms and Conditions',
            url: '#'
          },
          {
            title: 'Privacy Policy',
            url: '#'
          },
          {
            title: 'US Privacy Laws',
            url: '#'
          },
          {
            title: "Children's Privacy Laws",
            url: '#'
          },
          {
            title: 'Inclusion and Accessibility policy',
            url: '#'
          }
        ]
      }
    };
  }
};
</script>
<style scoped>
.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 2.5rem;
}
.footer-link-item {
  color: #544837;
}
</style>
