<script>
import { todosStore } from '../../../store/todos/todosUser'
import Navbar from '../../ui/components/Navbar.vue';
import Sidebar from '../../ui/components/Sidebar.vue'
import AddTodoIcon from '../components/icons/AddTodoIcon.vue';
import ModalTodos from '../components/ModalTodos.vue';
import FormAddTodo from '../components/FormAddTodo.vue';
import Footer from '../../ui/components/Footer.vue';
import { startAssetsTodos } from '../../../helpers/todosFetch'

export default{
  data() {
    return {
      isVisible: false,
      showAddTodo: true,
      store: todosStore(),
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
    Sidebar,
    AddTodoIcon, 
    ModalTodos,
    FormAddTodo,
    Footer,
  },
  methods: {
    openModal() {
      this.isVisible = !this.isVisible;
    },
    closeModal() {
      this.isVisible = !this.isVisible;
    },
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
    <AddTodoIcon @click="openModal" v-if="showAddTodo" role="button"/>
    <ModalTodos :action="isVisible" :event="closeModal">
      <FormAddTodo />
    </ModalTodos>
  </main>
  <Footer />
</template>