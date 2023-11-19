<script>
import TodoIcon from './icons/TodoIcon.vue'

export default {
  components: {
    TodoIcon,
  }
}
</script>
<template>
  <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
    <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-500 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
      <TodoIcon />
    </div>
    <div class="p-4 text-right">
      <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600"></p>
      <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900"></h4>
    </div>
    <div class="border-t border-blue-gray-50 p-4">
      <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
        <strong class="text-green-500"></strong>&nbsp;
      </p>
    </div>
  </div>
</template>