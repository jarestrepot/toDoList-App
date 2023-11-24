<template>
  <div class="flex justify-end items-center mb-5">
    <h2 class="textDegrant text-2xl font-bold text-center">Adding TODO...</h2>
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
        required
        placeholder="Describing my first task..."></textarea>
    </div>

    <div class="relative z-0 w-full mb-5 group">
      <label class="block mb-2 text-sm font-medium text-gray-900">Category:</label>
      <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required>
        <option value="" disabled selected>Select an option</option>
        <option value="1">Personal</option>
        <option value="2">Health</option>
        <option value="3">Education</option>
        <option value="4">Work</option>
        <option value="5">Others</option>
      </select>
    </div>

    <div class="relative z-0 w-full mb-5 group">
      <label class="block mb-2 text-sm font-medium text-gray-900">Status:</label>
      <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required>
        <option value="" disabled selected>Select an option</option>
        <option value="1">Pending ❌</option>
        <option value="2">In progress 🕗</option>
        <option value="3">Completed ✔</option>
    </select>
    </div>
    
    <div class="relative z-0 w-full mb-5 group gap-3 flex">
      <label class="block mb-2 text-sm font-medium text-gray-900">Importance:</label>
      <input type="radio" name="importance" value="1" class="w-5 h-5 border-4 border-red-500 rounded-full focus:ring-0 checked:bg-red-500 checked:bg-none"/>
      <input type="radio" name="importance" value="2" class="w-5 h-5 border-4 border-yellow-300 rounded-full focus:ring-0 checked:bg-yellow-300 checked:bg-none" />
      <input type="radio" name="importance" value="3" class="w-5 h-5 border-4 border-green-500 rounded-full focus:ring-0 checked:bg-green-500 checked:bg-none" />
    </div>
  </form>
</template>
