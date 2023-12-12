<script lang="js">
  import { userAuthStore, useTodosStore } from '../../../store';
  import LabelForms from './LabelForms.vue';

  export default {
    data(){
      return {
        storeTodos: useTodosStore(),
        storeAuth: userAuthStore()
      }
    },
    components: {
      LabelForms,
    },
    updated(){
      const { getSearchTodos, addSearchTodo, addSearchTodoArchived } = this.storeAuth;
      const { searchTodo } = this.storeTodos;

      if( searchTodo.length > 0 && this.$route.name === 'entry' ){
        const valuesFilter = getSearchTodos(searchTodo, 'dashboard')
        addSearchTodo(valuesFilter)
      }
      else if( searchTodo.length > 0 && this.$route.name === 'archive' ) {
        const valuesFilter = getSearchTodos(searchTodo, 'archive')
        addSearchTodoArchived(valuesFilter)
      }else{
        addSearchTodo([]);
        addSearchTodoArchived([]);
      }
    }
  }

</script>

<template>
  <div class="mr-auto md:w-56">
    <div class="relative w-full min-w-[200px]">
      <input
        v-model="storeTodos.searchTodo"
        class="focus:ring-0 peer h-full w-full rounded-[7px] border border-slate-500 border-t-transparent bg-transparent px-3 py-2 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-slate-500 placeholder-shown:border-t-slate-500 focus:border-2 focus:border-fun-blue-800 focus:border-t-transparent focus:outline-0 dark:focus:border-persian-green-300 dark:focus:border-t-transparent dark:text-white dark:border-t-transparent dark:border-slate-300 dark:placeholder-shown:border-t-slate-300"
        placeholder=" " />
      <LabelForms :textDisplay="$t('searchHere')"/>
  </div>
</div>
</template>