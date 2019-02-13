<template>
  <div>
    <v-card class="tmpOrderWrapper ma-1" :hover="!isHeader">
      <div class="toggle-icon">
        <v-icon v-if="!isHeader" color="primary">check_box</v-icon>
        <v-icon color="primary" v-else></v-icon>
      </div>
      <div>{{isHeader ? 'Статус': 'Новый'}}</div>
      <div>
        <v-icon small v-if="!isHeader">done</v-icon>
      </div>
      <div>{{ isHeader ? 'Способ доставки' : 'Авто' }}</div>
      <div class="num">{{ isHeader ? 'Заказ' : '21213' }}</div>
      <div class="num">{{ isHeader ? 'Заказ EDI': 'YB1232234'}}</div>
      <div>{{ isHeader ? 'Загрузка': '12.02.2019' }}</div>
      <div>{{ isHeader ? 'Доставка' : '16.02.2019 09:00' }}</div>
      <div>{{ isHeader ? 'Покупатель' : 'AO Тандер (2123433221)'}}</div>
      <div>{{ isHeader ? 'Адрес доставки' : 'Волгоградская область, р.п. Ерзовка'}}</div>
      <div>{{ isHeader ? 'Направление': '(РЦ Ерзовка) вт,пт'}}</div>
      <div class="weight">{{isHeader ? 'Вес (плт), %' : '17,34тн (26), 23%' }}</div>
      <div>{{ isHeader ? 'Менеджер': 'Адаптер ЭДО'}}</div>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["header"],
  data() {
    return {};
  },
  computed: {
    isHeader() {
      return !!this.header;
    }
  }
};
</script>

<style scoped>
@media (min-width: 600px) {
  .tmpOrderWrapper {
    background-color: aqua;
  }
}
.tmpOrderWrapper {
  display: grid;
  grid-template-columns: 2em 5em 1em 4em 5em 6em 5.5em 2fr 3fr 5fr 2fr 10em 2fr;
  grid-column-gap: 1px;
  align-items: center;
  justify-items: center;
  cursor: auto;
}
.toggle-icon {
  justify-self: center;
}
</style>