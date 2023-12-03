<script>
import EachTodo from './EachTodo.vue';
import ModalTodos from './ModalTodos.vue';
import FormEditTodo from './FormEditTodo.vue';
import { userAuthStore } from '../../../store/auth/authUser';


export default {
  data() {
    return {
      openModal: false,
      todoSelected: null,
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
      if(this.store.getTodoId(id) && this.$route.name === 'entry'){
        this.todoSelected = this.store.getTodoId(id);
        this.openModal = true
      }
    }
  },
  computed: {
    useTodo(){
      if(this.$route.name === 'entry'){
        return this.store.todoFilter.length > 0 
          ? this.store.todoFilter 
          : this.store.tasks;
      }
      if(this.$route.name === 'archive'){
        return this.store.todoFilter.length > 0
          ? this.store.todoFilter
          : this.store.archivedTodos;
      }
      return [];
    },
  }
}
</script>

<template>
  <div class="my-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
    <EachTodo 
      v-for="todo of useTodo" :key="todo.id"
      :todo="todo"  
      @openModalUpdate="(id) => getId(id)" 
    />
  </div>

  <ModalTodos 
    @updateTodo="() => updateTodoUser()" 
    :action="openModal">
    <FormEditTodo 
      v-if="todoSelected"
      :todoSelected="todoSelected" 
      @closeModal="openModal = false" />
  </ModalTodos>
</template>
