import {
  createRouter, createWebHashHistory
} from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import AdminView from '@/views/AdminView.vue'
import DashboardView from '@/views/DashboardView.vue'
import MovieView from '@/views/MovieView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
          path: 'Movies',
          name: 'MovieView',
          component: MovieView
        },
        {
          path: 'AddNewMovie',
          name: 'AddNewMovie',
          component: () => import('../components/AddNewMovie.vue')
        },
        {
          path: 'EditTheater/:id',
          name: 'EditTheater',
          component: () => import('../components/EditTheater.vue')
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
