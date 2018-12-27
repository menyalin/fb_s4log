import Vue from 'vue'
import 'babel-polyfill'
import App from './App.vue'
import router from './router'
import store from './store/index'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify)
Vue.config.productionTip = false


new Vue({
  router,
  store,
  created () {
    this.$store.dispatch('authStateChanged')
  },
  render: h => h(App)
}).$mount('#app')
