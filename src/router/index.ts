import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes = [
  {
    path: '/todo-list',
    name: '/todoList',
    component: () => import('../views/TodoListView.vue')
  },

  {
    path: '/:pathMatch(.*)*',
    redirect: '/todo-list'
  }
] as const satisfies readonly RouteRecordRaw[]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
