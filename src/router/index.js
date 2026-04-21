import { createRouter, createWebHistory } from 'vue-router'
//import EditorView from '../views/EditorView.vue'
import EditorLayout from '../layouts/EditorLayout.vue'
import TaskView from '../views/TasksView.vue'
import ManuscriptsView from '../views/ManuscriptsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/editor/tasks',
    },
    {
      path: '/editor',
      component: EditorLayout,
      children: [
        {
          path: 'tasks',
          component: TaskView,
        },
        {
          path: 'tasks/:id',
          component: () => import('../views/TaskDetailsView.vue'),
        },
        {
          path: 'manuscripts',
          component: ManuscriptsView,
        },
        {
          path: 'manuscripts/:id',
          component: () => import('../views/ManuscriptsDetailView.vue'),
        },
        {
          path: 'analytics',
          component: () => import('../views/AnalyticsView.vue'),
        },
      ],
    },
  ],
})

export default router

/*const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'editor',
      component: EditorView,
    },
  ],
})

export default router*/
