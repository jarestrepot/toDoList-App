<script>
import InputSearch from '../../shared/components/InputSearch.vue';
import ProfileIcon from '../components/icons/ProfileIcon.vue'
import LogoutIcon from '../components/icons/LogoutIcon.vue';
import HomeIcon from '../components/icons/HomeIcon.vue';

export default {
  data() {
    return {
      nameNavigate: '',
      showInput: false,
    };
  },
  beforeCreate() {
      this.$watch('$route', to => {
      if (to.name !== 'profile') {
        this.nameNavigate = 'Dashboard';
        this.showInput = true;
      } else {
        this.nameNavigate = 'Profile';
        this.showInput = false;
      }
    });
  },
  components: {
    InputSearch,
    ProfileIcon,
    LogoutIcon,
    HomeIcon
  },
}
</script>

<template>
  <nav class="block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1">
    <div class="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">

      <div class="capitalize">
        <h6 class="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-gray-900">{{ nameNavigate }}</h6>
      </div>

      <div class="flex items-center justify-end">

        <InputSearch v-if="showInput" />

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

        <!-- !!Ojo logout -->
        <button
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
          Valentina Alzate
        </router-link>

      </div>

    </div>
  </nav>
</template>