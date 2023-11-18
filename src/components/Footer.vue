<script>
import HeartIcon from './icons/heartIcon.vue'
export default {
  components: {
    HeartIcon,
  }
}
</script>
<template>
  <footer class="p-5 fixed bottom-0 w-full">
    <p class="block antialiased font-sans text-sm leading-normal font-normal text-inherit text-end">
      © 2023, made with 
      <HeartIcon />
      by Grup 2. Our 
      <a href="https://github.com/jarestrepot/todolist-app" target="_blank" class="transition-colors hover:text-blue-500">repository</a> 
      in GitHub 
    </p>
  </footer>
</template>
