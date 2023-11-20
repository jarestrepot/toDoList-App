<script>
import Navbar from '../components/Navbar.vue';
import Sidebar from '../components/Sidebar.vue';
import Todos from '../views/Todos.vue';
import EmptyTodos from '../views/EmptyTodos.vue';
import Footer from '../components/Footer.vue';
// import UserProfile from '../views/UserProfile.vue';
import AddTodoIcon from '../components/icons/AddTodoIcon.vue';

export default {
  components: {
    Navbar,
    Sidebar,
    Todos,
    // EmptyTodos,
    // UserProfile,
    Footer,
    AddTodoIcon,
  }
}
</script>

<template>
  <main>
    <AddTodoIcon />
    <div class="min-h-screen bg-gray-50/50">
      <Sidebar />
      <div class="p-4 xl:ml-80">
        <Navbar />
        <div class="mt-12">
          <Todos />
          <!-- <EmptyTodos /> -->
          <!-- <UserProfile /> -->
        </div>
      </div>
    </div>
  </main>
  <Footer />
</template>

<style>

</style>