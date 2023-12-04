
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
    archivedTodos: [],
    searchTodos: []
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
        let todosArchived = [];
        let normalyTodos = [];
        for ( let todo of tasks ) {
          if(todo.archived === 0 ){
            normalyTodos = [...normalyTodos, todo];
          }else{
            todosArchived = [...todosArchived, todo]
          }
        }
        this.$patch({
          status: 'authenticated',
          user: dataUser,
          tasks: normalyTodos ,
          token,
          hasError:null,
          archivedTodos: todosArchived 
        });
      }
    },
    logoutUser(){
      this.$reset()
      localStorage.removeItem('tokenUser')
    },
    updateUser({ user }){
      this.$patch({
        user
      });
    },
    getTodoId(id){
      const [todo] = this.tasks.filter(todo => todo.id === id)
      return todo ?? null
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
      this.tasks.forEach((todo, index )=> {
        console.log(todo)
        if (todo[asset] === nameFilter){
          this.todoFilter.push(todo)
          this.tasks.splice(index, 1)
        }
      });
    },
    clearTodoFilter(){
      this.tasks.push(...this.todoFilter);
      this.$patch({
        todoFilter: []
      })
    },

    async archivedTodo(id){
      const response = await startArchivedTodo(id)
      if(response.Error){
        return response
      }
      const todoFind = this.tasks.find(task => task.id === id)

      if (todoFind && todoFind.archived === 0 ){
        this.archivedTodos.push(response.task)
        const indexTodo = this.tasks.findIndex(task => task.id === id);
        this.tasks.splice(indexTodo, 1);
      }else{
        this.tasks.push(response.task)
        const indexTodoArchived = this.archivedTodos.findIndex(archived => archived.id === id);
        this.archivedTodos.splice(indexTodoArchived, 1);
      }
    },
  
    async deleteTodo(id){
      const response = await startDeleteTodo(id);
      if(response.Error){
        return response
      }
      const indexTodo = this.tasks.findIndex(todo => todo.id === id);
      if(indexTodo !== -1){
        this.tasks.splice(indexTodo, 1);
      } 
      if (this.archivedTodos.findIndex(todo => todo.id === id) !== -1){
        const indexArchivedTodo = this.archivedTodos.findIndex(todo => todo.id === id);
        this.archivedTodos.splice(indexArchivedTodo, 1);
      }
      else {
        const indexFilterTodo = this.todoFilter.findIndex(todo => todo.id === id);
        this.todoFilter.splice(indexFilterTodo, 1)
      }
      return response
    },
    addSearchTodo(todos){
      this.$patch({ searchTodos: [] });
      this.searchTodos.push(...todos)
    },
    getSearchTodos(search, type){
      if (this.todoFilter.length > 0) return this.todoFilter.filter(todo => todo.title.toLowerCase().includes(search.toLowerCase()));
      if (type === 'dashboard' && this.todoFilter.length <= 0) {
        return this.tasks.filter(todo => todo.title.toLowerCase().includes(search.toLowerCase()));
      }
      if (type === 'archive' && this.todoFilter.length <= 0) {
        return this.archivedTodos.filter(todo => todo.title.toLowerCase().includes(search.toLowerCase()))
      }
    } 
  },
  persist: true,
})

