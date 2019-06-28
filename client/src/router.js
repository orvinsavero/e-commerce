import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'loginregister',
      component: () => import('./views/login-register.vue')
    },
    {
      path: '/hacktivpedia',
      name: 'hacktivpedia',
      component: () => import('./views/Hacktiv-Pedia.vue')
    },
    {
      path: '/mystore',
      name: 'my-store',
      component: () => import('./views/Mystore.vue')
    },
    {
      path: '/sell',
      name: 'sell',
      component: () => import('./views/Sell.vue')
    },
    {
      path: '/topup',
      name: 'topup',
      component: () => import('./views/Topup.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('./views/Cart.vue'),
      children: [
        {
          path: '/cart/history',
          name: 'history',
          component: () => import('./views/History.vue')
        }
      ]
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: () => import('./views/Edit.vue')
    }
  ]
})
