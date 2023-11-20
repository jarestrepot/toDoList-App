<script>
import StartIcon from '../components/icons/StartIcon.vue'

  export default{
    components: {
      StartIcon
    }
  }
</script>

<template>
  <div class="h-full flex flex-col items-center">
    <StartIcon />
    <h2 class="text-2xl mt-8 text-center text-slate-500">You don't have tasks created, start adding now</h2>
  </div>
</template>