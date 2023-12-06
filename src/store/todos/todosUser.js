import { defineStore } from "pinia";


export const useTodosStore = defineStore("todos",{
  state: () => ({
    assets: {},
    grid: true,
  }),
  
  getters: {
    getCategory: (state) => state.assets.category,
    getStatus: (state) => state.assets.status,
    getImportance: (state) => state.assets.importance
  },

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
      const { status } = this.assets;
      const [propertiesStatus] = status.filter(state => state.codeStatus === code);
      return propertiesStatus.Status;
    },
 
    getImportanceCode(code) {
      const { importance } = this.assets;
      const [propertiesImportance] = importance.filter(important => important.codeImportance === code);
      return propertiesImportance.Importance;
    },

    getCategoryCode(code){
      const { category } = this.assets;
      const [ propertiesCategory ] =  category.filter(cate => cate.codeCategory === code);
      return propertiesCategory.Category;
    },

    getKeyAssets(){
      const keysAssets = Object.keys(this.assets);
      return keysAssets;
    },

    getValuesAssets(){
      const categoryArray = this.assets.category.map(item => item.Category);
      const importanceArray = this.assets.importance.map(item => item.Importance);
      const statusArray = this.assets.status.map(item => item.Status);

      const valuesAssets = [...categoryArray, ...importanceArray, ...statusArray ];
      return valuesAssets;
    },

    selectedListView(){
      this.grid = false;
    },

    selectedGridView() {
      this.grid = true;
    }
  },
  persist: true,
})
