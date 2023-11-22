<script>
import Sidebar from './modules/ui/components/Sidebar.vue';
import Footer from './modules/ui/components/Footer.vue';

export default {
  components: {
    Sidebar,
    Footer,
  }
}
</script>

<template>
  <Sidebar />
  <router-view />
  <Footer />
</template>

