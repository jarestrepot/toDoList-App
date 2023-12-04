<script>
import { userAuthStore } from '../../../store/auth/authUser';
import { useTodosStore } from '../../../store/todos/todosUser';
import AddTodoIcon from '../../todos/components/icons/AddTodoIcon.vue';
import ArrowIcon from '../components/icons/ArrowIcon.vue';
import CloseIcon from '../components/icons/CloseIcon.vue';
import FilterIcon from './icons/FilterIcon.vue';
import FormAddTodo from '../../todos/components/FormAddTodo.vue';
import GridListToggle from '../../todos/components/GridListToggle.vue';
import ModalTodos from '../../todos/components/ModalTodos.vue';

export default {
  data() {
    return {
      openModal: false,
      storeTodos: useTodosStore(),
      storeAuth: userAuthStore()
    };
  },
  components: {
    AddTodoIcon,
    ArrowIcon,
    CloseIcon,
    FilterIcon,
    FormAddTodo,
    GridListToggle,
    ModalTodos,
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

    handleFilter(nameFilter, nameAsset) {
      const { getKeyAssets, getValuesAssets } = this.storeTodos;
      const { getFilterTodos, clearTodoFilter, todoFilter } = this.storeAuth

      clearTodoFilter();

      for (let key of getKeyAssets()) {
        if (key === nameAsset) {
          getFilterTodos(nameFilter, `${nameAsset[0].toUpperCase()}${nameAsset.slice(1)}`)
        }
      }

      const [filter] = this.$refs[nameFilter]
      const asset = this.$refs[nameAsset]

      for (let ref in getValuesAssets()) {
        if ( ref !== filter && todoFilter.length > 0 ) {
          const [otherFilter] = this.$refs[getValuesAssets()[ref]];
          filter.classList.add('text-slate-400', 'font-semibold');
          otherFilter.classList.remove('text-slate-400', 'font-semibold');
        }
      }
      for (let ref in getKeyAssets()){
        if ( ref !== asset && todoFilter.length > 0 ) {
          const otherAsset = this.$refs[getKeyAssets()[ref]];
          asset.classList.add('text-slate-400', 'font-semibold');
          otherAsset.classList.remove('text-slate-400', 'font-semibold');
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

        <div
          class="flex justify-between items-center cursor-pointer md:cursor-default hover:bg-gray-50 space-x-2 relative"
          @click="toggleVisibility('parentUl')">
          <FilterIcon />
          <span 
            v-if="storeAuth.todoFilter.length > 0"
            class="w-2 absolute right-0 top-0 h-2 rounded-full bg-blue-500">
          </span>
        </div>

        <ul 
          ref="parentUl"
          class="filter hidden md:block transition duration-300 absolute right-0 top-full md:w-48 bg-white md:shadow-lg rounded-b z-10">
          <li 
            @click="storeAuth.clearTodoFilter()"
            class="flex-col md:flex submenu cursor-pointer px-4 py-3 hover:bg-gray-50">
            All
          </li>
          <li 
            class="flex-col md:flex submenu cursor-pointer md:cursor-auto px-4 py-3 hover:bg-gray-50"
            @click="toggleVisibility('firstUl')">
            <div 
              ref="category" 
              class="inline-flex items-center gap-2">
              Category
              <ArrowIcon rotateIcon="md:rotate-90 rotate-[-90deg]" />
            </div>
            <ul 
              ref="firstUl"
              class="second-ul hidden transition duration-300 absolute left-32 md:left-auto top-0 md:top-0 w-full md:w-48 bg-white md:shadow-lg rounded md:p-3">
              <li v-for="{ codeCategory, Category } of storeTodos.getCategory" 
                :key="codeCategory"
                @click="handleFilter(Category, 'category')" 
                :ref="Category"
                class="cursor-pointer p-2 md:px-4 md:py-3 hover:bg-gray-50">
                {{ Category }}
              </li>
            </ul>
          </li>

          <li 
            class="flex-col md:flex submenu cursor-pointer md:cursor-auto px-4 py-3 hover:bg-gray-50"
            @click="toggleVisibility('secondUl')">
            <div 
              ref="status" 
              class="inline-flex items-center gap-2 text-black">
              Status
              <ArrowIcon rotateIcon="md:rotate-90 rotate-[-90deg]" />
            </div>
            <ul 
              ref="secondUl"
              class="second-ul hidden transition duration-300 absolute left-32 md:left-auto top-0 md:top-20 w-full md:w-48 bg-white md:shadow-lg rounded md:p-3">
              <li v-for="{ Status, codeStatus } of storeTodos.getStatus" 
                :key="codeStatus"
                @click="handleFilter(Status, 'status')" 
                :ref="Status"
                class="cursor-pointer p-2 md:px-4 py-3 hover:bg-gray-50">
                {{ Status }}
              </li>
            </ul>
          </li>

          <li 
            class="flex-col md:flex cursor-pointer md:cursor-auto submenu px-4 py-3 hover:bg-gray-50"
            @click="toggleVisibility('thirdUl')">
            <div 
              ref="importance" 
              class="inline-flex items-center gap-2">
              Importance
              <ArrowIcon rotateIcon="md:rotate-90 rotate-[-90deg]" />
            </div>
            <ul 
              ref="thirdUl"
              class="second-ul hidden transition duration-300 absolute left-32 md:left-auto top-0 md:top-[6.8rem] w-full md:w-48 bg-white md:shadow-lg md:rounded md:p-3">
              <li v-for="{ codeImportance, Importance } of storeTodos.getImportance" 
                :key="codeImportance"
                @click="handleFilter(Importance, 'importance')" 
                :ref="Importance"
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
        <AddTodoIcon 
          role="button" 
          @open-modal="openModal = true" />
      </li>
    </ul>
  </div>
<!-- MODAL -->
  <ModalTodos 
    :action="openModal"
    @escape="openModal = false" >
    <FormAddTodo 
      @closeModal="openModal = false" />
  </ModalTodos>
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