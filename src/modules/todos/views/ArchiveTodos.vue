<script>
import { useTodosStore } from '../../../store/todos/todosUser';
import GridTodos from '../components/GridTodos.vue';
import ListTodos from '../components/ListTodos.vue';

export default {
  data() {
    return {
      todosStore: useTodosStore()
    }
  },
  components: {
    GridTodos,
    ListTodos
  }
}

</script>


<template>
  <GridTodos v-if="todosStore.grid"/>
  <ListTodos v-else />
</template>