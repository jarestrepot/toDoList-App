<script>
import { useTodosStore } from '../../../store/todos/todosUser'
import Navbar from '../../ui/components/Navbar.vue';
import Sidebar from '../../ui/components/Sidebar.vue'
import AddTodoIcon from '../components/icons/AddTodoIcon.vue';
import ModalTodos from '../components/ModalTodos.vue';
import FormAddTodo from '../components/FormAddTodo.vue';
import Footer from '../../ui/components/Footer.vue';
import { startAssetsTodos } from '../../../helpers/todosFetch';

export default{
  data() {
    return {
      openModal: false,
      store: useTodosStore(),
    };
  },
  async beforeCreate() {
    const response = await startAssetsTodos();
    const { assetsTodos } = this.store;
    assetsTodos(response);
  },
  components: { 
    Navbar,
    Sidebar,
    AddTodoIcon, 
    ModalTodos,
    FormAddTodo,
    Footer,
  },
}
</script>

<template>
  <Sidebar />
  <header class="bg-gray-50/50 p-4 xl:ml-80">
    <Navbar />
  </header>
  <main class="min-h-screen bg-gray-50/50 p-4 xl:ml-80">
    <router-view />
    <AddTodoIcon 
      role="button"
      @open-modal="openModal = true" 
      v-if="this.$route.name !== 'profile'" />
    <ModalTodos :action="openModal">
      <FormAddTodo 
        @closeModal = "openModal = false" />
    </ModalTodos>
  </main>
  <Footer />
</template>