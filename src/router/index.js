import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '@/supabase/init'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: 'Home',
      auth: false
    },
    component: HomeView
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {
      title: 'Profile',
      auth: true
    },
    component: () => import('@/views/ProfileView.vue')
  },

  {
    path: '/profileForm',
    name: 'profileForm',
    meta: {
      title: 'Profile Form',
      auth: true
    },
    component: () => import('@/views/ProfileFormView.vue')
  },
  {
    path: '/myEvents',
    name: 'myEvents',
    meta: {
      title: 'My Events',
      auth: true
    },
    component: () => import('@/views/MyEventsView.vue')
  },

  {
    path: '/event/:eventId',
    name: 'event',
    component: () => import('@/views/EventView.vue')
  },

  {
    path: '/createEvent',
    name: 'createEvent',
    meta: {
      title: 'Create Event',
      auth: true
    },
    component: () => import('@/views/CreateEventView.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    meta: {
      title: 'Signup',
      auth: false
    },
    component: () => import('@/views/SignUpView.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login',
      auth: false
    },
    component: () => import('@/views/LogInView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

//Change document titles
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Active Tracker`
  next()
})
export default router
export { routes as paths }
