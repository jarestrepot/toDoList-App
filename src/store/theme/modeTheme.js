import { defineStore } from "pinia";

export const useThemeMode = defineStore("theme", {
  state: () => ({
    darkMode: localStorage.getItem("theme") === "dark"
  }),
  actions:{
    changeTheme() {
      this.darkMode = !this.darkMode
    }
  },
})