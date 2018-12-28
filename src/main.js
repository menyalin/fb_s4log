import Vue from 'vue'
import 'babel-polyfill'
import App from './App.vue'
import router from './router'
import store from './store/index'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import VuetifyConfirm from 'vuetify-confirm'


Vue.use(Vuetify)
Vue.use(VuetifyConfirm, {
    buttonTrueText: 'Да',
    buttonFalseText: 'Нет',
    color: 'warning',
    icon: 'warning',
    title: 'Warning',
    width: 400,
    property: '$confirm'
  })
Vue.config.productionTip = false


new Vue({
  router,
  store,
  created () {
    this.$store.dispatch('authStateChanged')
  },
  render: h => h(App)
}).$mount('#app')
