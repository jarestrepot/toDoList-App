<script>
import EachTodo from '../components/EachTodo.vue';
import ModalTodos from '../components/ModalTodos.vue';
import FormEditTodo from '../components/FormEditTodo.vue';
import { userAuthStore } from '../../../store/auth/authUser';


export default {
  data() {
    return {
      store: userAuthStore(),
      openModal: false,
    };
  },
  components: {
    EachTodo,
    ModalTodos,
    FormEditTodo
  },
  methods: {
    closeModal() {
      this.openModal = false;
    },
  },

}
</script>

<template>
  <div class="my-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
    <div v-for="todo of store.tasks" :key="todo.id">
      <EachTodo :todo="todo" @open-modal="openModal = true" />
    </div>
    <ModalTodos :action="openModal" :event="closeModal">
      <FormEditTodo />
    </ModalTodos>
  </div>
</template>
