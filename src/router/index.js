import { createRouter, createWebHistory } from 'vue-router';
import AuthRoute from '../modules/auth/routes/AuthRoute';
import TodoRoute from '../modules/todos/routes/TodosRoute';
import isAuthenticatedGuard from '../modules/auth/routes/AuthGuard.js';

const routes = [
  {
    path: '/',
    ...AuthRoute
  },
  {
    path: '/dashboard',
    beforeEnter: [isAuthenticatedGuard],
    ...TodoRoute
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'entry' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
