import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import Test from '@/components/admin/test'
import Login from '@/components/auth/login'
import SignUp from '@/components/auth/signUp'
import AdminLayout from '@/components/admin/layout'
import Regions from '@/components/admin/regions'
import Account from '@/components/auth/account'
import PartnerDetailInfo from '@/components/auth/partnerDetailInfo'
import chatLayout from "./components/chat/chatLayout";


import Store from './store'

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
