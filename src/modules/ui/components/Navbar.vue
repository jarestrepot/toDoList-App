<script>
import InputSearch from '../../shared/components/InputSearch.vue';
import ProfileIcon from '../components/icons/ProfileIcon.vue'
import LogoutIcon from '../components/icons/LogoutIcon.vue';
import HomeIcon from '../components/icons/HomeIcon.vue';
import { userAuthStore } from '../../../store/auth/authUser';

export default {
  data() {
    return {
      store: userAuthStore(),
    };
  },
  components: {
    InputSearch,
    ProfileIcon,
    LogoutIcon,
    HomeIcon
  },
  methods: {
    logoutUser() {
      this.store.logoutUser()
      this.$router.push('/')
    }
  }
}

</script>

<template>
  <nav class="block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1">
    <div class="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">

      <div  class="capitalize">
        <h6 v-if="this.$route.name !== 'profile'" class=" block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-gray-900">Dashboard</h6>
      </div>

      <div class="flex items-center justify-end">

        <InputSearch v-if="this.$route.name !== 'profile'" />

        <router-link :to="{ name: 'no-entry' }"
          class="relative middle none font-sans font-medium text-center uppercase transition-all w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 grid xl:hidden"
          type="button" title="Profile">
          <span class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
            <HomeIcon className="w-7 h-7" />
          </span>
        </router-link>

        <router-link :to="{ name: 'profile' }"
          class="relative middle none font-sans font-medium text-center uppercase transition-all w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 grid xl:hidden"
          type="button" title="Profile">
          <span class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
            <ProfileIcon className="w-7 h-7" />
          </span>
        </router-link>
        <button
          @click="logoutUser()"
          class="relative middle none font-sans font-medium text-center uppercase transition-all w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 grid xl:hidden"
          type="button" title="Logout">
          <span class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
            <LogoutIcon className="w-6 h-6" />
          </span>
        </button>

        <router-link :to="{ name: 'profile' }"
          class="middle none font-sans font-bold center uppercase transition-all text-xs py-3 rounded-lg text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 hidden items-center gap-1 px-4 xl:flex"
          type="button" title="Profile">
          <ProfileIcon className="w-5 h-5" />
          {{ `${store.user.name} ${store.user.lastName}` }}
        </router-link>

      </div>

    </div>
  </nav>
</template>