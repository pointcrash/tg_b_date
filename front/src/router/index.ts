import { createRouter, createWebHistory } from 'vue-router'
import BirthDate from '../views/BirthDate.vue'
import BirthdayInfo from '../views/BirthdayInfo.vue'
import SharedInfo from '../views/SharedInfo.vue'

const routes = [
  {
    path: '/',
    name: 'BirthDate',
    component: BirthDate
  },
  {
    path: '/info',
    name: 'BirthdayInfo',
    component: BirthdayInfo
  },
  {
    path: '/shared-info',
    name: 'SharedInfo',
    component: SharedInfo
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router