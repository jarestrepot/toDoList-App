<script>
import Navbar from '../../ui/components/Navbar.vue';
import AddTodoIcon from '../components/icons/AddTodoIcon.vue';

export default{
  data() {
    return {
      showAddTodo: true,

    };
  },
  beforeCreate() {
    this.$watch('$route', to => {
      if (to.name === 'profile') {
        return this.showAddTodo = false;
      }
      this.showAddTodo = true;
    })
  },
  components: { 
    Navbar,
    AddTodoIcon,
  }
}
</script>

<template>
  <header class="bg-gray-50/50 p-4 xl:ml-80">
    <Navbar />
    <AddTodoIcon v-if="showAddTodo" />
  </header>
  <main class="min-h-screen bg-gray-50/50 p-4 xl:ml-80">
    <router-view />
  </main>
</template>