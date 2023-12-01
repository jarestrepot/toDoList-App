
export default{

  name: 'dashboard',
  component: () => import('../layouts/TodosLayout.vue'),
  children: [
    {
      path: '',
      name: 'entry',
      component: () => import('../views/Todos.vue'),
    },
    {
      path: '/no-entry',
      name: 'no-entry',
      component: () => import('../views/EmptyTodos.vue'),
    },
    {
      path: '/archive',
      name: 'archive',
      component: () => import('../views/ArchiveTodos.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../../auth/pages/UserProfile.vue'),
    },

  ],
}