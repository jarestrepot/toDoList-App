
import { defineStore } from "pinia";
import { startLogin } from '../../helpers/authFetch';
import { startNewTodo, startUpdateTodo, startArchivedTodo, startDeleteTodo } from "../../helpers/todosFetch";

export const userAuthStore = defineStore("auth", {
  state: () => ({
    status: 'not-authenticated',
    user: null,
    token: null,
    tasks: [],
    todoFilter: [],
    hasError: null,
    archivedTodos: []
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
        // TODO: Mañana arreglar para que se vaya a su espacio en memoria correspondiente
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

      const indexTodo = this.tasks.findIndex(task => task.id === todo.id);
      const response = await startUpdateTodo(todo);
      if(response.Error){
        return response
      }
      this.tasks.splice( indexTodo, 1, response.task );
      return response
    },
    async newTodo(todo, userRef){
      const response = await startNewTodo(todo, userRef);
      if(response.Error){
        return response
      }
      this.tasks.push(response.task);
      return response.msg
    },

    getFilterTodos(nameFilter, asset){
      this.tasks.forEach(todo => {
        if (todo[asset] === nameFilter){
          this.todoFilter = [...this.todoFilter, todo]
        }
      });
    },
    clearTodoFilter(){
      this.$patch({
        todoFilter: []
      })
    },
    async archivedTodo(id){
      const response = await startArchivedTodo(id)
      if(response.Error){
        return response
      }
      // TODO: SOLUCIONAR ARCHIVADAS
      const todoFind = this.tasks.find(task => task.id === id)

      if (todoFind.length > 0 || todoFind.archived === 0){
        this.archivedTodos.push(response.task)
        const indexTodo = this.tasks.findIndex(task => task.id === id);
        this.tasks.splice(indexTodo, 1);
      }else{
        this.tasks.push(response.task)
        const indexTodoArchived = this.archivedTodos.findIndex(archived => archived.id === id);
        this.archivedTodos.splice(indexTodoArchived, 1);
      }
    },
  
    async deleteTodoStore(id){
      const response = await startDeleteTodo(id);
      if(response.Error){
        return response
      }
      const indexTodoArchived = this.archivedTodos.findIndex(archived => archived.id === id);
      this.tasks.splice(indexTodoArchived, 1);
      return response
    }
  },
  persist: true,
})

