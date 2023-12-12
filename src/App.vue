<script>
import { useThemeMode } from './store'

export default {
  data() {
    return {
      storeTheme: useThemeMode()
    }
  },
  mounted() {
    this.storeTheme.setItemTheme()
  },

}
</script>
<template>
  <router-view />
</template>


