<script>
  import HomeIcon from '../components/icons/HomeIcon.vue'
  import ProfileIcon from '../components/icons/ProfileIcon.vue'
  import LogoutIcon from '../components/icons/LogoutIcon.vue'
  import { userAuthStore } from '../../../store/auth/authUser'


  export default {
    data(){
      return {
        store: userAuthStore()
      }
    },
    components: {
      HomeIcon,
      ProfileIcon,
      LogoutIcon,
    },
    methods: {
      logoutUser(){
        this.store.logoutUser()
        const { status } = this.store;
        if(status === 'not-authenticated'){
          localStorage.removeItem('tokenUser')
          this.$router.push('/')
        }
      }
    }
  }
</script>
<template>
  <aside
    class="bg-gradient-to-br from-fun-blue-900 to-fun-blue-950 -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0">
    <div class="relative border-b border-white/20">
      <router-link :to="{ name: 'no-entry'}" class="flex items-center gap-4 py-6 px-8">
        <h6 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-relaxed text-white">TODO List App</h6>
      </router-link>
    </div>
    <div class="m-4">
      <ul class="mb-4 flex flex-col gap-1">
        <li>
          <a href="#">
            <router-link
              :to="{ name: 'no-entry' }"
              class="middle none font-sans font-bold center transition-all text-xs py-3 rounded-lg text-white w-full flex items-center gap-4 px-4 capitalize title-page shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 hover:bg-gradient-to-b"
              type="button">
              <HomeIcon />
              <p class="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                dashboard</p>
            </router-link>
          </a>
        </li>
        <li>
          <router-link :to="{name: 'profile'}">
            <button
              class="middle none font-sans font-bold center transition-all text-xs py-3 rounded-lg text-white hover:bg-white/10 [&.active]:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
              type="button">
              <ProfileIcon className="w-5 h-5" />
              <p class="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">profile
              </p>
            </button>
          </router-link>
        </li>
      </ul>
      <ul class="mb-4 flex flex-col gap-1">
        <li class="mx-3.5 mt-4 mb-2">
          <p class="block antialiased font-sans text-sm leading-normal text-white font-black uppercase opacity-75">auth pages</p>
        </li>
        <li>
        <button
          @click="logoutUser()"
          class="middle none font-sans font-bold center transition-all text-xs py-3 rounded-lg text-white hover:bg-white/10 [&.active]:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
          type="button">
          <LogoutIcon />
          <p class="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">Log out</p>
        </button>
      </li>
    </ul>
  </div>
</aside></template>
<style></style>