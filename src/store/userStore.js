import firebase from '../firebase'


export default {
  state: {
    user: null,
    loggedIn: false
  },
  mutations: {
    setUser (state, payload) {

      state.user = payload
    }
  },
  actions: {
    async login ({commit}) {
      try {
        const { user } = await firebase.auth().signInWithEmailAndPassword('menyalin@gmail.com', '111111')
        console.log(user)
        commit('setUser', user)
      } catch (e) {
        commit('setError', e.message || e.code)
      }
    }
  },
  getters: {}
}