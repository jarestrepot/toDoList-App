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
      codeImportance: null,
      nameImportance:null,
      codeStatus:null,
      nameStatus: null,
      codeCategory: null,
      nameCategory: null,
      assetsTodos: useTodosStore(),
      userStore: userAuthStore(),
      resMessage: {
        stateResponse: false,
        message: '',
        color: false
      }
    };
  },
  methods: {
    startEditing() {
      this.editing = true;
    },
    stopEditing() {
      this.editing = false;
    },
    async updateTodoUser() {
      const { updateTodoUser, user } = this.userStore
      const updateTodoObject = {
        id: this.id,
        title: this.title,
        description: this.description,
        status: this.codeStatus,
        importance: this.codeImportance,
        category: this.codeCategory,
        userRef: user.user_id
      }
      const response = await updateTodoUser(updateTodoObject);
      if(response.Error){
        this.resMessage = {
          stateResponse: true,
          message: response.Error,
        }
      }else{
        this.resMessage = {
          stateResponse: true,
          message: response.msg,
          color: true
        }
      }
      this.editing = false;
    },
    getNameStatus() {
      const { getStatusCode } = this.assetsTodos
      const [propertiesStatus] = getStatusCode(this.codeStatus);
      return propertiesStatus.Status
    },
    getNameImportance(){
      const { getImportanceCode } = this.assetsTodos
      const [propertiesImportance] = getImportanceCode(this.codeImportance)
      return propertiesImportance.Importance
    },
    getNameCategory(){
      const { getCategoryCode } = this.assetsTodos
      const [ propertiesCategory ] = getCategoryCode(this.codeCategory)
      return propertiesCategory.Category
    }
  },
  components: {
    StatusIcon,
    CategoryIcon,
    ImportanceIcon
  },
  props: {
    todoSelected: Object
  },
  mounted(){
    const { getImportance, getStatus, getCategory  } = this.assetsTodos.getCodeAssets(this.todoSelected)
    this.codeStatus = getStatus.codeStatus;
    this.codeImportance = getImportance.codeImportance;
    this.codeCategory = getCategory.codeCategory;
  },
  updated(){
    this.nameStatus = this.getNameStatus()
    this.nameImportance = this.getNameImportance()
    this.nameCategory = this.getNameCategory()
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
          {{ title }}
        </span>
        <div v-else class="w-full inline-flex items-center gap-2">
          <span class="w-5/12">Title:</span>
          <input v-model="title" @keyup.enter="stopEditing"
            class="w-full h-full outline-0 focus:border focus:border-blue-500 rounded-md bg-transparent py-1 pl-2 pr-7 text-gray-500 sm:text-sm" />
        </div>
      </div>


      <div>
        <span class="py-2 text-gray-500" @click="startEditing" v-if="!editing">
          {{ description }}
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
          {{ nameStatus ?? todoSelected.Status  }}
        </span>
        <div class="w-full inline-flex items-center" v-else>
          <span class="w-5/12">Status:</span>
          <select
            class="w-full h-full rounded-md border-0 focus:border-0 bg-transparent py-1 pl-2 pr-7 text-gray-500 sm:text-sm"
            v-model="codeStatus" @keyup.enter="stopEditing">
            <option v-for="state of  assetsTodos.assets.status" :key="state" :value="state.codeStatus">
              {{ state.Status }}
            </option>
          </select>
        </div>
      </div>

      <div class="inline-flex items-center gap-2 w-full">
        <CategoryIcon />
        <span @click="startEditing" v-if="!editing">
          {{ nameCategory ?? todoSelected.Category }}
        </span>
        <div class="w-full inline-flex items-center" v-else>
          <span class="w-5/12">Category:</span>
          <select
            class="w-full h-full rounded-md border-0 focus:border-0 bg-transparent py-1 pl-2 pr-7 text-gray-500 sm:text-sm"
            v-model="codeCategory" @keyup.enter="stopEditing">
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
          {{ nameImportance ?? todoSelected.Importance }}
        </span>
        <div class="w-full inline-flex items-center" v-else>
          <span class="w-5/12">Importance:</span>
          <select
            class="w-full h-full rounded-md border-0 focus:border-0 bg-transparent py-1 pl-2 pr-7 text-gray-500 sm:text-sm"
            v-model="codeImportance" @keyup.enter="stopEditing">
            <option v-for="important of assetsTodos.assets.importance" :key="important" :value="important.codeImportance">
              {{ important.Importance }}
            </option>
          </select>
        </div>
      </div>
      <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row justify-end items-center">
        <span v-if="resMessage.stateResponse" :class="resMessage.color ? 'text-green-500': 'text-red-500'">
          {{ resMessage.message }}
        </span>
        <button @click="$emit('closeModal')" type="button"
        class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
        Cancel </button>
        <button
          :disabled="!editing"
          type="submit"
          :class="editing ? 'opacity-100 cursor-pointer' : 'opacity-50 cursor-not-allowed'"
          class="w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-gradient-to-br from-persian-green-700 to-persian-green-300 text-base font-medium text-white hover:bg-gradient-to-b focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
          Save </button>
      </div>
    </form>

  </div>
</template>