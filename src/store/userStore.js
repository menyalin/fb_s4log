import firebase from '../firebase'

export default {
  state: {
    user: null,
    loggedIn: false,
    unsubscribeAuth: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
      state.loggedIn = true
    },
    logout(state) {
      state.user = null
      state.loggedIn = false
    },
    setUnsubscribeAuth(state, payload) {
      state.unsubscribeAuth = payload
    }
  },
  actions: {
    authInit({commit, dispatch, state, getters}) {
      return new Promise((resolve, reject) => {
        if (state.unsubscribeAuth) state.unsubscribeAuth()
        let unsubscribe = firebase.auth().onAuthStateChanged((user) => {
          dispatch("authStateChanged")
          if (user) {
            dispatch('loadPartners')
          }
          resolve(user)
        })
        commit('setUnsubscribeAuth', unsubscribe)
      })
    },
    async signUp({commit, dispatch}, {email, password}) {
      try {
        commit('clearError')
        commit('setLoading', true)
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        commit('setLoading', false)
      } catch (e) {
        dispatch('setError', e)
        commit('setLoading', false)
      }
    },
    async login({commit, dispatch}, {email, password}) {
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
    async logout({commit, dispatch}) {
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
    async authStateChanged({commit, dispatch}) {
      try {
        commit('clearError')
        firebase.auth().onAuthStateChanged(user => {
          if (user) commit('setUser', user)
          commit('setLoading', false)
        })
      } catch (e) {
        dispatch('setError', e.message || e.code)
        commit('setLoading', false)
      }
    },
    async emailVerified({commit, dispatch, getters}) {
      if (getters.loggedIn) {
        try {
          commit('clearError')
          firebase.auth().currentUser.sendEmailVerification()
          commit('setLoading', false)
        } catch (e) {
          dispatch('setError', e.message || e.code)
          commit('setLoading', false)
        }

      }
    },
    async updateUser({commit, dispatch}, payload) {
      try {
        commit('clearError')
        commit('setLoading', true)
        await firebase.auth().currentUser.updateProfile(payload)
        dispatch("authStateChanged")
        commit('setLoading', false)
      } catch (e) {
        dispatch('setError', e)
        commit('setLoading', false)
      }
    }
  },
  getters: {
    loggedIn(state) {
      return state.loggedIn
    },
    user(state) {
      return state.user
    }
  }
}
