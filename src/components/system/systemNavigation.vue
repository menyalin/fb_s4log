<template>
  <v-navigation-drawer
      class="blue lighten-3"
      dark
      permanent
  >
    <v-list>
      <v-list-tile to="/system/importOrders">
        <v-list-tile-action>
          <v-icon>add_box</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Import orders</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  export default {
    name: "systemNavigation"
  }
</script>

<style scoped>

</style>
