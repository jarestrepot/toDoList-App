import { createRouter, createWebHistory } from 'vue-router'
import AuthRoute from '../modules/auth/routes/AuthRoute'
import TodoRoute from '../modules/todos/routes/TodosRoute'

const routes = [
  {
    path: '/auth',
    ...AuthRoute
  },
  {
    path: '/dashboard',
    ...TodoRoute
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../modules/todos/layouts/TodosLayout.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
