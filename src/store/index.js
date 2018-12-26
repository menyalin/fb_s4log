import Vue from 'vue'
import Vuex from 'vuex'
import UserStore from './userStore'
import CommonStore from './common'

Vue.use(Vuex)

export default new Vuex.Store({
 modules: {
   UserStore,
   CommonStore
 }
})
