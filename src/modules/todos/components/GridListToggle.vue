<script>
  import { useTodosStore } from '../../../store/todos/todosUser';
  import GridIcon from './icons/GridIcon.vue';
  import ListIcon from './icons/ListIcon.vue';

  export default{
    data () {
      return {
        storeTodos: useTodosStore()
      }
    },
    components: {
      GridIcon,
      ListIcon,
    },
  }
</script>
<template>
  <div class="bg-gray-200 text-sm text-gray-500 leading-none border-2 border-gray-200 rounded-full inline-flex dark:bg-slate-800 dark:border-slate-800 dark:text-slate-400">
    <button 
      @click="storeTodos.selectedGridView"
      :class="storeTodos.grid && 'active'"
      class="inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-persian-green-500 focus:text-persian-green-500 dark:hover:text-persian-green-300 dark:focus:text-persian-green-300 rounded-l-full px-2 py-1">
      <GridIcon/>
      <span>{{ $t('gridMode') }}</span>
    </button>
    <button 
      @click="storeTodos.selectedListView" 
      :class="!storeTodos.grid && 'active'"
      class="inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-persian-green-500 focus:text-persian-green-500 dark:hover:text-persian-green-300 dark:focus:text-persian-green-300 rounded-r-full px-2 py-1">
      <ListIcon />
      <span>{{ $t('listMode') }}</span>
    </button>
  </div>
</template>