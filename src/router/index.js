import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('@/views/MutiDistricts')
    },
    {
      path: '/mutiTransfer',
      name: 'index',
      component: () => import('@/views/MutiTransfer')
    }
  ]
})
