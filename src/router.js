import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import Test from '@/components/admin/test'
import Login from '@/components/auth/login'
import SignUp from '@/components/auth/signUp'
import AdminLayout from '@/components/admin/layout'
import Regions from '@/components/admin/regions'

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
    },
    {
      path: '/auth/signup',
      component: SignUp
    },
    {
      path: '/admin',
      component: AdminLayout,
      children:[
        {path:'regions', component: Regions}
      ]
    }
  ]
})
