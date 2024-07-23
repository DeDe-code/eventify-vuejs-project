import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue')
  },
  {
    path: '/myEvents',
    name: 'myEvents',
    component: () => import('@/views/MyEventsView.vue')
  },
  {
    path: '/createEvent',
    name: 'createEvent',
    component: () => import('@/views/CreateEventView.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/SignUpView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LogInView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
export { routes as paths }
