<script>
import GridListToggle from '../../todos/components/GridListToggle.vue';
import DownIcon from '../components/icons/DownIcon.vue';
import CloseIcon from '../components/icons/CloseIcon.vue';
import AddTodoIcon from '../../todos/components/icons/AddTodoIcon.vue';
import ModalTodos from '../../todos/components/ModalTodos.vue';
import FormAddTodo from '../../todos/components/FormAddTodo.vue';
import { useTodosStore } from '../../../store/todos/todosUser';

export default {
  data() {
    return {
      openModal: false,
      storeTodo: useTodosStore()
    };
  },
  components: {
    GridListToggle,
    DownIcon,
    CloseIcon,
    AddTodoIcon,
    ModalTodos,
    FormAddTodo,
  }
}
</script>
<template>
  <div class="flex items-center relative">
    <ul class="md:p-3 ml-auto md:flex md:space-x-2 md:relative top-full left-0 right-0 items-center gap-1">
      <li class="relative filters">

        <div class="flex justify-between md:inline-flex items-center hover:bg-gray-50 space-x-2">
          <span class="text-slate-500">Filter</span>
          <DownIcon />
        </div>

        <ul
          class="filter transition duration-300 md:absolute top-full right-0 md:w-48 bg-white md:shadow-lg md:rounded-b z-10"
        >
          <li 
            class="flex submenu px-4 py-3 hover:bg-gray-50">
            Category
            <ul
              class="second-ul transition duration-300 relative right-[24rem] md:w-48 bg-white md:shadow-lg md:rounded p-3">
              <li 
                class="cursor-pointer px-4 py-3 hover:bg-gray-50"
                v-for="{ codeCategory ,Category } of storeTodo.getCategory" :key="codeCategory"
              >
                {{ Category }}
              </li>
            </ul>
          </li>


          <li class="flex submenu px-4 py-3 hover:bg-gray-50" 
            
          >
            Status
            <ul
              class="second-ul transition duration-300 md:absolute top-20 right-[-24rem] md:w-48 bg-white md:shadow-lg md:rounded p-3">
              <li 
                v-for="{ Status, codeStatus } of storeTodo.getStatus" :key="codeStatus"
                class="cursor-pointer px-4 py-3 hover:bg-gray-50"
              >
                {{ Status }}
              </li>
            </ul>
          </li>
          <li class="flex submenu px-4 py-3 hover:bg-gray-50" 
            
          >
            Importance
            <ul
              class="second-ul transition duration-300 md:absolute top-[6.8rem] right-[24rem] md:w-48 bg-white md:shadow-lg md:rounded p-3"
            >
              <li 
                v-for="{ codeImportance, Importance } of storeTodo.getImportance" :key="codeImportance"
                class="cursor-pointer px-4 py-3 hover:bg-gray-50"
              >
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

    <div class="ml-auto md:hidden text-gray-500 cursor-pointer">
      <CloseIcon />
    </div>

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

  .second-ul{
    display: none;
    position: absolute;
  }

  .submenu:hover > .second-ul {
    display: block;
    position: absolute;
    right: 12rem;
  }
}
</style>