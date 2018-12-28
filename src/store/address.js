import firebase from "../firebase";

export default {
  state: {
    regions: [
      {_id: 1, group: 'Москва и МО', region: 'Люберцы, МО'},
      {_id: 2, group: 'Москва и МО', region: 'Родники. Раменский р-н'},
      {_id: 3, group: 'Центр', region: 'Липецк'},
      {_id: 4, group: 'Москва и МО', region: 'Москва'},
      {_id: 5, group: 'Поволжье', region: 'Саранск'},
      {_id: 6, group: 'Поволжье', region: 'Пенза'},
      {_id: 7, group: 'Поволжье', region: 'Казань'},
      {_id: 8, group: 'Урал', region: 'Екатеринбург'},
      {_id: 9, group: 'Урал', region: 'Челябинск'},
      {_id: 10, group: 'Урал', region: 'Первоуральск'},
      {_id: 11, group: 'Центр', region: 'Тверь'},
      {_id: 12, group: 'Северо-Запад', region: 'Санкт-Петербург'},
      {_id: 13, group: 'Северо-Запад', region: 'Петрозаводск'},
      {_id: 14, group: 'Сибирь', region: 'Новосибирск'},
      {_id: 15, group: 'Юг', region: 'Астрахань'},
    ]
  },
  mutations: {
    deleteRegion (state, id) {
      let pos = state.regions.map(item => item._id === id)
      state.regions.splice(pos, 1)
    }
  },
  actions: {
    async deleteRegion ({commit, dispatch}, id) {
      try {
        commit('clearError')
        commit('setLoading', true)
        // --------Асинхронное удаление из БД -------------
        commit('deleteRegion', id)
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
    regionGroups (state) {
      let tmp_obj = {}
      state.regions.forEach((item) => {
        tmp_obj[item.group] = item
      })
      return Object.keys(tmp_obj)
    }
  }
}

