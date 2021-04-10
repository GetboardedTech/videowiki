/* =========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== */

import Vue from 'vue';
import Router from 'vue-router';
import FullPage from '@/layouts/full-page/FullPage.vue';
import Landing from '@/views/Landing.vue';
Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: '',
      component: FullPage,
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        {
          path: '/welcome',
          name: 'welcome',
          component: () => import('./views/Index.vue'),
          meta: {
            rule: 'isPublic'
          }
        },
        {
          path: '/about',
          name: 'AboutUs',
          component: () => import('./views/AboutUs.vue'),
          meta: {
            rule: 'isPublic'
          }
        },
        {
          path: '/',
          name: 'Landing',
          component: Landing,
          meta: {
            rule: 'isPublic'
          }
        },
        {
          path: '/classroom',
          name: 'Classroom',
          component: () => import('./views/classroom/Classroom.vue'),
          meta: {
            rule: 'isPublic'
          }
        },
        {
          path: '/team',
          name: 'Teams',
          component: () => import('./views/Teams.vue'),
          meta: {
            rule: 'isPublic'
          }
        },
        {
          path: '/goals',
          name: 'Goals',
          component: () => import('./views/Goals.vue'),
          meta: {
            rule: 'isPublic'
          }
        },
        {
          path: '/vc',
          name: 'VideoConference',
          component: () => import('./views/VideoConference.vue'),
          meta: {
            rule: 'isPublic'
          }
        },
        {
          path: '/awards',
          name: 'Awards',
          component: () => import('./views/Awards.vue'),
          meta: {
            rule: 'isPublic'
          }
        },

        {
          path: '/search',
          name: 'Search',
          component: () => import('./views/search/Index.vue'),
          meta: {
            rule: 'isPublic'
          }
        },
        {
          path: '/video/:slug',
          name: 'Video View',
          component: () => import('./views/videos/NewDetailViewVideo.vue'),
          meta: {
            rule: 'isPublic'
          }
        },
        {
          path: '/privacy-policy',
          name: 'Privacy Policy',
          component: () => import('./views/Privacy.vue'),
          meta: {
            rule: 'isPublic'
          }
        },
        {
          path: '/terms-of-use',
          name: 'Terms of Use',
          component: () => import('./views/Terms.vue'),
          meta: {
            rule: 'isPublic'
          }
        },
        {
          path: '/integration/ms-teams',
          name: 'MsTeams',
          component: () => import('./views/Integrations/MsTeams.vue'),
          meta: {
            rule: 'isPublic'
          }
        },
        /* {
          path: '/register',
          name: 'Register',
          component: () => import('./views/register/Register.vue'),
          meta: {
            rule: 'isGuest'
          }
        },
        {
          path: '/login',
          name: 'Login',
          component: () => import('./views/login/Login.vue'),
          meta: {
            rule: 'isGuest'
          }
        }, */
        /* {
          path: '/dashboard',
          name: 'Dashboard',
          component: () => import('./views/Dashboard.vue'),
          meta: {
            rule: 'isLogged'
          }
        }, */
        {
          path: '/creators',
          name: 'Creators',
          component: () => import('./views/creators/Creators.vue'),
          meta: {
            rule: 'isPublic'
          }
        }
      ]
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('./views/register/Register.vue'),
      meta: {
        rule: 'isPublic'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./views/login/Login.vue'),
      meta: {
        rule: 'isPublic'
      }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('./views/dashboard/Dashboard.vue'),
      meta: {
        rule: 'isPublic'
      }
    },
    {
      path: '/myvideos',
      name: 'MyVideos',
      component: () => import('./views/MyVideos.vue'),
      meta: {
        rule: 'isLogged'
      }
    },
    {
      path: '/contact-us',
      name: 'ContactUs',
      component: () => import('./views/ContactUs.vue'),
      meta: {
        rule: 'isPublic'
      }
    },
    {
      // =============================================================================
      // MAIN LAYOUT ROUTES
      // =============================================================================
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
        {
          path: '/studio/:videoId?',
          name: 'home',
          component: () => import('./views/Home.vue'),
          meta: {
            rule: 'isPublic'
          }
        }
      ]
    },
    {
      // =============================================================================
      // VideoWiki Class LAYOUT ROUTES
      // =============================================================================
      path: '',
      component: () => import('./layouts/videowiki-class/Index.vue'),
      children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
        {
          path: '/integrations/classroom',
          name: 'VideoWikiClassLanding',
          component: () => import('./views/videowiki-class/Landing.vue'),
          meta: {
            rule: 'isPublic'
          }
        }
      ]
    },
    {
      path: '/error/not-authorized',
      component: () => import('./views/NotAuthorized.vue')
    },
    {
      path: '/error/404',
      component: () => import('./views/Error404.vue'),
      meta: {
        rule: 'isPublic'
      }
    },
    { path: '/error/500', component: () => import('./views/Error500.vue') },
    // Redirect to 404 page, if no match found
    {
      path: '*',
      redirect: '/error/404'
    }
  ]
});

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg');
  if (appLoading) {
    appLoading.style.display = 'none';
  }
});

export default router;
