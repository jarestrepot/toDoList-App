<script>
  export default {
    emits: ['deleteAccount', 'closeModal'],
    props: {
      textModal: String,
      confimrRol: Boolean,
    }
  }

</script>
<template>
  <div class="p-5 sm:text-lg dark:text-slate-300">
    <p>{{ textModal }}</p>
  </div>
  <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row justify-end items-center dark:bg-slate-900">
    <button 
      type="button" 
      @click="$emit('closeModal')"
      class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
      {{ $t('cancel') }}
    </button>
    <button 
      v-if="confimrRol"
      type="button"
      @click="$emit('deleteAccount')"
      class="mt-3 sm:mt-0 w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-gradient-to-br from-persian-green-700 to-persian-green-300 text-base font-medium text-white hover:bg-gradient-to-b focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
        {{ $t('confirm') }}
    </button>
  </div>
</template>