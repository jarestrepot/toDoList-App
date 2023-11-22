
import { defineStore } from "pinia";

export const userAuthStore = defineStore("auth", {
  state: () => ({
    status: 'authenticating',
    user: null,
    token: null,
    tasks: [],
    hashError: null
  }),
  getters: {
    getUserLogin: ({ user }) => user,
    getToken: ({ token }) => token,
    getErrorServer: ({ hashError }) => hashError,
  },
  actions: {
    async fetchLoginUser(email, password) {
      try {
        const postLoginUser = await fetch('https://server-todo-list-app.cleverapps.io/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });
        if (postLoginUser.status > 199 && postLoginUser.status < 399) {
          const { dataUser, tasks, token } = await postLoginUser.json();
          this.$patch({
            status: 'authenticated',
            user: dataUser,
            tasks,
            token,
          });
        } else {
          const { Error } = await postLoginUser.json();
          this.hashError = Error;
        }
      } catch (error) {
        this.hashError = error;
      }
      
    }
  }
})

