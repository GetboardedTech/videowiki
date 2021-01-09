<template>
  <div
    class="the-navbar__user-meta flex items-center"
    v-if="activeUserInfo.displayName"
  >
    <!--div class="text-right leading-tight hidden sm:block">
      <p class="font-semibold">{{ activeUserInfo.displayName }}</p>
      <small>Available</small>
    </div-->

    <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
      <div class="flex items-center">
        <vs-icon icon-pack="feather" icon="icon icon-chevron-down" />
        <div class="con-img ml-3">
          <img
            v-if="activeUserInfo.photoURL"
            key="onlineImg"
            :src="activeUserInfo.photoURL"
            alt="user-img"
            width="40"
            height="40"
            class="rounded-full shadow-md cursor-pointer block"
          />
        </div>
      </div>
      <vs-dropdown-menu class="vx-navbar-dropdown">
        <ul style="min-width: 9rem">
          <router-link to="/myvideos" class="text-custom-grey">
            <li
              class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            >
              <feather-icon icon="UserIcon" svgClasses="w-4 h-4" />
              <span class="ml-2">My videos</span>
            </li>
          </router-link>

          <vs-divider class="m-1" />

          <router-link to="/dashboard" class="text-custom-grey">
            <li
              class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            >
              <feather-icon icon="HomeIcon" svgClasses="w-4 h-4" />
              <span class="ml-2">Dashboard</span>
            </li>
          </router-link>

          <vs-divider class="m-1" />

          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="logout"
          >
            <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Logout</span>
          </li>
        </ul>
      </vs-dropdown-menu>
    </vs-dropdown>
    <!--div class="con-img ml-3">
      <img
        v-if="activeUserInfo.photoURL"
        key="onlineImg"
        :src="activeUserInfo.photoURL"
        alt="user-img"
        width="40"
        height="40"
        class="rounded-full shadow-md cursor-pointer block"
      />
    </div-->
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    activeUserInfo() {
      return this.$store.state.AppActiveUser;
    },
  },
  methods: {
    logout() {
      return this.$store.dispatch('auth/logOut');
    },
  },
};
</script>

<!--template>
  <div
    class="the-navbar__user-meta flex items-center"
    v-if="activeUserInfo.displayName"
  >
    <div class="text-right leading-tight hidden sm:block">
      <p class="font-semibold">{{ activeUserInfo.displayName }}</p>
      <small>Available</small>
    </div>

    <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
      <div class="con-img ml-3">
        <img
          v-if="activeUserInfo.photoURL"
          key="onlineImg"
          :src="activeUserInfo.photoURL"
          alt="user-img"
          width="40"
          height="40"
          class="rounded-full shadow-md cursor-pointer block"
        />
      </div>

      <vs-dropdown-menu class="vx-navbar-dropdown">
        <ul style="min-width: 9rem">
          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="$router.push('/dashboard')"
          >
            <feather-icon icon="UserIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Dashboard</span>
          </li>

          <vs-divider class="m-1" />

          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="logout"
          >
            <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Logout</span>
          </li>
        </ul>
      </vs-dropdown-menu>
    </vs-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    activeUserInfo() {
      return this.$store.state.AppActiveUser;
    }
  },
  methods: {
    logout() {
      return this.$store.dispatch('auth/logOut');
    }
  }
};
</script-->
