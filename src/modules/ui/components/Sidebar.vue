<script>
  import { userAuthStore } from '../../../store/auth/authUser'
  import { useTodosStore } from '../../../store/todos/todosUser'
  import ArchiveTodoIcon from '../../todos/components/icons/ArchiveTodoIcon.vue'
  import HomeIcon from '../components/icons/HomeIcon.vue'
  import LogoutIcon from '../components/icons/LogoutIcon.vue'
  import ProfileIcon from '../components/icons/ProfileIcon.vue'


  export default {
    data(){
      return {
        storeAuth: userAuthStore(),
        storeTodos: useTodosStore()
      }
    },
    components: {
    ArchiveTodoIcon,
    HomeIcon,
    LogoutIcon,
    ProfileIcon,
},
    methods: {
      logoutUser(){
        this.storeAuth.logoutUser()
        this.storeTodos.clearAssetsTodos()
        this.$router.push('/')
      }
    }
  }
</script>
<template>
  <aside class="aside bg-gradient-to-br from-fun-blue-900 to-fun-blue-950 -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 dark:bg-gradiente-to-b dark:from-slate-950/30 dark:to-slate-950">
    <div class="relative border-b border-white/20">
      <router-link 
        :to="{ name: 'entry'}" 
        class="flex items-center gap-4 py-6 px-8">
        <h6 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-relaxed text-white">{{ $t('todoListApp') }}</h6>
      </router-link>
    </div>
    <nav class="m-4 navbar">
      <ul class="mb-4 flex flex-col gap-1">
        <li>
          <router-link
            @click="storeAuth.clearTodoFilter()"
            :to="{ name: 'entry' }"
            class="middle none font-sans font-bold center transition-all text-xs py-3 rounded-lg text-white w-full flex items-center gap-4 px-4 capitalize hover:bg-white/10">
            <HomeIcon className="w-5 h-5 fill-white"/>
            <p class="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">{{ $t('dashboard') }}</p>
          </router-link>
        </li>

        <li>
          <router-link
            @click="storeAuth.clearTodoFilter()"
            :to="{ name: 'archive' }"
            class="middle none font-sans font-bold center transition-all text-xs py-3 rounded-lg text-white w-full flex items-center gap-4 px-4 capitalize hover:bg-white/10">
            <ArchiveTodoIcon className="w-5 fill-white"/>
            <p class="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">{{ $t('archivedView') }}</p>
          </router-link>
        </li>

        <li>
          <router-link 
            :to="{name: 'profile'}"
            class="middle none font-sans font-bold center transition-all text-xs py-3 rounded-lg text-white w-full flex items-center gap-4 px-4 capitalize hover:bg-white/10">
            <ProfileIcon className="w-5 h-5 fill-white" />
            <p class="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">{{ $t('profile') }}</p>
          </router-link>
        </li>
      </ul>

      <ul class="mb-4 flex flex-col gap-1">
        <li class="mx-3.5 mt-4 mb-2">
          <p class="block antialiased font-sans text-sm leading-normal text-white font-black uppercase opacity-75">{{ $t('authPages') }}</p>
        </li>
        
        <li>
          <button
            @click="logoutUser()"
            class="middle none font-sans font-bold center transition-all text-xs py-3 rounded-lg text-white hover:bg-white/10 [&.active]:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
            type="button">
            <LogoutIcon className="w-5 h-5 fill-white" />
            <p class="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">{{ $t('logout') }}</p>
          </button>
        </li>
      </ul>
    </nav>
  </aside>
</template>