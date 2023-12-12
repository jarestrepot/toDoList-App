<script>
  import { useThemeMode } from '../../../store'
  import { MoonIcon, SunIcon } from '../components/icons';

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