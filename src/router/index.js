import {
  createRouter, createWebHistory
} from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import AdminView from '@/views/AdminView.vue'
import DashboardView from '@/views/DashboardView2.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/admin',
      name: 'Admin',
      component: AdminView,
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: DashboardView
        },
        {
          path: 'settings',
          name: 'settings',
          component: () => import('../components/ExampleCMPT.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'Login',
      component: LoginView
    }
  ]
})

export default router
