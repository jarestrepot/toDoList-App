import { defineStore } from "pinia";

export const useThemeMode = defineStore("theme", {
  state: () => ({
    darkMode: localStorage.getItem("theme") === 'dark'
  }),
  actions:{
    changeTheme() {
      this.darkMode = !this.darkMode;
    },
    setItemTheme(){
      if (this.darkMode || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)){
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark")
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light")
      }
    }
  },
})
