<template>
  <div>
    <div>
      <v-container fluid pa-0 ma-2>
        <v-layout row wrap justify-start class="selected"> 
          <v-flex xs12 lg3 class="item_1">
                <div class="toggle-icon">
                  <div v-if='!isHeader' @click='selectToggle'>
                    <v-icon v-if='order.selected'>check_box</v-icon>
                    <v-icon v-if='!order.selected'>check_box_outline_blank</v-icon>
                  </div>  
                </div>
                <div>{{isHeader ? 'Статус': order.status}}</div>
                <div>
                  <v-icon small v-if="!isHeader && order.searchCar">done</v-icon>
                </div>
                <div>{{ isHeader ? 'Способ доставки' : order.method }}</div>
                <div class="num">{{ isHeader ? 'Заказ' : order.num }}</div>
                <div class="num">{{ isHeader ? 'Заказ EDI': order.numEDI}}</div>
          </v-flex>
          <v-flex xs5 lg3 offset-xs-1 class="item_2">
              <div>{{ isHeader ? 'Загрузка': this.dateShipping }}</div>
              <div>{{ isHeader ? 'Доставка' : this.dateDelivery + '  09:00' }}</div> 
              <div>{{ isHeader ? 'Покупатель' : order.customer }}</div>
          </v-flex>
        
          <v-flex xs12 lg4 class="item_4">
            <div>{{ isHeader ? 'Адрес доставки' : order.address }}</div>
            <div>{{ isHeader ? 'Направление': order.way }}</div>
          </v-flex>
          <v-flex xs12 lg2 class="item_5">
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
    }
  },
  methods: {
    selectToggle() {
      this.$store.commit("toggleSelectorTmpOrder", this.order._id);
    },
    testMethod() {
      console.log(1)
    }
  }
};
</script>

<style scoped>
.item_1 {
  display: grid;
  grid-template-columns: 1fr 2fr 1em 2fr 2fr 4fr;
  grid-column-gap: 3px;
  align-items: center;
  justify-items: center;
  justify-content: center;
  align-content: center;
  text-align: center;
  cursor: auto;
}
.item_2{
  display: grid;
  grid-template-columns: 2fr 3fr 4fr;
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
.selected{
 border: solid 2px steelblue;
 border-radius: 6px;
 border-top: none;
}

</style>