<script>
  import HeartIcon from '../components/icons/HeartIcon.vue'

  export default {
    components: {
      HeartIcon,
    }
  }
</script>
<template>
  <footer class="p-5 bottom-0 w-full bg-gray-50/50 dark:bg-slate-900">
    <p class="text-sm text-end dark:text-slate-300">
      © 2023, made with 
      <HeartIcon />
      by Grup 2. Our 
      <a 
      href="https://github.com/jarestrepot/todolist-app" 
      target="_blank" 
      class="transition-colors hover:text-persian-green-500">repository</a> 
      in GitHub 
    </p>
  </footer>
</template>
