<script>
import StatusIcon from '../components/icons/StatusIcon.vue';
import CategoryIcon from '../components/icons/CategoryIcon.vue';
import ImportanceIcon from '../components/icons/ImportanceIcon.vue';
import { useTodosStore } from '../../../store/todos/todosUser';
import { userAuthStore } from '../../../store/auth/authUser';
import CONSTANTS from '../../../helpers/constants';

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
      const { updateTodoUser, user } = this.userStore;

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
  computed: {
    isValidTitle() {
      return CONSTANTS.VALIDINPUT.test(this.title)
    },
    isValidDescription() {
      return CONSTANTS.VALIDNUMCHARACTERES.test(this.description)
    },
    isValidFields() {
      return this.isValidTitle && this.isValidDescription
    }
  },
  mounted(){
    const { getImportance, getStatus, getCategory  } = this.assetsTodos.getCodeAssets(this.todoSelected)
    this.codeStatus = getStatus.codeStatus;
    this.codeImportance = getImportance.codeImportance;
    this.codeCategory = getCategory.codeCategory;
  },
  updated(){
    this.nameStatus = this.assetsTodos.getStatusCode(this.codeStatus)
    this.nameImportance = this.assetsTodos.getImportanceCode(this.codeImportance)
    this.nameCategory = this.assetsTodos.getCategoryCode(this.codeCategory)
  }
}
</script>
<template>
  <div class="flex flex-col gap-6">
    <div class="flex justify-end items-center">
      <h2 class="textDegrant text-2xl font-bold text-center">Edit your TODO</h2>
    </div>

    <form @submit.prevent="updateTodoUser()" class="flex flex-col gap-2">

      <div class="inline-flex items-center gap-2 w-full">
        <span 
          v-if="!editing"
          @click="startEditing" 
          class="text-xl font-semibold text-gray-800 uppercase">  
          {{ title }}
        </span>
        <div 
          v-else 
          class="w-full inline-flex items-center gap-2">
          <span class="w-5/12">Title:</span>
          <input 
            v-model="title" 
            @keyup.enter="stopEditing"
            class="w-full h-full outline-0 focus:border focus:border-blue-500 rounded-md bg-transparent py-1 pl-2 pr-7 text-gray-500 sm:text-sm" 
          />
        </div>
      </div>
      <span class="text-red-500 text-end pe-2" v-if="!isValidTitle && title.length > 0">
        Title is required
      </span>

      <div class="inline-flex items-center gap-2 w-full">
        <span 
          v-if="!editing"
          @click="startEditing" 
          class="py-2 text-gray-500">
          {{ description }}
        </span>
        <div 
          v-else 
          class="w-full inline-flex items-center gap-2">
          <span class="w-5/12">Description:</span>
          <textarea
            rows="3" 
            type="text" 
            v-model="description" 
            @keyup.enter="stopEditing"
            class="w-full h-full rounded-md border-0 focus:border-0 bg-transparent py-1 pl-2 pr-7 text-gray-500 sm:text-sm">
          </textarea>
        </div>
      </div>
      <span class="text-red-500 text-end pe-2" v-if="!isValidDescription && description.length > 0">
        Description is required
      </span>

      <div class="inline-flex items-center gap-2 w-full">
        <StatusIcon />
        <span 
          v-if="!editing"
          @click="startEditing"> 
          {{ nameStatus ?? todoSelected.Status  }}
        </span>
        <div 
          v-else
          class="w-full inline-flex items-center"> 
          <span class="w-5/12">Status:</span>
          <select
            v-model="codeStatus" 
            @keyup.enter="stopEditing"
            class="w-full h-full rounded-md border-0 focus:border-0 bg-transparent py-1 pl-2 pr-7 text-gray-500 sm:text-sm">
            <option v-for="state of  assetsTodos.assets.status" :key="state" :value="state.codeStatus">
              {{ state.Status }}
            </option>
          </select>
        </div>
      </div>

      <div class="inline-flex items-center gap-2 w-full">
        <CategoryIcon />
        <span 
          v-if="!editing"
          @click="startEditing"> 
          {{ nameCategory ?? todoSelected.Category }}
        </span>
        <div 
          v-else
          class="w-full inline-flex items-center"> 
          <span class="w-5/12">Category:</span>
          <select
            v-model="codeCategory" 
            @keyup.enter="stopEditing"
            class="w-full h-full rounded-md border-0 focus:border-0 bg-transparent py-1 pl-2 pr-7 text-gray-500 sm:text-sm">
            <option v-for="category of assetsTodos.assets.category" :key="category" :value="category.codeCategory">
              {{ category.Category }}
            </option>
          </select>
        </div>
      </div>

      <div class="inline-flex items-center gap-2 w-full">
        <ImportanceIcon />
        <span 
          v-if="!editing"
          @click="startEditing"> 
          {{ nameImportance ?? todoSelected.Importance }}
        </span>
        <div 
          v-else
          class="w-full inline-flex items-center"> 
          <span class="w-5/12">Importance:</span>
          <select
            v-model="codeImportance"
            @keyup.enter="stopEditing"
            class="w-full h-full rounded-md border-0 focus:border-0 bg-transparent py-1 pl-2 pr-7 text-gray-500 sm:text-sm">
            <option v-for="important of assetsTodos.assets.importance" :key="important" :value="important.codeImportance">
              {{ important.Importance }}
            </option>
          </select>
        </div>
      </div>
      <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row justify-end items-center">
        <span 
          v-if="resMessage.stateResponse"
          :class="resMessage.color ? 'text-green-500': 'text-red-500'">
          {{ resMessage.message }}
        </span>
        <button 
          type="button"
          @click="$emit('closeModal')" 
          class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
        Cancel 
        </button>
        <button
          type="submit"
          :disabled="!editing"
          :class="editing && isValidFields ? 'opacity-100 cursor-pointer' : 'opacity-50 cursor-not-allowed'"
          class="w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-gradient-to-br from-persian-green-700 to-persian-green-300 text-base font-medium text-white hover:bg-gradient-to-b focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
          Save
        </button>
      </div>
    </form>

  </div>
</template>