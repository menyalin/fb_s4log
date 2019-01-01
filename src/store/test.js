import db from '../db'
import firebase from "../firebase";

export default {
  state: {},
  mutations: {},
  actions: {
    async getDataTest ({commit}) {
      try {
        commit('setLoading', true)
        const querySnapshot = await db.collection('regions').get()
        querySnapshot.forEach(item => {
          console.log(item.data(), item.id)
        })
        commit('setLoading', false)
      } catch (e) {
        commit('setError', e.message || e.code)
        commit('setLoading', false)
      }
    }
  },
  getters: {}
}
