import { defineStore } from "pinia";


export const useTodosStore = defineStore("todos",{
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
