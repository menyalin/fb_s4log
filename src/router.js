import Vue from 'vue'
import Router from 'vue-router'
import Store from './store'
import HomePage from '@/components/HomePage'
import Test from '@/components/admin/test'
import Login from '@/components/auth/login'
import SignUp from '@/components/auth/signUp'
import AdminLayout from '@/components/admin/layout'
import Regions from '@/components/admin/regions'
import Account from '@/components/auth/account'
import PartnerDetailInfo from '@/components/auth/partnerDetailInfo'
import chatLayout from "./components/chat/chatLayout"
import SystemLayout from './components/system/systemLayout'
import importOrders from "./components/system/orders/importOrders";

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: HomePage
    },
    {
      path: '/test',
      component: Test
    },
    {
      path: '/auth/login',
      component: Login
    },
    {
      path: '/auth/signup',
      component: SignUp
    },
    {
      path: '/account',
      component: Account,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/partner/:id',
      component: PartnerDetailInfo,
      props: true,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/admin',
      component: AdminLayout,
      children: [
        {path: 'regions', component: Regions}
      ]
    },
    {
      path: '/chat',
      component: chatLayout,
    },
    {
      path: '/system',
      component: SystemLayout,
      children: [
        {path: 'importOrders', component: importOrders}
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  Store.dispatch('authInit')
    .then(user => {
      if (to.matched.some(route => route.meta.authRequired)) {
        user ? next() : next('/auth/login')
      } else {
        next()
      }
    })
})

export default router
