export default {
  state: {
    errorTimeOut: 3500,
    error: null,
    appLoading: false
  },
  mutations: {
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    },
    setAppLoading (state, payload) {
      state.appLoading = payload
    }
  },
  actions: {
    setError ({commit}, payload) {
      commit('setError', payload)

      setTimeout(() => {
        commit('clearError')
      }, this.getters.errorTimeOut + 700)
    },
    setAppLoading ({commit}, payload) {
      commit('setAppLoading', payload)
    }
  },
  getters: {
    appLoading (state) {
      return state.appLoading
    },
    error (state) {
      return state.error
    },
    errorTimeOut (state) {
      return state.errorTimeOut
    }
  }
}