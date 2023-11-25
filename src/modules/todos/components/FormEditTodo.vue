<script>
import StatusIcon from '../components/icons/StatusIcon.vue';
import CategoryIcon from '../components/icons/CategoryIcon.vue';
import ImportanceIcon from '../components/icons/ImportanceIcon.vue';
import { useTodosStore } from '../../../store/todos/todosUser'
import { userAuthStore } from '../../../store/auth/authUser'
export default {
  data() {
    return {
      editing: false,
      id: this.todoSelected.id,
      title: this.todoSelected.title,
      description: this.todoSelected.description,
      status: this.todoSelected.Status,
      category: this.todoSelected.Category,
      importance: this.todoSelected.Importance,
      assetsTodos: useTodosStore(),
      userStore: userAuthStore()
    };
  },
  methods: {
    startEditing() {
      this.editing = true;
    },
    stopEditing() {
      this.editing = false;
    },
    updateTodoUser() {
      const { updateTodoUser, user } = this.userStore
      const updateTodoObject = {
        id: this.id,
        title: this.title,
        description: this.description,
        status: this.status,
        importance: this.importance,
        category: this.category,
        userRef: user.user_id
      }
      updateTodoUser(updateTodoObject)
    }
  },
  components: {
    StatusIcon,
    CategoryIcon,
    ImportanceIcon
  },
  props: {
    todoSelected: Object
  }
}
</script>
<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-end items-center">
      <h2 class="textDegrant text-2xl font-bold text-center">Edit your TODO</h2>
    </div>
    <form @submit.prevent="updateTodoUser()">
      <div>
        <span class="text-xl font-semibold text-gray-800 uppercase" @click="startEditing" v-if="!editing">
          {{ todoSelected.title }}
        </span>
        <div v-else class="w-full inline-flex items-center gap-2">
          <span class="w-5/12">Title:</span>
          <input v-model="title" @keyup.enter="stopEditing"
            class="w-full h-full outline-0 focus:border focus:border-blue-500 rounded-md bg-transparent py-1 pl-2 pr-7 text-gray-500 sm:text-sm" />
        </div>
      </div>


      <div>
        <span class="py-2 text-gray-500" @click="startEditing" v-if="!editing">
          {{ todoSelected.description }}
        </span>
        <div v-else class="w-full inline-flex items-center gap-2">
          <span class="w-5/12">Description:</span>
          <textarea
            class="w-full h-full rounded-md border-0 focus:border-0 bg-transparent py-1 pl-2 pr-7 text-gray-500 sm:text-sm"
            rows="3" type="text" v-model="description" @keyup.enter="stopEditing">
              </textarea>
        </div>
      </div>

      <div class="inline-flex items-center gap-2 w-full">
        <StatusIcon />
        <span @click="startEditing" v-if="!editing">
          {{ todoSelected.Status }}
        </span>
        <div class="w-full inline-flex items-center" v-else>
          <span class="w-5/12">Status:</span>
          <select
            class="w-full h-full rounded-md border-0 focus:border-0 bg-transparent py-1 pl-2 pr-7 text-gray-500 sm:text-sm"
            v-model="status" @keyup.enter="stopEditing">
            <option v-for="state of  assetsTodos.assets.status" :key="state" :value="state.codeStatus">
              {{ state.Status }}
            </option>
          </select>
        </div>
      </div>

      <div class="inline-flex items-center gap-2 w-full">
        <CategoryIcon />
        <span @click="startEditing" v-if="!editing">
          {{ todoSelected.Category }}
        </span>
        <div class="w-full inline-flex items-center" v-else>
          <span class="w-5/12">Category:</span>
          <select
            class="w-full h-full rounded-md border-0 focus:border-0 bg-transparent py-1 pl-2 pr-7 text-gray-500 sm:text-sm"
            v-model="category" @keyup.enter="stopEditing">
            <option class="text-gray-500" v-for="category of assetsTodos.assets.category" :key="category"
              :value="category.codeCategory">
              {{ category.Category }}
            </option>
          </select>
        </div>
      </div>

      <div class="inline-flex items-center gap-2 w-full">
        <ImportanceIcon />
        <span @click="startEditing" v-if="!editing">
          {{ todoSelected.Importance }}
        </span>
        <div class="w-full inline-flex items-center" v-else>
          <span class="w-5/12">Importance:</span>
          <select
            class="w-full h-full rounded-md border-0 focus:border-0 bg-transparent py-1 pl-2 pr-7 text-gray-500 sm:text-sm"
            v-model="importance" @keyup.enter="stopEditing">
            <option v-for="important of assetsTodos.assets.importance" :key="important" :value="important.codeImportance">
              {{ important.Importance }}
            </option>
          </select>
        </div>
      </div>
      <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button type="submit"
          class="w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-gradient-to-br from-persian-green-700 to-persian-green-300 text-base font-medium text-white hover:bg-gradient-to-b focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
          Save </button>
        <button @click="$emit('closeModal')" type="button"
          class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
          Cancel </button>
      </div>
    </form>

  </div>
</template>