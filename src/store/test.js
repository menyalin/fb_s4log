import db from '../db'
import firebase from "../firebase";

export default {
  state: {},
  mutations: {},
  actions: {
    async getDataTest({commit, dispatch}) {
      try {
        commit('setLoading', true)
        const result = await db.collection('users').get()
        console.log(result)
        commit('setLoading', false)
      } catch (e) {
        dispatch('setError', e.message || e.code)
        commit('setLoading', false)
      }
    }
  },
  getters: {}
}
