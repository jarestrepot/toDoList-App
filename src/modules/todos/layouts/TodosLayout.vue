<script>
import Navbar from '../../ui/components/Navbar.vue';
import AddTodoIcon from '../components/icons/AddTodoIcon.vue';
import Footer from '../../ui/components/Footer.vue';
import Sidebar from '../../ui/components/Sidebar.vue'
import { startAssetsTodos } from '../../../helpers/todosFetch'
import { todosStore } from '../../../store/todos/todosUser'
export default{
  data() {
    return {
      showAddTodo: true,
      store: todosStore()
    };
  },
  async beforeCreate() {
    const response = await startAssetsTodos()
    const { assetsTodos } = todosStore();
    assetsTodos(response);
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
    Sidebar,
    Footer,
  }
}
</script>

<template>
  <Sidebar />
  <header class="bg-gray-50/50 p-4 xl:ml-80">
    <Navbar />
  </header>
  <main class="min-h-screen bg-gray-50/50 p-4 xl:ml-80">
    <router-view />
    <AddTodoIcon v-if="showAddTodo" />
  </main>
  <Footer />
</template>