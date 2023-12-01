<script>
  import SunIcon from '../components/icons/SunIcon.vue';
  import MoonIcon from '../components/icons/MoonIcon.vue';
  import { useThemeMode } from '../../../store/theme/modeTheme'

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
      if (this.storeTheme.darkMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark")
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light")
      }
    }
  }
</script>
<template>
  <button v-if="storeTheme.darkMode">
    <SunIcon />
  </button>
  <button v-else>
    <MoonIcon />
  </button>
</template>