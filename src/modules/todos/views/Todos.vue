<script>
import EachTodo from '../components/EachTodo.vue';
import ModalTodos from '../components/ModalTodos.vue';
import FormEditTodo from '../components/FormEditTodo.vue';
import { userAuthStore } from '../../../store/auth/authUser';


export default {
  data() {
    return {
      openModal: false,
      todoSelected: '',
      store: userAuthStore(),
    };
  },
  components: {
    EachTodo,
    ModalTodos,
    FormEditTodo
  },
  methods: {
    getId(id) {
      this.todoSelected = this.store.getTodoId(id)
    }
  },

}
</script>

<template>
  <div class="my-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
    <div v-for="todo of store.tasks" :key="todo.id">
      <EachTodo 
        :todo="todo" 
        @click="getId(todo.id)"  
        @open-modal="openModal = true" />
    </div>
  </div>
  <ModalTodos 
    @updateTodo="() => updateTodoUser()" 
    :action="openModal">
    <FormEditTodo 
      :todoSelected="todoSelected" 
      @closeModal="openModal = false" />
  </ModalTodos>
</template>
