<template>
  <v-navigation-drawer permanent>
    <v-list>
      <v-list-tile v-for="item in items" :key="item.id" :to='item.link'>
        <v-list-tile-action>
          <v-icon>{{item.icon}}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  export default {
    name: "systemNavigation",
    data() {
      return {
        items: [{
          id: 1,
          icon: 'add_box',
          link: '/system/importOrders',
          title: 'Import orders'
        },
        {
          id: 2,
          icon: '',
          link: '/system/',
          title: 'Заказы'
        }]
      }
    },
  }
</script>

<style scoped>

</style>
