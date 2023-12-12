<script>
  import { StartIcon } from '../components/icons'
  
  export default {
    components: {
      StartIcon
    }
  } 
</script>

<template>
  <div class="h-[28rem] flex flex-col items-center justify-center">
    <StartIcon />
    <h2 class="text-2xl mt-8 text-center text-slate-400">You don't have todos archived.</h2>
  </div>
</template>