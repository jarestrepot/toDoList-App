<script>
  import { useThemeMode } from '../../../store/theme/modeTheme'
  import MoonIcon from '../components/icons/MoonIcon.vue';
  import SunIcon from '../components/icons/SunIcon.vue';

  export default {
    data () {
      return {
        storeTheme: useThemeMode()
      }
    },
    components: {
      SunIcon,
      MoonIcon,
    },
    updated() {
      this.storeTheme.setItemTheme()
    }
  }
</script>
<template>
  <button>
    <SunIcon v-if="storeTheme.darkMode" className="w-5 md:w-6 fill-slate-300" />
    <MoonIcon v-else className="w-5 md:w-6 fill-slate-500" />
  </button>
</template>