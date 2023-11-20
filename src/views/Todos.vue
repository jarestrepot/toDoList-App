<script>
import EachTodo from '../components/EachTodo.vue';
import Modal from '../components/Modal.vue';

export default {
  data() {
    return {
      openModal: false,
    };
  },
  components: {
    EachTodo,
    Modal
  },
  methods: {
    closeModal() {
      this.openModal = false;
    },
  },

}
</script>

<template>
  <div class="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
    <EachTodo @open-modal="openModal = true" />
    <Modal :action="openModal" :event="closeModal"/>
  </div>
</template>
