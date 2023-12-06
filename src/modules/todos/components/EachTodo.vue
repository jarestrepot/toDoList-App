<script>
  import { userAuthStore } from '../../../store/auth/authUser';
  import { useTodosStore } from '../../../store/todos/todosUser';
  import ActionConfirm from './ActionConfirm.vue';
  import ArchiveTodoIcon from './icons/ArchiveTodoIcon.vue';
  import CategoryIcon from '../components/icons/CategoryIcon.vue';
  import ImportanceIcon from '../components/icons/ImportanceIcon.vue'
  import ModalTodos from './ModalTodos.vue';
  import StatusIcon from '../components/icons/StatusIcon.vue';
  import TodoIcon from '../components/icons/TodoIcon.vue'
  import TrashIcon from '../../auth/components/icons/TrashIcon.vue';

  export default {
    emits: ['click', 'openModalUpdate'],
    data () {
      return {
        storeTodos: useTodosStore(),
        storeAuth: userAuthStore(),
        messageDelete: '',
        openModalDelete: false,
        loading: false,
      }
    },
    props: {
      todo: Object
    },
    components: {
      ActionConfirm,
      ArchiveTodoIcon,
      CategoryIcon,
      ImportanceIcon,
      ModalTodos,
      StatusIcon,
      TodoIcon,
      TrashIcon,
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
      openModal({ id }) {
        this.$emit('openModalUpdate', id);
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
      AddArchiveTodo(id){
        const { archivedTodo } = this.storeAuth
        archivedTodo(id)
      },
      async deleteTodo(id){
        this.loading = true;
        const { deleteTodo } = this.storeAuth;
        this.messageDelete = await deleteTodo(id);
        this.loading = this.openModalDelete = false;
      },
      cancelModal(){
        this.openModalDelete = false
      },
    },
  }
</script>
<template>
  <!-- GRID -->
  <div 
    v-if="storeTodos.grid" 
    @click="openModal(todo)"
    :class="$route.name === 'archive' ? 'cursor-default' : 'cursor-pointer'"
    class="flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md min-h-full eachtodo dark:bg-slate-800 dark:text-slate-300">
    <div
      class="bg-clip-border mx-4 rounded-xl overflow-hidden shadow-lg  -mt-4 lg:-mt-7 grid h-10 w-10 place-items-center"
      :class="{ highImportacnce: todo.Importance === 'High', mediumImportacnce: todo.Importance === 'Medium', lowImportacnce: todo.Importance === 'Low' }">
      <TodoIcon size="h-10 w-10" />
    </div>
    <div class="p-3 text-right">
      <div class="flex justify-end gap-2">
        <CategoryIcon :className="getFillCategory(todo.Category)" />
        <p class="block antialiased font-sans text-sm leading-normal font-normal text-gray-400">{{ todo.Category }}</p>
      </div>
      <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">{{ getNewTitle(todo.title) }}</h4>
    </div>

    <div class="border-t border-blue-gray-50 p-3 flex flex-col justify-between">
      <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">{{ getNewDescription(todo.description) }} </p>
      <div class="flex flex-row-reverse justify-between pt-3">
        <div class="flex justify-end gap-2">
          <StatusIcon :className="getFillStatus(todo.Status)" />
          <p class="block antialiased font-sans text-sm leading-normal font-normal text-right text-gray-400">{{ todo.Status }}</p>
        </div>
        <div class="flex gap-1 items-center justify-end">
          <button 
            v-show="todo.Status === 'Completed'" 
            :title="todo.archived === 0 ? 'Archived' : 'Unarchive'" 
            @click.stop="AddArchiveTodo(todo.id)" 
            class="icons opacity-0">
            <ArchiveTodoIcon />
          </button>
          <button 
            class="icons opacity-0"  
            @click.stop="openModalDelete = true" 
            title="Delete" >
            <TrashIcon/>
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- LIST -->
  <tr  
  v-else 
  @click="openModal(todo)" 
  class="eachtodo" 
  :class="$route.name === 'archive' ? 'cursor-default' : 'cursor-pointer'">
    <td class="px-5 py-3 border-b border-gray-200 bg-white dark:bg-slate-800 dark:border-slate-600 text-sm">
      <p class="text-gray-900 whitespace-no-wrap dark:text-slate-300">{{ getNewTitle(todo.title) }}</p>
    </td>

    <td class="px-5 py-3 border-b border-gray-200 bg-white dark:bg-slate-800 dark:border-slate-600 text-sm">
      <p class="text-gray-900 whitespace-no-wrap dark:text-slate-300">{{ getNewDescription(todo.description) }}</p>
    </td>

    <td class="px-5 py-3 border-b border-gray-200 bg-white dark:bg-slate-800 dark:border-slate-600 text-sm">
      <div class="flex gap-2">
        <CategoryIcon :className="getFillCategory(todo.Category)" />
        <p class="text-gray-900 whitespace-no-wrap dark:text-slate-300">{{ todo.Category }}</p>
      </div>
    </td>

    <td class="px-5 py-3 border-b border-gray-200 bg-white dark:bg-slate-800 dark:border-slate-600 text-sm">
      <div class="flex gap-2">
        <StatusIcon :className="getFillStatus(todo.Status)" />
        <p class="text-gray-900 whitespace-no-wrap dark:text-slate-300">{{ todo.Status }}</p>
      </div>
    </td>

    <td class="px-5 py-3 border-b border-gray-200 bg-white dark:bg-slate-800 dark:border-slate-600 text-sm">
      <span
        :class="{ highImportacnce: todo.Importance === 'High', mediumImportacnce: todo.Importance === 'Medium', lowImportacnce: todo.Importance === 'Low' }"
        class="px-3 py-1 rounded-full text-black font-semibold uppercase text-center w-10">
        {{ todo.Importance }}
      </span>
    </td>

    <td class="w-[3rem] py-5 border-b border-gray-200 bg-white dark:bg-slate-800 dark:border-slate-500">
      <div class="flex gap-1 items-center justify-end">
        <button 
          v-show="todo.Status === 'Completed'" 
          :title="todo.archived === 0 ? 'Archived' : 'Unarchive'"  
          @click.stop="AddArchiveTodo(todo.id)" 
          class="icons opacity-0">
          <ArchiveTodoIcon />
        </button>
        <button 
          class="icons opacity-0" 
          title="Delete" 
          @click.stop="openModalDelete = true">
          <TrashIcon />
        </button>
      </div>
    </td>
  </tr>
  <!-- MODAL -->
  <ModalTodos
    :action="openModalDelete"
    @escape="openModalDelete = false">
    <ActionConfirm 
      @closeModal="cancelModal()"
      @deleteAccount="deleteTodo(todo.id)" 
      textModal="Are you sure you want to delete your todo?"/>
  </ModalTodos>
</template>

<style>
  .eachtodo:hover .icons{
    opacity: 1;
  }
</style>
