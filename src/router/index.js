import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'index',
    component: () => import('@/components/index.vue'),
    redirect: '/main',
    children: [
      {
        path: '/main',
        name: 'main',
        component: () => import('@/components/indexPage/main/main.vue')
      },
      {
        path: '/changeCity',
        name: 'changeCity',
        component: () => import('@/components/otherPage/changeCity.vue')
      },
      {
        path: '/goodsList',
        name: 'goodsList',
        component: () => import('@/components/otherPage/goodsList.vue')
      },
      {
        path: '/buy',
        name: 'buy',
        component: () => import('@/components/otherPage/buy.vue')
      },
      {
        path: '/pay',
        name: 'pay',
        component: () => import('@/components/otherPage/pay.vue')
      },
      {
        path: '/myself',
        name: 'myself',
        component: () => import('@/components/otherPage/myself.vue'),
        redirect: '/myself/userInfo',
        children: [
          {
            path: '/myself/userInfo',
            name: 'userInfo',
            component: () => import('@/components/otherPage/myself/userInfo.vue')
          },
          {
            path: '/myself/order',
            name: 'order',
            component: () => import('@/components/otherPage/myself/order.vue')
          },
          {
            path: '/myself/collect',
            name: 'collect',
            component: () => import('@/components/otherPage/myself/order.vue')
          },
          {
            path: '/myself/ticket',
            name: 'ticket',
            component: () => import('@/components/otherPage/myself/order.vue')
          },
          {
            path: '/myself/setting',
            name: 'setting',
            component: () => import('@/components/otherPage/myself/setting.vue')
          }
        ]
      }]
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/components/otherPage/register.vue')
  }, {
    path: '/login',
    name: 'login',
    component: () => import('@/components/otherPage/login.vue')
  }],
  mode: 'hash'
})
