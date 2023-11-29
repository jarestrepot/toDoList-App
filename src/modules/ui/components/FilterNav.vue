<script>
import GridListToggle from '../../todos/components/GridListToggle.vue';
import DownIcon from '../components/icons/DownIcon.vue';
import CloseIcon from '../components/icons/CloseIcon.vue';
import AddTodoIcon from '../../todos/components/icons/AddTodoIcon.vue';
import ModalTodos from '../../todos/components/ModalTodos.vue';
import FormAddTodo from '../../todos/components/FormAddTodo.vue';

export default {
  data() {
    return {
      openModal: false,
    };
  },
  components: {
    GridListToggle,
    DownIcon,
    CloseIcon,
    AddTodoIcon,
    ModalTodos,
    FormAddTodo,
  },
  methods: {
    openDiv(reference) {
      this.removeClass(this.$refs[reference], ['subfilter'])
      this.addClass(this.$refs[reference], ['subFilterVisible'])
    },
    closeDiv(reference) {
      this.removeClass(this.$refs[reference], ['subFilterVisible'])
      this.addClass(this.$refs[reference], ['subfilter'])
    },
    removeClass({ classList }, nameClass) {
      for (let classRemove of nameClass) {
        classList.remove(classRemove);
      }
    },
    addClass({ classList }, nameClass) {
      for (let classAdd of nameClass) {
        classList.add(classAdd);
      }
    }
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
          class="filter transition duration-300 md:absolute top-full right-0 md:w-48 bg-white md:shadow-lg md:rounded-b z-10">

          <li class="flex relative filters px-4 py-3 hover:bg-gray-50">
            Category
            <ul
              class="filter transition duration-300 relative  right-[24rem] md:w-48 bg-red-500 md:shadow-lg md:rounded p-3">
              <li class="px-4 py-3 hover:bg-gray-50">Education</li>
              <li class="px-4 py-3 hover:bg-gray-50">Work</li>
              <li class="px-4 py-3 hover:bg-gray-50">Health</li>
              <li class="px-4 py-3 hover:bg-gray-50">Personal</li>
              <li class="px-4 py-3 hover:bg-gray-50">Others</li>
            </ul>
          </li>


          <li class="flex px-4 py-3 hover:bg-gray-50" @mouseenter="openDiv('elementStatus')"
            @mouseleave="closeDiv('elementStatus')">
            Status
          </li>
          <li class="flex px-4 py-3 hover:bg-gray-50" @mouseenter="openDiv('elementImportance')"
            @mouseleave="closeDiv('elementImportance')">
            Importance
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


    <!-- <ul ref="elementCategory"
      class="subfilter transition duration-300 md:absolute top-full right-[24rem] md:w-48 bg-white md:shadow-lg md:rounded p-3">
      <li class="px-4 py-3 hover:bg-gray-50 relative">Education</li>
      <li class="px-4 py-3 hover:bg-gray-50 relative">Work</li>
      <li class="px-4 py-3 hover:bg-gray-50 relative">Health</li>
      <li class="px-4 py-3 hover:bg-gray-50 relative">Personal</li>
      <li class="px-4 py-3 hover:bg-gray-50 relative">Others</li>
    </ul>

    <ul ref="elementStatus"
      class="subfilter transition duration-300 md:absolute top-20 right-[-24rem] md:w-48 bg-white md:shadow-lg md:rounded p-3">
      <li>Pending</li>
      <li>In progress</li>
      <li>Completed</li>
    </ul>

    <ul ref="elementImportance"
      class="subfilter transition duration-300 md:absolute top-[6.8rem] right-[24rem] md:w-48 bg-white md:shadow-lg md:rounded p-3">
      <li>High</li>
      <li>Medium</li>
      <li>Low</li>
    </ul> -->

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

  .subFilterVisible {
    display: block;
    height: auto;
    overflow: none;
    transform: translateY(0);
  }

  .subFilterVisible:hover {
    display: block;
    height: auto;
    overflow: none;
    transform: translateY(0);
  }

  .subfilter {
    display: none;
    height: 0;
    overflow: hidden;
    transform: translateX(-10%);
  }
}
</style>