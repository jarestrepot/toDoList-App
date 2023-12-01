<script>
import EachTodo from './EachTodo.vue';
import ModalTodos from './ModalTodos.vue';
import FormEditTodo from './FormEditTodo.vue';
import { userAuthStore } from '../../../store/auth/authUser';
import { useTodosStore } from '../../../store/todos/todosUser';

export default {
  data() {
    return {
      openModal: false,
      todoSelected: '',
      storeAuth: userAuthStore(),
      storeTodo: useTodosStore(),
    };
  },
  components: {
    EachTodo,
    ModalTodos,
    FormEditTodo,
  },
  methods: {
    getId(id) {
      this.todoSelected = this.storeAuth.getTodoId(id)
    }
  },
  computed: {
    useTodo() {
      return this.storeAuth.todoFilter.length > 0 ? this.storeAuth.todoFilter : this.storeAuth.tasks;
    },
    getKeysAssetsTodos() {
      const { assets } = this.storeTodo;
      const [Error, ...params ] = Object.keys(assets).reverse();
      return params.reverse()
    }
  }
}
</script>
<template>
  <div class="bg-grey-50/50 rounded-md max-w-full">

    <div class=" py-4 overflow-x-auto max-w-full">
      <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">

        <table class="min-w-full leading-normal">
          <thead>
            <tr>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left font-semibold text-gray-600 uppercase tracking-wider">
                Title
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left font-semibold text-gray-600 uppercase tracking-wider">
                Description
              </th>
              <th v-for="key of getKeysAssetsTodos" :key="key"
                class="w-fit px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text- font-semibold text-gray-600 uppercase tracking-wider">
                {{ key }}
              </th>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
            </tr>
          </thead>

          <tbody>
            <EachTodo v-for="todo of useTodo" :key="todo.id" 
              :todo="todo" 
              @click="getId(todo.id)"
              @open-modal="openModal = true" />
          </tbody>
        </table>
      </div>
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
