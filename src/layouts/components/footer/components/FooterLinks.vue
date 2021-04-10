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
          /* {
            title: 'Acquire Users',
            url: '#'
          },
          {
            title: 'Blockchain',
            url: '#'
          }, */
          {
            title: 'Content',
            url: '/'
          },
          /* {
            title: 'Coaching',
            url: '#'
          }, */
          {
            title: 'Class',
            url: '/classroom'
          }
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
            title: 'Awards',
            url: '/awards'
          },
          {
            title: 'Team',
            url: '/team'
          },
          {
            title: 'Integration',
            url: '/integration/ms-teams'
          },
          /* {
            title: 'Brand Guidelines',
            url: '#'
          }, */
          {
            title: 'Contact Us', // 'Press Kit',
            url: '/contact-us'
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
