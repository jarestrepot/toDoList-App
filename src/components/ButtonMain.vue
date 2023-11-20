<script>
  export default {
    props: {
      textButton:String,
      disabledButton:Boolean,
    },
    methods: {
      emitValue(){
        this.$emit('submitEmit', true)
      }
    }
  }
</script>

<template>
  <button
    @click="emitValue()"
    :disabled="disabledButton"
    type="button" class="button-main">
    {{ textButton ?? 'Login' }}
  </button>
</template>

<style></style>