<script>
import TodoIcon from '../components/icons/TodoIcon.vue'

export default {
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
  },
}
</script>
<template>
  <div @click="openModal()" class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md min-h-full">
    <div
      class="bg-clip-border mx-2 rounded-xl overflow-hidden shadow-lg absolute -mt-4 lg:-mt-7 grid h-14 w-14 place-items-center 2xl:mx-4 2xl:h-16 2xl:w-16"
      :class= "{ highImportacnce: todo.Importance === 'High', mediumImportacnce: todo.Importance === 'Medium', lowImportacnce: todo.Importance === 'Low'}">
      <TodoIcon />
    </div>
    <div class="p-3 text-right">
      <p class="block antialiased font-sans text-sm leading-normal font-normal text-gray-400">{{ todo.Category }}</p>
      <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">{{ todo.title }}</h4>
    </div>
    <div class="border-t border-blue-gray-50 p-3">
      <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
        {{ todo.description }}
      </p>
      <p class="block antialiased font-sans text-sm leading-normal font-normal text-right text-gray-400">{{ todo.Status }}</p>
    </div>
  </div>
</template>

