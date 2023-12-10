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
    :disabled="disabledButton ?? false"
    type="button" class="title-page button-main">
    {{ textButton ?? 'Login' }}
  </button>
</template>
