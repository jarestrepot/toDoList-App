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
  <button v-if="storeTheme.darkMode">
    <SunIcon />
  </button>
  <button v-else>
    <MoonIcon />
  </button>
</template>