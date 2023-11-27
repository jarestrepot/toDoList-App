<script>
import TodoIcon from '../components/icons/TodoIcon.vue'
export default {
  data () {
    return {
      newDescription: null,
      newTitle: null,
    }
  },
  props: {
    todo: Object
  },
  components: {
    TodoIcon,
  },
  methods: {
    openModal() {
      this.$emit('open-modal');
    },
    getNewTitle() {
      if (this.todo.title.length > 25) {
        return this.newTitle = this.todo.title.substring(0, 19) + '...'
      }
      return this.newTitle = this.todo.title;
    },
    getNewDescription() {
      if (this.todo.description.length > 40){
        return this.newDescription = this.todo.description.substring(0, 35) + '...'
      }
      return this.newDescription = this.todo.description;
    },
  },
  mounted() {
    this.getNewTitle(),
    this.getNewDescription()
  },
  updated() {
    this.getNewTitle(),
    this.getNewDescription()
  },
}
</script>
<template>
  <div @click="openModal()" class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md min-h-full">
    <div
      class="bg-clip-border mx-4 rounded-xl overflow-hidden shadow-lg absolute -mt-4 lg:-mt-7 grid h-16 w-16 place-items-center"
      :class= "{ highImportacnce: todo.Importance === 'High', mediumImportacnce: todo.Importance === 'Medium', lowImportacnce: todo.Importance === 'Low'}">
      <TodoIcon />
    </div>
    <div class="p-3 text-right">
      <p class="block antialiased font-sans text-sm leading-normal font-normal text-gray-400">{{ todo.Category }}</p>
      <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">{{ newTitle }}</h4>
    </div>
    <div class="border-t border-blue-gray-50 p-3 flex flex-col justify-between">
      <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
        {{ newDescription }}
      </p>
      <p class="block antialiased font-sans text-sm leading-normal font-normal text-right text-gray-400">{{ todo.Status }}</p>
    </div>
  </div>
</template>

