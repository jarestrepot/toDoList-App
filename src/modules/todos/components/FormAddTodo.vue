<script>
  import { useTodosStore } from '../../../store/todos/todosUser';

  export default {
  data() {
    return {
      assetsTodos: useTodosStore(),
      resMessage: {
        stateResponse: false,
        message: '',
        color: false
      }
    };
  },
}
</script>
<template>
  <div class="flex justify-end items-center mb-5">
    <h2 class="textDegrant text-2xl font-bold text-center">Add TODO</h2>
  </div>

  <form class="max-w-md mx-auto">

    <div class="relative z-0 w-full mb-5 group">
      <label class="block mb-2 text-sm font-medium text-gray-900">Title:</label>
      <input 
        type="text"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Mi first todo" 
        required />
    </div>

    <div class="relative z-0 w-full mb-5 group">
      <label class="block mb-2 text-sm font-medium text-gray-900">Description:</label>
      <textarea
        rows="3" 
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Describing my first todo..."
        required />
    </div>

    <div class="relative z-0 w-full mb-5 group">
      <label class="block mb-2 text-sm font-medium text-gray-900">Category:</label>
      <select
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        required>
          <option value="" disabled selected>Select an option</option>
          <option v-for="category of assetsTodos.assets.category" :key="category" :value="category.codeCategory">{{ category.Category }}</option>
      </select>
    </div>

    <div class="relative z-0 w-full mb-5 group">
      <label class="block mb-2 text-sm font-medium text-gray-900">Status:</label>
      <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required>
        <option value="" disabled selected>Select an option</option>
        <option v-for="status of assetsTodos.assets.status" :key="status" :value="status.codeStatus">
          {{ status.Status }}
        </option>
    </select>
    </div>
    
    <div class="relative z-0 w-full mb-5 group gap-3 flex">
      <label class="block mb-2 text-sm font-medium text-gray-900">Importance:</label>
      <input v-for="important of assetsTodos.assets.importance" :key="important" :value="important.codeImportance" 
        type="radio" 
        name="importance"
        :title="important.Importance"
        :class= "{ 'border-red-500 checked:bg-red-500': important.Importance === 'High', 'border-yellow-300 checked:bg-yellow-300': important.Importance === 'Medium', 'border-green-500 checked:bg-green-500': important.Importance === 'Low' }"
        class="w-5 h-5 border-4 rounded-full focus:ring-0 checked:bg-none"/>
    </div>
    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row justify-end items-center">
      <span 
        v-if="resMessage.stateResponse"
        :class="resMessage.color ? 'text-green-500' : 'text-red-500'">
        {{ resMessage.message }}
      </span>
      <button 
        type="button"
        @click="$emit('closeModal')" 
        class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
      Cancel 
      </button>
      <!-- :class="editing ? 'opacity-100 cursor-pointer' : 'opacity-50 cursor-not-allowed'" -->
      <button
        type="submit"
        class="w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-gradient-to-br from-persian-green-700 to-persian-green-300 text-base font-medium text-white hover:bg-gradient-to-b focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
        Save
      </button>
    </div>
  </form>
</template>
