import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import index from '@/views/index.vue'
import DrumCard from '@/views/DrumCard.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: index
  },
  {
    path: '/DrumCard',
    name: 'DrumCard',
    component: DrumCard
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
