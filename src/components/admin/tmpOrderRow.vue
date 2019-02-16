<template>
  <div>
    <div>
      <v-container fluid pa-0 ma-1>
        <v-layout row wrap justify-start class="row-wrapper" :class='{selected: orderSelected}'> 
          <v-flex xs12 lg3 md6 class="item_1">
                <div class="toggle-icon" color='primary' v-if='!isHeader'> 
                  <div  @click='selectToggle'>
                    <v-icon v-if='orderSelected' color='primary'>check_box</v-icon>
                    <v-icon v-else>check_box_outline_blank</v-icon>
                  </div>
                </div>
                <div v-if='isHeader'></div>   <!-- Сделать кнопку выделения всех отображаемых строк -->
                <div>{{isHeader ? 'Статус': order.status}}</div>
                <div>
                  <v-icon small v-if="!isHeader && order.searchCar">done</v-icon>
                </div>
                <div>{{ isHeader ? 'Способ доставки' : order.method }}</div>
                <div class="num">{{ isHeader ? 'Заказ' : order.num }}</div>
                <div class="num">{{ isHeader ? 'Заказ EDI': order.numEDI}}</div>
          </v-flex>
          <v-flex xs5 lg3 md6 offset-xs-1 class="item_2">
              <div>{{ isHeader ? 'Загрузка': this.dateShipping }}</div>
              <div>{{ isHeader ? 'Доставка' : this.dateDelivery + '  09:00' }}</div> 
              <div>{{ isHeader ? 'Покупатель' : order.customer }}</div>
          </v-flex>
        
          <v-flex xs12 lg4 md8 class="item_4">
            <div>{{ isHeader ? 'Адрес доставки' : order.address }}</div>
            <div>{{ isHeader ? 'Направление': order.way }}</div>
          </v-flex>
          <v-flex xs12 lg2 md4 class="item_5">
                <div class="weight">{{isHeader ? 'Вес (плт), %' : '17,34тн (26), 23%' }}</div>
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
    }
  },
  methods: {
    selectToggle() {
      this.$store.commit("toggleSelectorTmpOrder", this.order._id);
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
  grid-template-columns: 5fr 3fr;
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
}

</style>