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
      {_id: 8, group: 'Урал', region: 'Люберцы, МО'},
      {_id: 9, group: 'Урал', region: 'Люберцы, МО'},
      {_id: 10, group: 'Урал', region: 'Люберцы, МО'},
      {_id: 11, group: 'Центр', region: 'Тверь'},
      {_id: 12, group: 'Северо-Запад', region: 'Санкт-Петербург'},
      {_id: 13, group: 'Северо-Запад', region: 'Петрозаводск'},
      {_id: 14, group: 'Сибирь', region: 'Новосибирск'}
    ]
  },
  mutations: {},
  actions: {},
  getters: {
    allRegions (state) {
      return state.regions
    }
  }
}