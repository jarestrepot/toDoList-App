<script>
import { useTodosStore } from '../../../store/todos/todosUser';
import GridIcon from './icons/GridIcon.vue';
import ListIcon from './icons/ListIcon.vue';

  export default{
    data () {
      return {
        active: false,
        todosStore: useTodosStore()
      }
    },
    components: {
      GridIcon,
      ListIcon,
    },
    methods: {
      addActive(view){
        if(view === 'grid'){
          this.$refs.grid.classList.add('active')
          this.$refs.list.classList.remove('active'); return
        }
        this.$refs.list.classList.add('active')
        this.$refs.grid.classList.remove('active')
      }
    }
  }
</script>
<template>
  <div class="bg-gray-200 text-sm text-gray-500 leading-none border-2 border-gray-200 rounded-full inline-flex">
      <button @click="todosStore.selectedGridView" v-on:click="addActive('grid')" ref="grid" class="inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-blue-400 focus:text-blue-400 rounded-l-full px-2 py-1 active">
        <GridIcon/>
        <span>Grid</span>
      </button>
      <button @click="todosStore.selectedListView" v-on:click="addActive('list')" ref="list" class="inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-blue-400 focus:text-blue-400 rounded-r-full px-2 py-1">
        <ListIcon />
        <span>List</span>
      </button>
  </div>
</template>
