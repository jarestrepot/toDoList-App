import { createRouter, createWebHistory } from 'vue-router'
import  Login  from '../pages/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Login
    },
    {
      path: '/register',
      name: 'about',
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/Register.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../pages/Dashboard.vue')
    }
  ]
})

export default router
