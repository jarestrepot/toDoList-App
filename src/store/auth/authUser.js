
import { defineStore } from "pinia";
import { startLogin } from '../../helpers/authFetch';

export const userAuthStore = defineStore("auth", {
  state: () => ({
    status: 'not-authenticated',
    user: null,
    token: null,
    tasks: [],
    hasError: null
  }),
  getters: {
    getUserLogin: ({ user }) => user,
    getToken: ({ token }) => token,
    getErrorServer: ({ hasError }) => hasError,
  },
  actions: {
    async fetchLoginUser(email, password) {
      const response = await startLogin(email, password);
      if(response.Error){
        this.hasError = response.Error;
      }else{
        const { dataUser, tasks, token } = await response;
        this.$patch({
          status: 'authenticated',
          user: dataUser,
          tasks,
          token,
        });
      }
    },
    logoutUser(){
      console.log('Store Logout')
      this.$patch({
        status: 'not-authenticated',
        user: null, 
        tasks: [],
        token: null,
        hasError: null
      });
    },
  }
})

