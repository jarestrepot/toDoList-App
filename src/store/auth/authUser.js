
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
      this.$patch({
        status: 'not-authenticated',
        user: null, 
        tasks: [],
        token: null,
        todoFilter: [],
        hasError: null,
        archivedTodos: []
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
      }else {
        const indexTodoArcived = this.archivedTodos.findIndex(todo => todo.id === id);
        this.archivedTodos.splice(indexTodoArcived, 1);
      }
      return response
    }
  },
  persist: true,
})

