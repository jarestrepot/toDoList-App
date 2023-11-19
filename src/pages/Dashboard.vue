<script>
  import Navbar from '../components/Navbar.vue';
  import Sidebar from '../components/Sidebar.vue';
  import Todos from '../views/Todos.vue';
  import Footer from '../components/Footer.vue';

  export default {
    components: {
      Navbar,
      Sidebar,
      Todos,
      Footer,
    }
}
</script>

<template>
  <main>
    <div class="min-h-screen bg-gray-50/50">
      <Sidebar />
      <div class="p-4 xl:ml-80">
        <Navbar />
        <div class="mt-12">
          <Todos />
        </div>
      </div>
    </div>
  </main>
  <Footer />
</template>

<style>

</style>