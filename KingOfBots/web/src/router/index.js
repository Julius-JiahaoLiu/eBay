import { createRouter, createWebHistory } from 'vue-router'
import BattleView from '../views/battle/BattleView.vue'
import RanklistView from '../views/ranklist/RanklistView.vue'
import RecordView from '../views/record/RecordView.vue'
import UserBotsView from '../views/user/bots/UserBotsView.vue'

const routes = [
  {
    path: '/',
    name: 'BattleView',
    component: BattleView
  },
  {
    path: '/battle',
    name: 'BattleView',
    component: BattleView
  },
  {
    path: '/ranklist',
    name: 'RanklistView',
    component: RanklistView
  },
  {
    path: '/record',
    name: 'RecordView',
    component: RecordView
  },
  {
    path: '/user/bots',
    name: 'UserBotsView',
    component: UserBotsView
  },
  {
    path: '/:catchAll(.*)',
    name: 'ErrorView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/error/ErrorView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
