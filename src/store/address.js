import db from '../db'

export default {
  state: {
    regions: []
  },
  mutations: {
    deleteRegion(state, id) {
      const pos = state.regions.findIndex((item) => item.id === id)
      if (pos !== -1) {
        state.regions.splice(pos, 1)
      }
    },
    setRegions(state, regionsArray) {
      state.regions = regionsArray
    },
    addRegion(state, payload) {
      // в Payload должен лежать объект с ключами: id, region, group
      state.regions.push(payload)
    },
    updateRegion(state, {id, group, region}) {
      state.regions.forEach(x => {
        if (x.id === id) {
          x.group = group
          x.region = region
        }
      })
    }
  },
  actions: {
    async deleteRegion({commit, dispatch}, id) {
      try {
        commit('clearError')
        commit('setLoading', true)
        await db.collection('regions').doc(id).delete()
        commit('deleteRegion', id)
        commit('setLoading', false)
      } catch (e) {
        dispatch('setError', e)
        commit('setLoading', false)
      }
    },
    async getAllRegions({commit, dispatch}) {
      try {
        commit('clearError')
        commit('setLoading', true)
        let tmpArr = []
        const querySnapshot = await db.collection('regions').get()
        querySnapshot.forEach(item => {
          tmpArr.push({
            id: item.id,
            group: item.data().group,
            region: item.data().region
          })
        })
        commit('setRegions', tmpArr)
        commit('setLoading', false)
      } catch (e) {
        dispatch('setError', e)
        commit('setLoading', false)
      }
    },
    async newRegion({commit, dispatch}, {group, region}) {
      try {
        commit('clearError')
        commit('setLoading', true)
        const res = await db.collection('regions').add({group, region})
        commit('addRegion', {id: res.id, group, region})
        commit('setLoading', false)
      } catch (e) {
        dispatch('setError', e)
        commit('setLoading', false)
      }
    },
    async updateRegion({commit, dispatch}, {id, group, region}) {
      try {
        commit('clearError')
        commit('setLoading', true)
        await db.collection('regions').doc(id).set({group, region}, {merge: true})
        commit('updateRegion', {id, group, region})
        commit('setLoading', false)
      } catch (e) {
        dispatch('setError', e)
        commit('setLoading', false)
      }
    }
  },
  getters: {
    allRegions: state => filters => {
      return state.regions
        .filter(item => {
          if (!filters.searchText) return true
          else return item.region.toLowerCase().indexOf(filters.searchText.toLowerCase()) !== -1
        })
        .filter((item) => {
          if (filters.group === 'Все') {
            return true
          } else {
            return item.group === filters.group
          }
        })
        .sort((a, b) => {
          if (a.region > b.region) return 1 * filters.regionOrder
          if (a.region < b.region) return -1 * filters.regionOrder
        })
    },
    regionGroups(state) {
      let tmp_obj = {}
      state.regions.forEach((item) => {
        tmp_obj[item.group] = item
      })
      return Object.keys(tmp_obj)
    },
    regionById: state => id => {
      return state.regions.find(x => x.id === id)
    }
  }
}

