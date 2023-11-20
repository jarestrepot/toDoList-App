<script>
import FormEditTodo from './FormEditTodo.vue';

export default {
  props: {
    action: Boolean,
    event: Function,
    // TODO: pasar componente
  },
  components: {
    FormEditTodo,
}
}
</script>

<template>
  <div v-if="action">
    <div class="flex items-center justify-center h-screen">
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <div class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="w-full inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <!-- ! pasar este componente como prop para reutilizarlo en editar y crear -->
              <FormEditTodo />
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button @click="event" type="submit" class="w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-gradient-to-br from-persian-green-700 to-persian-green-300 text-base font-medium text-white hover:bg-gradient-to-b focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                Save </button>
              <button @click="event" type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                Cancel </button>
            </div> 
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
z


