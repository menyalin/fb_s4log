import db from '../db'
import firebase from "../firebase";

export default {
  state: {},
  mutations: {},
  actions: {
    async getDataTest({commit}) {
      try {
        commit('setLoading', true)
        commit('setLoading', false)
      } catch (e) {
        commit('setError', e.message || e.code)
        commit('setLoading', false)
      }
    }
  },
  getters: {}
}
