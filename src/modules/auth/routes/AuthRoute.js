export default {

  name: 'auth',
  component: () => import('../layout/AuthLayout.vue'),
  children: [
    {
      path:"",
      name:'login',
      component: () => import('../layout/AuthLayout.vue'),
    },
    {
      path: "/register",
      name:'register',
      component: () => import('../layout/AuthLayout.vue'),
    }
  ]
}