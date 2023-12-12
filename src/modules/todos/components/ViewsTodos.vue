<script>
import { userAuthStore, useTodosStore } from '../../../store';
import { EachTodo, FormEditTodo, ModalTodos } from './';

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
    },
  },
  computed: {
    useTodo() {
      if (this.$route.name === 'entry') {
        if (this.storeAuth.todoFilter.length > 0 && this.storeAuth.searchTodos.length <= 0) return this.storeAuth.todoFilter
        if (this.storeAuth.searchTodos.length > 0) return this.storeAuth.searchTodos
        return this.storeAuth.tasks
      }

      if (this.$route.name === 'archive') {
        if (this.storeAuth.todoFilter.length > 0 && this.storeAuth.searchTodos.length <= 0) return this.storeAuth.todoFilter
        if (this.storeAuth.searchTodosArchived.length > 0) return this.storeAuth.searchTodosArchived
        return this.storeAuth.archivedTodos
      }
      return [];
    },

    getKeysAssetsTodos() {
      const { assets } = this.storeTodos;
      const [category, importance, status] = Object.keys(assets);
      return [category, status, importance]
    },
  },
}
</script>

<template>
  <div v-if="storeTodos.grid" class="my-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
    <EachTodo v-for="todo of useTodo" :key="todo.id" :todo="todo" @openModalUpdate="(id) => getId(id)" />
  </div>

  <div v-else class="bg-grey-50/50 rounded-md max-w-full">
    <div class=" py-4 overflow-x-auto max-w-full">
      <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">

        <table class="min-w-full leading-normal">
          <thead>
            <tr>
              <th
                class="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200">
                {{ $t('title') }}
              </th>
              <th
                class="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200">
                {{ $t('description') }}
              </th>
              <th v-for="key of getKeysAssetsTodos" :key="key"
                class="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200">
                {{ $t(`${key}`) }}
              </th>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-slate-700 dark:border-slate-600"></th>
            </tr>
          </thead>

          <tbody>
            <EachTodo v-for="todo of useTodo" :key="todo.id" :todo="todo" @openModalUpdate="(id) => getId(id)" />
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <ModalTodos @updateTodo="() => updateTodoUser()" @escape="openModal = false" :action="openModal">
    <FormEditTodo v-if="todoSelected" :todoSelected="todoSelected" @closeModal="openModal = false" />
  </ModalTodos>
</template>
