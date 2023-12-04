<script>
  import { userAuthStore } from '../../../store/auth/authUser';
  import LabelForms from './LabelForms.vue';

  export default {
    data(){
      return {
        searchTodo: '',
        storeAuth: userAuthStore()
      }
    },
    components: {
      LabelForms,
    },
    updated(){
      const { getSearchTodos, addSearchTodo, addSearchTodoArchived } = this.storeAuth;
      if(this.searchTodo.length > 0 && this.$route.name === 'entry'){
        const valuesFilter = getSearchTodos(this.searchTodo, 'dashboard')
        addSearchTodo(valuesFilter)
      }
      else if(this.searchTodo.length > 0 && this.$route.name === 'archive') {
        const valuesFilter = getSearchTodos(this.searchTodo, 'archive')
        addSearchTodoArchived(valuesFilter)
      }else{
        addSearchTodo([]);
        addSearchTodoArchived([]);
      }
    }
  }

</script>

<template>
  <div class="mr-auto md:mr-4 md:w-56">
    <div class="relative w-full min-w-[200px]">
      <input
        v-model="searchTodo"
        class="focus:ring-0 peer h-full w-full rounded-[7px] border border-slate-500 border-t-transparent bg-transparent px-3 py-2 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-slate-500 placeholder-shown:border-t-slate-500 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0"
        placeholder=" " />
      <LabelForms textDisplay="Search here"/>
  </div>
</div>
</template>