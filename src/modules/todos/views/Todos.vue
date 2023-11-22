<script>
import EachTodo from '../components/EachTodo.vue';
import ModalTodos from '../components/ModalTodos.vue';

export default {
  data() {
    return {
      openModal: false,
    };
  },
  components: {
    EachTodo,
    ModalTodos
  },
  methods: {
    closeModal() {
      this.openModal = false;
    },
  },

}
</script>

<template>
  <div class="my-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
    <EachTodo @open-modal="openModal = true" />
    <ModalTodos :action="openModal" :event="closeModal"/>
  </div>
</template>
