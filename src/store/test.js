import db from '../db'
import firebase from "../firebase";

export default {
  state: {},
  mutations: {},
  actions: {
    async getDataTest ({ commit }) {
      try {
        commit('setLoading', true)
        await db.collection('regions').doc().set({group: 'Юг', region: 'Астрахань'})
        commit('setLoading', false)
      } catch (e) {
        commit('setError', e.message || e.code)
        commit('setLoading', false)
      }
    }
  },
  getters: {}
}
