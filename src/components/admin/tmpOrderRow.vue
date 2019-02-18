<template>
  <div>
    <div>
      <v-container fluid pa-0 ma-1>
        <v-layout row wrap justify-start class="row-wrapper" :class='{selected: orderSelected}'> 
          <v-flex xs10 lg3 md6 class="item_1">
                <div class="toggle-icon" color='primary' v-if='!isHeader'> 
                  <div  @click='selectToggle'>
                    <v-icon v-if='orderSelected' color='primary'>check_box</v-icon>
                    <v-icon v-else>check_box_outline_blank</v-icon>
                  </div>
                </div>
                <div v-if='isHeader' @click="selectAll" class="toggle-icon">
                  <v-icon>{{ allSelectedState }}</v-icon>
                </div>   
                <div>{{isHeader ? 'Статус': tmpOrderStatus }} </div>
                <div>
                  <v-icon small v-if="!isHeader && order.searchCar">done</v-icon>
                </div>
                <div>{{ isHeader ? 'Способ доставки' : order.method }}</div>
                <div class="num">{{ isHeader ? 'Заказ' : order.num }}</div>
                <div class="num">{{ isHeader ? 'Заказ EDI': order.numEDI}}</div>
          </v-flex>
          <v-flex xs11 lg3 md6 class="item_2">
              <div>{{ isHeader ? 'Загрузка': this.dateShipping }}</div>
              <div>{{ isHeader ? 'Доставка' : this.dateDelivery + '  09:00' }}</div> 
              <div>{{ isHeader ? 'Покупатель' : order.customer }}</div>
          </v-flex>
          <v-flex xs11  lg4 md8 class="item_4">
            <div>{{ isHeader ? 'Направление': order.way }}</div>
            <div>{{ isHeader ? 'Адрес доставки' : order.address }}</div>
            
          </v-flex>
          <v-flex xs12 lg2 md4 class="item_5">
                <div class="weight">{{isHeader ? 'Вес (плт), %' : logisticСharacteristics }}</div>
                <div>{{ isHeader ? 'Менеджер': order.manager}}</div>
          </v-flex>
        </v-layout>  
      </v-container>
    </div>
  </div>
</template>

<script>
export default {

  props: ["header", "order"],
  data() {
    return {};
  },
  computed: {
    logisticСharacteristics () {
       return `${this.order.weight}тн (${this.order.pltCount}), ${this.order.thermal}%` 
    },
    tmpOrderStatus () {
      return this.$store.getters.tmpOrderStatus[this.order.status]
    },
    isHeader() {
      return !!this.header;
    },
    dateShipping() {
      return this.order.dateShipping.toLocaleDateString("ru");
    },
    dateDelivery() {
      return this.order.dateDelivery.toLocaleDateString("ru");
    },
    orderSelected() {
      return !this.isHeader && this.order.selected ;
    },
    allSelectedState () {
      return this.$store.getters.tmpOrderSelectedState
    } 
  },
  methods: {
    selectToggle() {
      this.$store.commit("toggleSelectorTmpOrder", this.order._id);
    },
    selectAll() {
      switch (this.allSelectedState) {
        case 'check_box':
          this.$store.commit('unSelectAllTmpOrder')
          break;
        case 'indeterminate_check_box':
           this.$store.commit('unSelectAllTmpOrder')
          break;
        case 'check_box_outline_blank':
          this.$store.commit('selectAllTmpOrder')
          break;
      }
    }
  }
};
</script>

<style scoped>
.toggle-icon {
  cursor: pointer;
}

.item_1 {
  display: grid;
  grid-template-columns: 1fr 2fr 1em 2fr 2fr 4fr;
  align-items: center;
  justify-items: center;
  justify-content: center;
  align-content: center;
  text-align: center;
  cursor: auto;
}
.item_2{
  display: grid;
  grid-template-columns: 2fr 3fr 5fr;
  grid-column-gap: 4px;
  text-align: center;
  align-items: center;
}
.item_4 {
  display: grid;
  text-align: center;
  grid-template-columns: 3fr 5fr;
  grid-column-gap: 4px;
  align-items: center;
}
.item_5{
  display: grid;
  text-align: center;
  grid-template-columns: 2fr 3fr;
  align-items: center;
}
.row-wrapper{
 border: solid 2px steelblue;
 border-radius: 6px;
 border-top: none;
 grid-column-gap: 3px;
}
.selected {
  background-color: lightskyblue;
  border: solid 3px lightskyblue;
}

</style>