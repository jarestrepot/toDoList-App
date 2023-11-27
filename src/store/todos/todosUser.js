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
    },
    getCodeAssets({ Category, Importance, Status }){
      const { importance, category, status } = this.assets;
      const [ resultImportance ] = importance.filter((important) => important.Importance === Importance );
      const [ resultStatus ] = status.filter(state => state.Status === Status);
      const [ resultCategory ] = category.filter(cate => cate.Category === Category);
      return {
        getImportance: resultImportance ,
        getStatus: resultStatus,
        getCategory: resultCategory
      }
    },
    clearAssetsTodos(){
      this.$reset()
    },
    getStatusCode(code){
      const { status } = this.assets
      return status.filter(state => state.codeStatus === code)
    },
    getImportanceCode(code) {
      const { importance } = this.assets
      return importance.filter(important => important.codeImportance === code)
    },
    getCategoryCode(code){
      const { category } = this.assets
      return category.filter(cate => cate.codeCategory === code)
    }
  },
  persist: true,
})
