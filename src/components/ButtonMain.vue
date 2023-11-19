<script>
  export default {
    props: {
      textButton:String,
    }
  }
</script>

<template>
  <button type="button" class="button-main">
    {{ textButton ?? 'Login' }}
  </button>
</template>

<style></style>