import db from '../db'
import XLSX from 'xlsx'
import moment from 'moment'
import store from './index'


export default {
  state: {
    orders: [],
    tmpOrdersArray: [
        {
          _id: '01',
          selected: false,
          status: 'new',
          searchCar: true,
          method: 'Авто',
          num: 12334,
          numEDI: 'YB123321133',
          dateShipping: new Date('2019-02-15'),
          dateDelivery: new Date('2019-02-17'),
          //timeDelivery: new Date('08:34'),
          customer: 'Торговый дом Перекресток',
          address: 'Волгоградская область, с.Ерзовка, какой-то склад с непонятным и очень длинным названием',
          way: 'FM (РЦ Ерзовка) чт, сб',
          weight: 12.3,
          pltCount: 21,
          thermal: 16,
          manager: 'Тараканова Евгения Батьковна'
        },
         {
          _id: '02',
          selected: false,
          status: 'changed',
          searchCar: true,
          method: 'Авто',
          num: 12213,
          numEDI: 'YB12332323f23',
          dateShipping: new Date('2019-02-16'),
          dateDelivery: new Date('2019-02-19'),
         // timeDelivery: new Date('08:34'),
          customer: 'Тандер АО',
          address: 'Пензенкая область, с. Саловка, терминал 323-231',
          way: 'Пенза (РЦ Тандер)',
          weight: 18.3,
          pltCount: 33,
          thermal: 0,
          manager: 'Глебова Наталья'
        },
        {
          _id: '03',
          selected: true,
          status: 'changed',
          searchCar: true,
          method: 'Авто',
          num: 124562,
          numEDI: '12232346YB',
          dateShipping: new Date('2019-02-21'),
          dateDelivery: new Date('2019-02-23'),
          //timeDelivery: new Date('08:34'),
          customer: 'Союз Святого Ионна Воина',
          address: 'Санкт-Петербург, ЦР Верного с очень длинным названрием',
          way: 'ВОСТОК (РЦ Верный) чт, вс',
          weight: 18.3,
          pltCount: 32,
          thermal: 0,
          manager: 'Гераськина Ольга'
        },      
    ],
    tmpOrderStatus : {
      new: 'Новый',
      old: 'Старый',
      changed: 'Изменен'
    },
    tmpOrderFilters: {
      statusFilter: ['new', 'old'],
      testFilter: 'unUsed'
    }
  },
  mutations: {
    tmpOrderFiltersUpdate (state, payload) {
      Object.assign(state.tmpOrderFilters, payload) 
    },
    unSelectAllTmpOrder () {
      store.getters.tmpOrdersArray.forEach(item => item.selected = false)
    },
    selectAllTmpOrder ({getters}) {
      store.getters.tmpOrdersArray.forEach(item => item.selected = true)
    },
    toggleSelectorOrders (state, payload) {
      state.orders.map(o => {
        if (o.orderNumber === payload) {
          o.selected = !o.selected
        }
      })
    },
    toggleSelectorTmpOrder (state, payload) {
      state.tmpOrdersArray.map(o => {
        if (o._id === payload) o.selected = !o.selected
      })
    },
    addNewOrder (state, payload) {
      state.orders.push(payload)
    },
    setOrders (state, payload) {
      state.orders = payload
    },
    addToTmpArray (state, payload) {
      state.tmpOrdersArray = payload
    },
    addCustomerToTmpOrder (state, {newCustomer, order}) {
      state.tmpOrdersArray.map(item => {
        if (item.number === order.number) {
          Object.assign(item, {foundedCustomer: newCustomer})
        }
      })
    }
  },
  actions: {
    toggleSelectorOrders ({commit}, {orderNumber}) {
      commit('toggleSelectorOrders', orderNumber)
    },
    toggleSelectorTmpOrder ({commit}, {number}) {
      commit('toggleSelectorTmpOrder', number)
    },
    async createNewOrder ({commit}, payload) {
      try {
        commit('setLoading', true)
        commit('clearError')
        const {data} = await HTTP.post('orders', payload)
        commit('addNewOrder', data)
        commit('setLoading', false)
      } catch (e) {
        commit('setError', e.message)
      }
    },
    async getAllOrders ({commit}) {
      try {
        commit('setLoading', true)
        commit('clearError')
        const {data} = await HTTP.get('orders')
        commit('setOrders', data)
        commit('setLoading', false)
      } catch (e) {
        commit('setError', e.message)
      }
    },
    async importOrders ({commit, getters, dispatch}, payload) {
      let reader = new FileReader()
      commit('setLoading', true)
      reader.onload = async function (payload) {
        const uploadData = event.target.result
        let workbook = XLSX.read(uploadData, {type: 'array'})
        const tmp = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
        // формируем список номеров заказов в загружаемом массиве
        for (let i = 0; i < tmp.length; i++) {
          tmp[i].selected = false
          tmp[i].shippingDateParsed = moment(tmp[i].dateShipping, ['DD.MM.YYYY', 'YYYY.MM.DD'])
          tmp[i].status_id = 10 // статус Новый
        }
        commit('addToTmpArray', tmp)
        commit('setLoading', false)
      }
      reader.onError = function () {
        dispatch('setError', 'Ошибка загрузки файла')
        commit('setLoading', false)
      }
      reader.readAsArrayBuffer(payload.target.files[0])
    }
  },
  getters: {
    orders (state) {
      return state.orders
    },
    tmpOrdersArray (state) {
      const filters = state.tmpOrderFilters
      return state.tmpOrdersArray
      .filter(item => filters.statusFilter.indexOf(item.status) !== -1)
    },
    tmpOrderSelectedState (state) {
      const filters = state.tmpOrderFilters;
      const array = state.tmpOrdersArray.filter(item => filters.statusFilter.indexOf(item.status) !== -1)
      if (array.length) {
        let selected = 0;
        for (let i = 0; i < array.length; i++) {
          if ( array[i].selected ) selected++;
        }
        if (selected === 0) return 'check_box_outline_blank'
        if (selected ===  array.length) return 'check_box'
        else return 'indeterminate_check_box'
      }
      else return 'check_box_outline_blank'
    },  
    tmpOrderStatus (state) {
      return state.tmpOrderStatus
    },
    tmpOrderFilters (state) {
      return state.tmpOrderFilters
    },
    tmpOrderByNumber: state => number => state.tmpOrdersArray.find(item => item.number === number)
  }
}

