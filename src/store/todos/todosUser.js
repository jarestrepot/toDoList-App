import { defineStore } from "pinia";


export const todosStore = defineStore("todos",{
  state: () => ({
    assets: {}
  }),
  actions: {
    assetsTodos(assets){
      this.$patch({
        assets
      })
    }
  },
  persist: true,
})
