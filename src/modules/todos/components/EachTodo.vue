<script>
import TodoIcon from '../components/icons/TodoIcon.vue'

export default {
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
  <div @click="openModal" class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
    <div
      class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-500 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
      <TodoIcon />
    </div>
    <div class="p-3 text-right">
      <p class="block antialiased font-sans text-sm leading-normal font-normal text-gray-400">Category - Date</p>
      <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">Title</h4>
    </div>
    <div class="border-t border-blue-gray-50 p-3">
      <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
        Description
      </p>
      <p class="block antialiased font-sans text-sm leading-normal font-normal text-right text-gray-400">Status</p>
    </div>
  </div>
</template>