import db from '../db'
import firebase from "../firebase"
import Vue from 'vue';

export default {
  state: {
    partners: {}
  },
  mutations: {
    updatePartners(state, payload) {
      Vue.set(state.partners, payload.id, payload.data())
    }

  },
  actions: {
    async loadPartners ({dispatch, commit, getters}) {
      try {
        let uid = ''
        if (getters.user) {
          uid = getters.user.uid
        } else {
          uid = await firebase.auth().currentUser.uid
        }
        let partnersRef = await db.collection('partners')
        let snapshot = await partnersRef.where('users', 'array-contains', uid).get()
        snapshot.forEach(doc => {
          commit('updatePartners', doc)
        })
      } catch (e) {
        console.log(e)
        dispatch('setError', e)
        commit('setLoading', false)
      }

    }

  },
  getters: {
    partners(state) {
      return state.partners
    }

  }
}
