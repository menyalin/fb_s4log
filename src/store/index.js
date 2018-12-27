import Vue from 'vue'
import Vuex from 'vuex'
import UserStore from './userStore'
import CommonStore from './common'
import TestStore from './test'
import AddressStore from './address'

Vue.use(Vuex)

export default new Vuex.Store({
 modules: {
   UserStore,
   CommonStore,
   TestStore,
   AddressStore
 }
})
