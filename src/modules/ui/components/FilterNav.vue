<script>
import GridListToggle from '../../todos/components/GridListToggle.vue';
import DownIcon from '../components/icons/DownIcon.vue';
import CloseIcon from '../components/icons/CloseIcon.vue';
import AddTodoIcon from '../../todos/components/icons/AddTodoIcon.vue';
import ModalTodos from '../../todos/components/ModalTodos.vue';
import FormAddTodo from '../../todos/components/FormAddTodo.vue';
import { useTodosStore } from '../../../store/todos/todosUser';
import { userAuthStore } from '../../../store/auth/authUser';
import FilterIcon from './icons/FilterIcon.vue';

export default {
  data() {
    return {
      openModal: false,
      storeTodo: useTodosStore(),
      authStore: userAuthStore()
    };
  },
  components: {
    GridListToggle,
    DownIcon,
    CloseIcon,
    AddTodoIcon,
    ModalTodos,
    FormAddTodo,
    FilterIcon
},
  methods: {
    toggleVisibility(element) {
      const elements = {
        'parentUl': 'parentUl',
        'firstUl': 'firstUl',
        'secondUl': 'secondUl',
        'thirdUl': 'thirdUl'
      };

      const { classList } = this.$refs[element];
      for (const key in elements) {
        if (key !== element && key !== 'parentUl') {
          const otherElement = this.$refs[elements[key]];
          otherElement.classList.remove('visible');
          otherElement.classList.add('hidden');
        }
      }
      
      if (classList.contains('hidden')) {
        classList.remove('hidden');
        classList.add('visible'); return;
      }
      classList.remove('visible');
      classList.add('hidden');
    },

    handleFilter(nameFilter, nameAsset){
      const { assets } = this.storeTodo;
      const { getFilterTodos, clearTodoFilter } = this.authStore
      const keysAssets = Object.keys(assets);
      clearTodoFilter()
      for(let key of keysAssets){
        if(key === nameAsset){
          getFilterTodos(nameFilter, `${nameAsset[0].toUpperCase()}${nameAsset.slice(1)}`)
        }
      }

    }
  }
}
</script>
<template>
  <div class="flex items-center justify-end">
    <ul class="md:p-3 md:ml-auto flex md:space-x-2 md:relative top-full left-0 right-0 md:items-center gap-4 md:gap-1 justify-end">
      <li class="relative filters">

        <div class="flex justify-between items-center cursor-pointer md:cursor-default hover:bg-gray-50 space-x-2 relative" @click="toggleVisibility('parentUl')">
          <FilterIcon />
        </div>

        <ul ref="parentUl"
          class="filter hidden md:block transition duration-300 absolute right-0 top-full md:w-48 bg-white md:shadow-lg rounded-b z-10">
          <li
            @click="authStore.clearTodoFilter()"
            class="flex-col md:flex submenu cursor-pointer px-4 py-3 hover:bg-gray-50">
            All
          </li>
          <li class="flex-col md:flex submenu cursor-pointer md:cursor-auto px-4 py-3 hover:bg-gray-50" @click="toggleVisibility('firstUl')" >
            <div class="inline-flex items-center gap-2" >
              Category
              <DownIcon rotateIcon="md:rotate-90 rotate-[-90deg]" />
            </div>
            <ul ref="firstUl"
              class="second-ul hidden transition duration-300 absolute left-32 md:left-auto top-0 md:top-0 w-full md:w-48 bg-white md:shadow-lg rounded md:p-3">
              <li class="cursor-pointer p-2 md:px-4 md:py-3 hover:bg-gray-50"
                v-for="{ codeCategory, Category } of storeTodo.getCategory" :key="codeCategory"
                @click="handleFilter(Category, 'category')"
              >
                {{ Category }}
              </li>
            </ul>
          </li>

          <li class="flex-col md:flex submenu cursor-pointer md:cursor-auto px-4 py-3 hover:bg-gray-50" @click="toggleVisibility('secondUl')" >
            <div class="inline-flex items-center gap-2" >
              Status
              <DownIcon rotateIcon="md:rotate-90 rotate-[-90deg]"/>
            </div>
            <ul ref="secondUl"
              class="second-ul hidden transition duration-300 absolute left-32 md:left-auto top-0 md:top-20 w-full md:w-48 bg-white md:shadow-lg rounded md:p-3">
              <li v-for="{ Status, codeStatus } of storeTodo.getStatus" :key="codeStatus" @click="handleFilter(Status, 'status')"
                class="cursor-pointer p-2 md:px-4 py-3 hover:bg-gray-50">
                {{ Status }}
              </li>
            </ul>
          </li>

          <li class="flex-col md:flex cursor-pointer md:cursor-auto submenu px-4 py-3 hover:bg-gray-50" @click="toggleVisibility('thirdUl')" >
            <div class="inline-flex items-center gap-2" >
              Importance
              <DownIcon rotateIcon="md:rotate-90 rotate-[-90deg]"/>
            </div>
            <ul ref="thirdUl"
              class="second-ul hidden transition duration-300 absolute left-32 md:left-auto top-0 md:top-[6.8rem] w-full md:w-48 bg-white md:shadow-lg md:rounded md:p-3">
              <li v-for="{ codeImportance, Importance } of storeTodo.getImportance" :key="codeImportance" @click="handleFilter(Importance, 'importance')"
                class="cursor-pointer p-2 md:px-4 py-3 hover:bg-gray-50">
                {{ Importance }}
              </li>
            </ul>
          </li>
        </ul>
      </li>

      <li>
        <GridListToggle />
      </li>

      <li>
        <AddTodoIcon role="button" @open-modal="openModal = true" />
        <ModalTodos :action="openModal">
          <FormAddTodo @closeModal="openModal = false" />
        </ModalTodos>
      </li>

    </ul>
  </div>
</template>

<style>
@media only screen and (min-width: 768px) {

  .filters:hover .filter {
    opacity: 1;
    height: auto;
    overflow: visible;
    transform: translate(0);
  }

  .filter {
    opacity: 0;
    height: 0;
    overflow: hidden;
    transform: translateY(-10%);
  }

  .second-ul {
    display: none;
    position: absolute;
  }

  .submenu:hover>.second-ul {
    display: block;
    position: absolute;
    right: 12rem;
  }
}

@media only screen and (max-width: 767px) {
  .visible {
    display: block;
  }
}
</style>