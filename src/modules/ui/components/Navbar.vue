<script>
  import { userAuthStore } from '../../../store/auth/authUser';
  import { useThemeMode } from '../../../store/theme/modeTheme';
  import { useTodosStore } from '../../../store/todos/todosUser';
  import ArchiveTodoIcon from '../../todos/components/icons/ArchiveTodoIcon.vue';
  import ButtonTheme from './ButtonTheme.vue';
  import HomeIcon from '../components/icons/HomeIcon.vue';
  import InputSearch from '../../shared/components/InputSearch.vue';
  import LogoutIcon from '../components/icons/LogoutIcon.vue';
  import ProfileIcon from '../components/icons/ProfileIcon.vue';
  import ChangeLanguage from '../../shared/components/ChangeLanguage.vue';

  export default {
    data() {
      return {
        storeAuth: userAuthStore(),
        storeTodos: useTodosStore(),
        storeTheme: useThemeMode(),
      };
    },
    components: {
      ArchiveTodoIcon,
      ButtonTheme,
      HomeIcon,
      InputSearch,
      LogoutIcon,
      ProfileIcon,
      ChangeLanguage,
    },
    methods: {
      logoutUser() {
        this.storeAuth.logoutUser();
        this.storeTodos.clearAssetsTodos()
        this.$router.push('/')
      },
      clearInput(){
        this.storeAuth.clearTodoFilter()
        this.$refs.inputComponent.clearInputSearch();
      }
    },
    computed: {
      getTitlesViews(){
        if(this.$route.name === 'entry'){
          return this.$t('dashboard') 
        }
        return this.$t('archivedView')
      }
    }
  }
</script>

<template>
  <nav class="nav-mobile block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0">
    <div class="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center dark:bg-slate-900">

      <div class="capitalize">
        <h6 
          v-if="this.$route.name !== 'profile'" 
          class=" block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-gray-900 dark:text-slate-300">
          {{ getTitlesViews }}
        </h6>
      </div>

      <div class="flex items-center justify-end gap-2 xl:gap-6 xl:me-3 min-h-[40px]">

        <InputSearch ref="inputComponent" v-if="this.$route.name !== 'profile'" />

        <router-link 
          :to="{ name: 'profile' }"
          class="middle none font-sans font-bold center uppercase transition-all text-xs rounded-lg text-slate-500 hidden items-center gap-1 xl:flex dark:text-slate-300"
          type="button" 
          :title="$i18n.locale === 'es' ? 'Perfil' : 'Profile'">
          <ProfileIcon className="w-5 h-5 fill-slate-500 dark:fill-slate-300" />
          {{ `${storeAuth.user ? storeAuth.user.name : ''} ${storeAuth.user ? storeAuth.user.lastName : ''}` }}
        </router-link>
        
        <router-link 
          @click="clearInput()"
          :to="{ name: 'entry' }"
          class="xl:hidden"
          type="button" 
          :title="$i18n.locale === 'es' ? 'Panel' : 'Dashboard'"
          :class="{ 'fill-slate-500 dark:fill-slate-300': !$route.meta.active, 'fill-persian-green-500': $route.meta.active }">
          <span>
            <HomeIcon className="w-5 h-5 md:w-7 md:h-7" />
          </span>
        </router-link>
        
        <router-link 
          @click="clearInput()"
          :to="{ name: 'archive' }"
          class="xl:hidden"
          type="button" 
          :title="$i18n.locale === 'es' ? 'Archivado' : 'Archived'"
          :class="{ 'fill-slate-500 dark:fill-slate-300': !$route.meta.active, 'fill-persian-green-500': $route.meta.active }">
          <span>
            <ArchiveTodoIcon className="w-5 h-[18px] md:w-7 md:h-7" />
          </span>
        </router-link>
  
        <router-link 
          :to="{ name: 'profile' }"
          class="xl:hidden"
          type="button" 
          :title="$i18n.locale === 'es' ? 'Perfil' : 'Profile'"
          :class="{ 'fill-slate-500 dark:fill-slate-300': !$route.meta.active, 'fill-persian-green-500': $route.meta.active }">
          <span>
            <ProfileIcon className="w-6 h-6 md:w-7 md:h-7" />
          </span>
        </router-link>

        <div class="flex gap-2">
          <ChangeLanguage classButtonLanguaje="text-slate-500 text-xl font-bold decoration-slate-500 hover:underline hover:decoration-slate-500 transition-all duration-200 ease-in-out dark:text-slate-300 dark:hover:decoration-slate-300" />
          <ButtonTheme @click="storeTheme.changeTheme()" />
        </div>

        <button
          @click="logoutUser()"
          class="xl:hidden"
          type="button" 
          :title="$i18n.locale === 'es' ? 'Cerrar sesión' : 'Logout'">
          <span>
            <LogoutIcon className="w-5 h-5 md:w-6 md:h-6 fill-slate-500 dark:fill-slate-300" />
          </span>
        </button>

      </div>
    </div>
  </nav>
</template>