import firebase from '../firebase'

export default {
  state: {
    user: null,
    loggedIn: false
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
      state.loggedIn = true
    },
    logout (state) {
      state.user = null
      state.loggedIn = false
    }
  },
  actions: {
    async signUp ({commit, dispatch}, {email, password}) {
      try {
        commit('clearError')
        commit('setLoading', true)
        const {data} = await firebase.auth().createUserWithEmailAndPassword(email, password)
        console.log(data)
        commit('setLoading', false)
      } catch (e) {
        dispatch('setError', e)
        commit('setLoading', false)
      }
    },
    async login ({commit, dispatch}, {email, password}) {
      try {
        commit('clearError')
        commit('setLoading', true)
        await firebase.auth().signInWithEmailAndPassword(email, password)
        commit('setLoading', false)
      } catch (e) {
        dispatch('setError', e.message || e.code)
        commit('setLoading', false)
      }
    },
    async logout ({commit, dispatch}) {
      try {
        commit('clearError')
        commit('setLoading', true)
        await firebase.auth().signOut()
        commit('logout')
        commit('setLoading', false)
      } catch (e) {
        dispatch('setError', e.message || e.code)
        commit('setLoading', false)
      }
    },
    async authStateChanged ({commit, dispatch}) {
      try {
        commit('clearError')
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            commit('setUser', user)
          }
          commit('setLoading', false)
        })
      } catch (e) {
        dispatch('setError', e.message || e.code)
        commit('setLoading', false)
      }
    }
  },
  getters: {
    loggedIn (state) {
      return state.loggedIn
    }
  }
}