export default{

  name: 'dashboard',
  component: () => import('../pages/Dashboard.vue'),
  children: [
    {
      path: '',
      name: 'entry',
      components: {
        todos: () => import('../views/Todos.vue'),
        emptyTodos: () => import('../views/EmptyTodos.vue'),
      }
    },
    {
      path: '/archive',
      name: 'archive',
      components: {
        archived: () => import('../views/ArchiveTodos.vue'),
        emptyArchived: () => import('../views/EmptyTodosArchive.vue')
      } 
    },
    {
      path: '/profile',
      name: 'profile',
      components: {
        userProfile: () => import('../../auth/pages/UserProfile.vue')
      }
    },

  ],
}