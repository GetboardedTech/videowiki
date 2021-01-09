import Vue from 'vue';
import { AclInstaller, AclCreate, AclRule } from 'vue-acl';
import router from '@/router';

Vue.use(AclInstaller);

let initialRole = 'public';

const userInfo = JSON.parse(localStorage.getItem('userInfo'));
if (userInfo && userInfo.userRole) initialRole = userInfo.userRole;

export default new AclCreate({
  initial: initialRole,
  notfound: '/error/not-authorized',
  router,
  acceptLocalRules: true,
  globalRules: {
    isAdmin: new AclRule('admin').generate(),
    isGuest: new AclRule('public').generate(),
    isPublic: new AclRule('public')
      .or('admin')
      .or('user')
      .generate(),
    isLogged: new AclRule('user').or('admin').generate()
  }
});
