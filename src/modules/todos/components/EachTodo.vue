<script>
import TodoIcon from '../components/icons/TodoIcon.vue'
import CategoryIcon from '../components/icons/CategoryIcon.vue';
import ImportanceIcon from '../components/icons/ImportanceIcon.vue'
import StatusIcon from '../components/icons/StatusIcon.vue';
import { useTodosStore } from '../../../store/todos/todosUser';

export default {
  data () {
    return {
      todosStore: useTodosStore()
    }
  },
  props: {
    todo: Object
  },
  components: {
    TodoIcon,
    ImportanceIcon,
    CategoryIcon,
    StatusIcon,
  },
  methods: {
    getFillCategory(category) {
      const optionsColor = {
        Education: '#FD9900',
        Work: '#FE339A',
        Personal: '#AC81FF',
        Health: '#538ED5',
        Others: '#925B37'
      };
      return optionsColor[category]
    },
    getFillStatus(status) {
      const statusP = status.split(" ").join("");

      const optionsColor = {
        Pending: '#0B0B61 ',
        InProgress: '#0000FF',
        Completed: '#ADD8E6 ',
      };
      return optionsColor[statusP]
    },
    openModal() {
      this.$emit('open-modal');
    },
    getNewTitle(title) {
      let newTitle = `${title[0].toUpperCase()}${title.slice(1)}`;

      if (title.length > 25) {
        return newTitle = `${newTitle.substring(0, 19)}...`;
      }
      return newTitle;
    },
    getNewDescription(description) {
      let newDescription = `${description[0].toUpperCase()}${description.slice(1)}`;

      if (newDescription.length > 40) {
        return newDescription = `${newDescription.substring(0, 35)}...`;
      }
      return newDescription;
    },
  },
}
</script>
<template>
  <div v-if="todosStore.grid" @click="openModal()"
    class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md min-h-full">
    <div
      class="bg-clip-border mx-4 rounded-xl overflow-hidden shadow-lg absolute -mt-4 lg:-mt-7 grid h-10 w-10 place-items-center"
      :class="{ highImportacnce: todo.Importance === 'High', mediumImportacnce: todo.Importance === 'Medium', lowImportacnce: todo.Importance === 'Low' }">
      <TodoIcon size="h-10 w-10" />
    </div>
    <div class="p-3 text-right">
      <div class="flex justify-end gap-2">
        <CategoryIcon :className="getFillCategory(todo.Category)" />
        <p class="block antialiased font-sans text-sm leading-normal font-normal text-gray-400">{{ todo.Category }}</p>
      </div>
      <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">{{
        getNewTitle(todo.title) }}</h4>
    </div>
    <div class="border-t border-blue-gray-50 p-3 flex flex-col justify-between">
      <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
        {{ getNewDescription(todo.description) }}
      </p>
      <div class="flex justify-end gap-2">
        <StatusIcon :className="getFillStatus(todo.Status)" />
        <p class="block antialiased font-sans text-sm leading-normal font-normal text-right text-gray-400">{{ todo.Status
        }}</p>
      </div>

    </div>
  </div>

  <tr v-else @click="openModal()">
    <td class="ps-3 py-5 border-b border-gray-200 bg-white text-sm">
      <p class="text-gray-900 whitespace-no-wrap">{{ getNewTitle(todo.title) }}</p>
    </td>

    <td class="ps-3 py-5 border-b border-gray-200 bg-white text-sm">
      <p class="text-gray-900 whitespace-no-wrap">{{ getNewDescription(todo.description) }}</p>
    </td>

    <td class="ps-3 py-5 border-b border-gray-200 bg-white text-sm">
      <div class="flex gap-2">
        <CategoryIcon :className="getFillCategory(todo.Category)" />

        <p class="text-gray-900 whitespace-no-wrap">{{ todo.Category }}</p>
      </div>
    </td>

    <td class="ps-3 py-5 border-b border-gray-200 bg-white text-sm">
      <div class="flex gap-2">
        <StatusIcon :className="getFillStatus(todo.Status)" />
        <p class="text-gray-900 whitespace-no-wrap">{{ todo.Status }}</p>
      </div>
    </td>

    <td class="ps-3 py-5 border-b border-gray-200 bg-white text-sm">
      <span class="relative inline-block px-3 py-1 font-semibold leading-tight">
        <span
          :class="{ highImportacnce: todo.Importance === 'High', mediumImportacnce: todo.Importance === 'Medium', lowImportacnce: todo.Importance === 'Low' }"
          class="absolute inset-0 rounded-full"></span>
        <span class="relative">{{ todo.Importance }}</span>
      </span>
    </td>
  </tr>
</template>

