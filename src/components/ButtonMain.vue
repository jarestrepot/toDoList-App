<script>
  export default {
    props: {
      textButton:String,
      textAlter: String,
      path: String,
    }
  }
</script>

<template>
  <div class="text-center lg:text-left flex flex-col-reverse  w-full justify-between items-center">
    <p class="mb-0 mt-2 pt-1 text-sm font-semibold">
      Don't have an account?
      <a href="#!" 
        class="textDegrant text-lg transition duration-200 ease-in-out  active:text-fun-blue-600 hover:underline
        hover:underline-offset-4 hover:decoration-fun-blue-400"
      >{{ textAlter ?? 'Register' }}</a>
    </p>
    <button type="button" class="button-main">
      {{ textButton ?? 'Login' }}
    </button>
  </div>
</template>

<style></style>