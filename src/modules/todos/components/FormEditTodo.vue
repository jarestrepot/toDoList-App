<script>
  import { userAuthStore, useTodosStore } from '../../../store';
  import { CONSTANTS } from '../../../helpers';
  import { CategoryIcon, ImportanceIcon, StatusIcon } from '../components/icons';

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
        storeTodos: useTodosStore(),
        storeAuth: userAuthStore(),
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
        const { updateTodoUser, user } = this.storeAuth;

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
      },
      getStatusModal(){
        if(this.todoSelected.Status !== 'In Progress'){
          return this.$t(this.todoSelected.Status)
        }
        else {
          return this.$t('InProgress')
        }
      },
    },
    mounted(){
      const { getImportance, getStatus, getCategory  } = this.storeTodos.getCodeAssets(this.todoSelected)
      this.codeStatus = getStatus.codeStatus;
      this.codeImportance = getImportance.codeImportance;
      this.codeCategory = getCategory.codeCategory;
    },
    updated(){
      if(this.storeTodos.getStatusCode(this.codeStatus) !== 'In Progress') {
        this.nameStatus = this.$t(this.storeTodos.getStatusCode(this.codeStatus))
      }else {
        this.nameStatus = this.$t('InProgress')
      }

      this.nameImportance = this.$t(this.storeTodos.getImportanceCode(this.codeImportance))
      this.nameCategory = this.$t(this.storeTodos.getCategoryCode(this.codeCategory))
    }
  }
</script>
<template>
  <div class="flex flex-col gap-6  px-4 py-3 sm:px-6">
    <div class="flex justify-end items-center">
      <h2 class="textDegrant text-2xl font-bold text-center">{{ $t('editTodo') }}</h2>
    </div>

    <form 
      @submit.prevent="updateTodoUser()" 
      class="flex flex-col gap-2">

      <div class="inline-flex items-center gap-2 w-full">
        <span 
          v-if="!editing"
          @click="startEditing" 
          class="text-xl font-semibold text-gray-800 uppercase dark:text-gray-300">  
          {{ title }}
        </span>
        <div 
          v-else 
          class="w-full inline-flex items-center gap-2">
          <span class="w-5/12 dark:text-slate-300">{{ $t('titleAddTodo') }}</span>
          <input
            type="text" 
            v-model="title"
            @keyup.enter="stopEditing"
            placeholder="The title of your todo"
            class="w-full h-full rounded-md border-0 focus:border-0 bg-transparent py-1 pl-2 pr-7 text-gray-500 sm:text-sm focus:ring-persian-green-500 focus:border-persian-green-500 dark:focus:bg-slate-800 dark:text-white dark:placeholder-slate-500" />
        </div>
      </div>
      <span 
        class="text-red-500 text-end pe-2" 
        v-if="!isValidTitle && title.length > 0">
        {{ $t('isRequiredTitle') }}
      </span>

      <div class="inline-flex items-center gap-2 w-full">
        <span 
          v-if="!editing"
          @click="startEditing" 
          class="py-2 text-gray-500 dark:text-slate-300">
          {{ description }}
        </span>
        <div 
          v-else 
          class="w-full inline-flex items-center gap-2">
          <span class="w-5/12 dark:text-slate-300">{{ $t('descriptionAddTodo') }}</span>
          <textarea
            rows="3" 
            type="text" 
            v-model="description" 
            @keyup.enter="stopEditing"
            placeholder="The description of your todo"
            class="w-full h-full rounded-md border-0 focus:border-0 bg-transparent py-1 pl-2 pr-7 text-gray-500 sm:text-sm focus:ring-persian-green-500 focus:border-persian-green-500 dark:focus:bg-slate-800 dark:text-white dark:placeholder-slate-500"/>
        </div>
      </div>
      <span 
        class="text-red-500 text-end pe-2" 
        v-if="!isValidDescription && description.length > 0">
        {{ $t('descriptionIsRequired') }}
      </span>

      <div class="inline-flex items-center gap-2 w-full">
        <StatusIcon />
        <span 
          v-if="!editing"
          class="dark:text-slate-300"
          @click="startEditing"> 
          {{ nameStatus ?? getStatusModal }}
        </span>
        <div 
          v-else
          class="w-full inline-flex items-center"> 
          <span class="w-5/12 dark:text-slate-300">{{ $t('status') }}:</span>
          <select
            v-model="codeStatus" 
            @keyup.enter="stopEditing"
            class="w-full h-full rounded-md border-0 focus:border-0 bg-transparent py-1 pl-2 pr-7 text-gray-500 sm:text-sm focus:ring-persian-green-500 focus:border-persian-green-500 dark:focus:bg-slate-800 dark:text-white">
            <option v-for="state of  storeTodos.assets.status" 
              :key="state" 
              :value="state.codeStatus">
              {{ state.Status === 'In Progress' ? $t('InProgress') : $t(`${state.Status}`) }}
            </option>
          </select>
        </div>
      </div>

      <div class="inline-flex items-center gap-2 w-full">
        <CategoryIcon />
        <span 
          v-if="!editing"
          class="dark:text-slate-300"
          @click="startEditing"> 
          {{ nameCategory ?? $t(`${todoSelected.Category}`) }}
        </span>
        <div 
          v-else
          class="w-full inline-flex items-center"> 
          <span class="w-5/12 dark:text-slate-300">{{ $t('category') }}:</span>
          <select
            v-model="codeCategory" 
            @keyup.enter="stopEditing"
            class="w-full h-full rounded-md border-0 focus:border-0 bg-transparent py-1 pl-2 pr-7 text-gray-500 sm:text-sm focus:ring-persian-green-500 focus:border-persian-green-500 dark:focus:bg-slate-800 dark:text-white">
            <option v-for="category of storeTodos.assets.category" 
              :key="category" 
              :value="category.codeCategory">
              {{ $t(`${category.Category}`) }}
            </option>
          </select>
        </div>
      </div>

      <div class="inline-flex items-center gap-2 w-full">
        <ImportanceIcon />
        <span 
          v-if="!editing"
          class="dark:text-slate-300"
          @click="startEditing"> 
          {{ nameImportance ?? $t(`${todoSelected.Importance}`) }}
        </span>
        <div 
          v-else
          class="w-full inline-flex items-center"> 
          <span class="w-5/12 dark:text-slate-300">{{ $t('importance') }}:</span>
          <select
            v-model="codeImportance"
            @keyup.enter="stopEditing"
            class="w-full h-full rounded-md border-0 focus:border-0 bg-transparent py-1 pl-2 pr-7 text-gray-500 sm:text-sm focus:ring-persian-green-500 focus:border-persian-green-500 dark:focus:bg-slate-800 dark:text-white">
            <option v-for="important of storeTodos.assets.importance" 
              :key="important" 
              :value="important.codeImportance">
              {{ $t(`${important.Importance}`) }}
            </option>
          </select>
        </div>
      </div>
      <div class="bg-gray-50 mt-6 sm:flex sm:flex-row justify-end items-center dark:bg-slate-900">
        <span 
          v-if="resMessage.stateResponse"
          :class="resMessage.color ? 'text-green-500': 'text-red-500'">
          {{ resMessage.message }}
        </span>
        <button 
          type="button"
          @click="$emit('closeModal')" 
          class="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm dark:bg-gray-700 dark:text-white dark:border-none">
          {{ $t('cancel') }}
        </button>
        <button
          type="submit"
          :disabled="!editing"
          :class="editing && isValidFields ? 'opacity-100 cursor-pointer' : 'opacity-50 cursor-not-allowed'"
          class="mt-3 sm:mt-0 w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-gradient-to-br from-persian-green-700 to-persian-green-300 text-base font-medium text-white hover:bg-gradient-to-b focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
          {{ $t('save') }}
        </button>
      </div>
    </form>

  </div>
</template>