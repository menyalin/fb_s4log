import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import Test from '@/components/admin/test'
import Login from '@/components/auth/login'
Vue.use(Router)

export default new Router({
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
    }
  ]
})
