import db from '../db'
import firebase from "../firebase";

export default {
  state: {},
  mutations: {},
  actions: {
    async getDataTest ({commit}) {
      try {
        commit('setLoading', true)
        const docs = await db.collection('regions').get()
        console.log(docs)
        commit('setLoading', false)
      } catch (e) {
        commit('setError', e.message || e.code)
        commit('setLoading', false)
      }
    }
  },
  getters: {}
}