<script>
import { useTodosStore } from '../../../store/todos/todosUser';
import GridIcon from './icons/GridIcon.vue';
import ListIcon from './icons/ListIcon.vue';

  export default{
    data () {
      return {
        todosStore: useTodosStore()
      }
    },
    components: {
      GridIcon,
      ListIcon,
    },
  }
</script>
<template>
  <div class="bg-gray-200 text-sm text-gray-500 leading-none border-2 border-gray-200 rounded-full inline-flex">
      <button 
        @click="todosStore.selectedGridView"
        :class="todosStore.grid && 'active'"
        class="inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-blue-400 focus:text-blue-400 rounded-l-full px-2 py-1">
        <GridIcon/>
        <span>Grid</span>
      </button>
      <button 
        @click="todosStore.selectedListView" 
        :class="!todosStore.grid && 'active'"
        class="inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-blue-400 focus:text-blue-400 rounded-r-full px-2 py-1">
        <ListIcon />
        <span>List</span>
      </button>
    </div>
  </template>