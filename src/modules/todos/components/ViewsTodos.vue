<script>
  import { userAuthStore } from '../../../store/auth/authUser';
  import { useTodosStore } from '../../../store/todos/todosUser';
  import EachTodo from './EachTodo.vue';
  import FormEditTodo from './FormEditTodo.vue';
  import ModalTodos from './ModalTodos.vue';

  export default {
    data() {
      return {
        openModal: false,
        todoSelected: null,
        storeAuth: userAuthStore(),
        storeTodos: useTodosStore(),
      };
    },
    components: {
      EachTodo,
      ModalTodos,
      FormEditTodo
    },
    methods: {
      getId(id) {
        if (this.storeAuth.getTodoId(id) && this.$route.name === 'entry') {
          this.todoSelected = this.storeAuth.getTodoId(id);
          this.openModal = true
        }
      }
    },
    computed: {
      useTodo() {
        if (this.$route.name === 'entry') {
          return this.storeAuth.todoFilter.length > 0
            ? this.storeAuth.todoFilter
            : this.storeAuth.tasks;
        }
        if (this.$route.name === 'archive') {
          return this.storeAuth.todoFilter.length > 0
            ? this.storeAuth.todoFilter
            : this.storeAuth.archivedTodos;
        }
        return [];
      },
      getKeysAssetsTodos() {
        const { assets } = this.storeTodos;
        const [ Error, ...params ] = Object.keys(assets).reverse();
        return params.reverse()
      }
    }
  }
</script>

<template>
  <div 
    v-if="storeTodos.grid" 
    class="my-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
    <EachTodo v-for="todo of useTodo" 
    :key="todo.id" 
    :todo="todo" 
    @openModalUpdate="(id) => getId(id)" />
  </div>

  <div 
    v-else 
    class="bg-grey-50/50 rounded-md max-w-full">
    <div class=" py-4 overflow-x-auto max-w-full">
      <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">

        <table class="min-w-full leading-normal">
          <thead>
            <tr>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left font-semibold text-gray-600 uppercase tracking-wider">Title</th>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left font-semibold text-gray-600 uppercase tracking-wider">Description</th>
              <th v-for="key of getKeysAssetsTodos" 
                :key="key"
                class="w-fit px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text- font-semibold text-gray-600 uppercase tracking-wider">
                {{ key }}
              </th>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
            </tr>
          </thead>

          <tbody>
            <EachTodo 
              v-for="todo of useTodo" 
              :key="todo.id" :todo="todo" 
              @openModalUpdate="(id) => getId(id)" />
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <ModalTodos 
    @updateTodo="() => updateTodoUser()" 
    @escape="openModal = false"
    :action="openModal">
    <FormEditTodo 
      v-if="todoSelected" 
      :todoSelected="todoSelected" 
      @closeModal="openModal = false" />
  </ModalTodos>
</template>
