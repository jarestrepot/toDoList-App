<script>
  export default {
    emits: ['deleteAccount', 'closeModal'],
    props: {
      textModal: String
    }
  }

</script>

<template>
  <div class="relative p-4">
    <p>{{ textModal }}</p>
  </div>
  <!--Modal footer-->
  <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row justify-end items-center">
    <button type="button" @click="$emit('closeModal')"
      class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
      Cancel
    </button>
    <button type="button"
      @click="$emit('deleteAccount')"
      class="w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-gradient-to-br from-persian-green-700 to-persian-green-300 text-base font-medium text-white hover:bg-gradient-to-b focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
      Confirm
    </button>
  </div>
</template>