<script>
  export default {
    props:{
      src:String,
      alt:String,
      classTailwind:String,
    }
  }
</script>

<template>
  <img 
    :src="src"
    :alt="alt ?? 'Image task'"
    :class="classTailwind" />
</template>