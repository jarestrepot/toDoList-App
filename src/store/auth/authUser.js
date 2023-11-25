
import { defineStore } from "pinia";
import { startLogin } from '../../helpers/authFetch';
import { startUpdateTodo } from "../../helpers/todosFetch";

export const userAuthStore = defineStore("auth", {
  state: () => ({
    status: 'not-authenticated',
    user: null,
    token: null,
    tasks: [],
    hasError: null,
  }),
  actions: {
    async fetchLoginUser(email, password) {
      const response = await startLogin(email, password);
      if(response.Error){
        this.$patch({
          hasError: response.Error
        });
      }else{
        const { dataUser, tasks, token } = await response;
        this.$patch({
          status: 'authenticated',
          user: dataUser,
          tasks,
          token,
          hasError:null,
        });
      }
    },
    logoutUser(){
      this.$patch({
        status: 'not-authenticated',
        user: null, 
        tasks: [],
        token: null,
        hasError: null
      });
      localStorage.removeItem('tokenUser')
    },
    updateUser({ user }){
      this.$patch({
        user
      });
    },
    getTodoId(id){
      const [todo] = this.tasks.filter(todo => todo.id === id)
      return todo
    },
    async updateTodoUser(todo){
      return await startUpdateTodo(todo);
    }
  },
  persist: true,
})

