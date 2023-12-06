<script>
  export default {
    emits: ['escape'],
    props: {
      action: Boolean,
    },
    updated(){
      window.addEventListener('keyup', ({ key }) => {
        if(key === 'Escape'){
          this.$emit('escape');
        }
      })
    },
    methods: {
      showClick(){
        this.$emit('escape')
      }
    }
  }
</script>

<template>
  <div v-if="action" class="flex items-center justify-center">
    <div class="fixed inset-0 transition-opacity" >
      <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
    </div>
    <div class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 z-50" @click.self="showClick">
        <div class="w-full inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full z-50">
          <div ref="modal" class="dark:bg-slate-900 bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4" >
            <slot />
          </div> 
        </div>
      </div>
    </div>
  </div>
</template>



