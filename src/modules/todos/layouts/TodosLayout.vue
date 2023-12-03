<script>
import { useTodosStore } from '../../../store/todos/todosUser';
import Navbar from '../../ui/components/Navbar.vue';
import FilterNav from '../../ui/components/FilterNav.vue';
import Sidebar from '../../ui/components/Sidebar.vue';
import Footer from '../../ui/components/Footer.vue';
import { startAssetsTodos } from '../../../helpers/todosFetch';
import { userAuthStore } from '../../../store/auth/authUser';

export default{
  data() {
    return {
      storeTodos: useTodosStore(),
      storeAuth: userAuthStore()
    };
  },
  async beforeCreate() {
    const response = await startAssetsTodos();
    const { assetsTodos } = this.storeTodos;
    assetsTodos(response);
  },
  components: { 
    Navbar,
    FilterNav,
    Sidebar,
    Footer,
  },
}
</script>

<template>
  <Sidebar />
  <header class="bg-gray-50/50 pt-4 px-4 xl:ml-80">
    <Navbar />
    <FilterNav v-if="this.$route.name !== 'profile'" />
  </header>
  <main class="min-h-screen bg-gray-50/50 p-4 xl:ml-80">
    <router-view v-if="storeAuth.tasks.length > 0" name="todos"/>
    <router-view v-else name="emptyTodos"/>
    <router-view name="userProfile"/>
    <router-view v-if="storeAuth.archivedTodos.length > 0" name="archived"/>
    <router-view v-else name="emptyArchived" />
  </main>
  <Footer />
</template>