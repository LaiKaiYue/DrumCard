import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import SheetMusic from '@/views/DrumCard.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'SheetMusic',
    component: SheetMusic
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/tailwind',
    name: 'tailwind',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/tailwind.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
