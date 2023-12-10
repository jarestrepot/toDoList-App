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
    :alt="alt ?? $t('altImageTodo')"
    :class="classTailwind" />
</template>