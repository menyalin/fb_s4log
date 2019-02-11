<template>
  <div>
    <v-flex>
      <input type="file" @change="onSubmit"/>
    </v-flex>
    <v-container fluid>
      <!--Заголовок таблицы-->
      <v-layout align-center row text-xs-center>
        <v-flex xs12 md4>
          <v-container fluid>
            <v-layout align-center justify-space-around row fill-height text-xs-center>
              <v-flex xs2>Статус</v-flex>
              <v-flex xs2>Способ поставки</v-flex>
              <v-flex xs2>Поиск ТС</v-flex>
              <v-flex xs2>№ заказа</v-flex>
              <v-flex xs3>№ заказа клиента</v-flex>
            </v-layout>
          </v-container>
        </v-flex>
        <v-flex xs12 md4>
          <v-container fluid pa-0>
            <v-layout align-center justify-space-around row fill-height text-xs-center>
              <v-flex xs3>Отгрузка</v-flex>
              <v-flex xs3>Доставка</v-flex>
              <v-flex xs6>Клиент</v-flex>
            </v-layout>
          </v-container>
        </v-flex>
        <v-flex xs12 md3>Адрес доставки</v-flex>
        <v-flex xs12 md1>Вес (плт),%</v-flex>
      </v-layout>
      <!--Строки таблицы-->
      <v-layout align-center justify-space-around row text-xs-center
                v-for="item in tmpArray" :key="item.num" class="item-row" :class="{selected: item.selected}">
        <v-flex xs12 md3>
          <v-container fluid pa-0>
            <v-layout align-center justify-space-around row text-xs-center>
              <v-flex xs1 class="pointer" @click="toggleSelector(item)">
                  <v-icon v-if="!item.selected">check_box_outline_blank</v-icon>
                  <v-icon v-else color="primary">check_box</v-icon>
              </v-flex>
              <v-flex xs2>статус</v-flex>
              <v-flex xs2>{{ item.method }}</v-flex>
              <v-flex xs2>{{ item.searchCar }}</v-flex>
              <v-flex xs2>{{ item.num }}</v-flex>
              <v-flex xs3>{{ item.numEDI }}</v-flex>
            </v-layout>
          </v-container>
        </v-flex>
        <v-flex xs12 md4>
          <v-container>
            <v-layout align-center justify-space-around row text-xs-center>
              <v-flex xs3>{{ item.shippingDateParsed.format('DD.MM.YY') || 'invalid date' }}</v-flex>
              <v-flex xs4>01.01.2018 09:00</v-flex>
              <v-flex xs5>{{item.customer}}</v-flex>
            </v-layout>
          </v-container>
        </v-flex>
        <v-flex xs12 md4 text-xs-left>
          {{ item.address}}
        </v-flex>
        <v-flex xs12 md1 text-xs-right>
          {{ item.weightOrder | weightOrderFilter }} ({{item.pltCount}}), {{ item.notFreeze }}
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>

  export default {
    data () {
      return {}
    },
    filters: {
      weightOrderFilter (value) {
        return (+value).toFixed(1) || 'NaN!'
      }
    },
    methods: {
      onSubmit (event) {
        this.$store.dispatch('importOrders', event)
      },
      toggleSelector (tmpOrder) {
        this.$store.dispatch('toggleSelectorTmpOrder', tmpOrder)
      }
    },
    computed: {
      tmpArray () {
        return this.$store.getters.tmpOrdersArray
      },
      address: () => order => {
        return order.deliveryAddress || order.fullAddress.slice(0, 60)
      },
      customerName: () => order => {
        if ('foundedCustomer' in order) return order.foundedCustomer.shortName
        else return order.customer
      },
      tmpOrderStatus () {
        return function (statusId) {
          return this.$store.getters.tmpOrderStatus(statusId)
        }
      }
    }
  }
</script>

<style scoped>
  @media (min-width: 1400px){
    .item-row {
       height: 2em; 
    }
  }
  .item-row {
    border-bottom: 1px solid #b3d4fc;
  }
  .selected {
    background-color: #80deea;
  }
  .pointer {
    cursor: pointer;
  }
</style>