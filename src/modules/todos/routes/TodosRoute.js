// const otrasRutas = [
//   {
//     path: '/profile',
//     name: 'profile',
//     component: () => import('../../auth/pages/UserProfile.vue'),
//   },

// ];

export default{

  name: 'dashboard',
  component: () => import('../layouts/TodosLayout.vue'),
  children: [
    {
      path: '',
      name: 'no-entry',
      component: () => import('../views/EmptyTodos.vue'),
    },
    {
      path: '/dashboard/todos',
      name: 'entry',
      component: () => import('../views/Todos.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../../auth/pages/UserProfile.vue'),
    },

  ],
}