import db from '../db'
import XLSX from 'xlsx'


export default {
  state: {
    orders: [],
    tmpOrdersArray: []
  },
  mutations: {
    toggleSelectorOrders (state, payload) {
      state.orders.map(o => {
        if (o.orderNumber === payload) {
          o.selected = !o.selected
        }
      })
    },
    toggleSelectorTmpOrder (state, payload) {
      state.tmpOrdersArray.map(o => {
        if (o.number === payload) o.selected = !o.selected
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
    async importOrders ({commit, getters}, payload) {
      let reader = new FileReader()
      commit('setLoading', true)
      reader.onload = async function (payload) {
        const uploadData = event.target.result
        let workbook = XLSX.read(uploadData, {type: 'array'})
        const tmp = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
        // формируем список номеров заказов в загружаемом массиве
        const numbersArray = tmp.map(order => order.number)
        const {data: ordersInDB} = await HTTP.post('orders/getByNumbers', numbersArray)
        for (let i = 0; i < tmp.length; i++) {
          tmp[i].selected = false
          const dateString = tmp[i].shippingDate
          if (dateString) tmp[i].shippingDateParsed = new Date(dateString.replace(/(\d{2}$)/, '20'.concat('$1')))
          const orderInDB = ordersInDB.filter(item => item.number === tmp[i].number)[0] || null
          if (orderInDB) {
            // если заказ есть в базе
            tmp[i].orderInDB = orderInDB
            if (tmp[i].weight !== orderInDB.weight || tmp[i].pltCount !== orderInDB.pltCount) {
              tmp[i].status_id = 20 // статус Изменен
            } else {
              tmp[i].status_id = 30 // статус Обработан
            }
          } else {
            tmp[i].status_id = 10 // статус Новый
          }
          const customer = getters.customerByFullName(tmp[i].customer)
          if (customer) {
            tmp[i].foundedCustomer = customer
            tmp[i].foundedAddress = getters.getAddressByFullAddress(tmp[i].fullAddress)
          } else {
            tmp[i].foundedCustomer = null
            tmp[i].foundedAddress = null
          }
        }
        commit('addToTmpArray', tmp)
        commit('setLoading', false)
      }
      reader.onError = function () {
        commit('setError', 'Ошибка загрузки файла')
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
      return state.tmpOrdersArray
    },
    tmpOrderByNumber: state => number => state.tmpOrdersArray.find(item => item.number === number)
  }
}

