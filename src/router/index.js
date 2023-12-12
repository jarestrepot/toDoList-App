import { createRouter, createWebHistory } from 'vue-router';
import { AuthRoute, isAuthenticatedGuard } from '../modules/auth/routes';
import TodoRoute from '../modules/todos/routes/TodosRoute';

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
