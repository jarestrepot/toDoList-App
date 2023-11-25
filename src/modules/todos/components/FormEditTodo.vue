<script>
import StatusIcon from '../components/icons/StatusIcon.vue';
import CategoryIcon from '../components/icons/CategoryIcon.vue';
import ImportanceIcon from '../components/icons/ImportanceIcon.vue';
import { userAuthStore } from '../../../store/auth/authUser';

export default {
  data() {
    return {
      editing: false,
      store: userAuthStore()
    };
  },
  methods: {
    startEditing() {
        this.editing = true;
    },
    stopEditing() {
        this.editing = false;
    },
  },
  components: { 
    StatusIcon,
    CategoryIcon,
    ImportanceIcon
  },
  props: {
    todoSelected:Object
  }
}
</script>
<template>
  <div @click="getId(id)" class="flex flex-col gap-4">
    <div class="flex justify-end items-center">
      <h2 class="textDegrant text-2xl font-bold text-center">Edit your TODO</h2>
    </div>

    <div>
      <span
        class="text-xl font-semibold text-gray-800 uppercase"
        @click="startEditing" 
        v-if="!editing">
        {{ todoSelected.title }}
      </span>
      <div v-else class="w-full inline-flex items-center gap-2">
        <span class="w-5/12">Title:</span>
      <input 
        v-model="title" 
        @keyup.enter="stopEditing"
        class="w-full h-full outline-0 focus:border focus:border-blue-500 rounded-md bg-transparent py-1 pl-2 pr-7 text-gray-500 sm:text-sm"/></div>
    </div>


    <div>
      <span 
        class="py-2 text-gray-500"
        @click="startEditing" 
        v-if="!editing">
        {{ description }}
      </span>
      <div v-else class="w-full inline-flex items-center gap-2">
        <span class="w-5/12">Description:</span>
        <textarea
          class="w-full h-full rounded-md border-0 focus:border-0 bg-transparent py-1 pl-2 pr-7 text-gray-500 sm:text-sm"
          rows="3"
          type="text"
          v-model="description"
          @keyup.enter="stopEditing">
        </textarea>
      </div>
    </div>

    <div class="inline-flex items-center gap-2 w-full">
      <StatusIcon />
      <span 
        @click="startEditing" 
        v-if="!editing">
        {{ status }}
      </span>
      <div class="w-full inline-flex items-center" v-else>
        <span class="w-5/12">Status:</span>
        <select
          class="w-full h-full rounded-md border-0 focus:border-0 bg-transparent py-1 pl-2 pr-7 text-gray-500 sm:text-sm"
          v-model="status"
          @keyup.enter="stopEditing">
          <option>Pending</option>
          <option>In progress</option>
          <option>Completed</option>
        </select>
      </div>
    </div>

    <div class="inline-flex items-center gap-2 w-full">
      <CategoryIcon />
      <span 
        @click="startEditing" 
        v-if="!editing">
        {{ category }}
      </span>
      <div class="w-full inline-flex items-center" v-else>
        <span class="w-5/12">Category:</span>
        <select
          class="w-full h-full rounded-md border-0 focus:border-0 bg-transparent py-1 pl-2 pr-7 text-gray-500 sm:text-sm"
          v-model="category"
          @keyup.enter="stopEditing">
          <option>Personal</option>
          <option>Health</option>
          <option>Education</option>
          <option>Work</option>
          <option>Others</option>
        </select>
      </div>
    </div>

    <div class="inline-flex items-center gap-2 w-full">
      <ImportanceIcon />
      <span 
        @click="startEditing" 
        v-if="!editing">
        {{ importance }}
      </span>
      <div class="w-full inline-flex items-center" v-else>
        <span class="w-5/12">Importance:</span>
        <select
          class="w-full h-full rounded-md border-0 focus:border-0 bg-transparent py-1 pl-2 pr-7 text-gray-500 sm:text-sm"
          v-model="importance"
          @keyup.enter="stopEditing">
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>
    </div>
  </div>
</template>