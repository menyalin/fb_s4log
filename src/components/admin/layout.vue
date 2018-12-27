<template>
  <v-container fluid pa-0>
    <v-layout row>
      <v-flex xs2>
        <v-navigation-drawer permanent>
          <v-list>
            <v-list-tile v-for="item in items" :key="item.title" @click="">
              <v-list-tile-content>
                <router-link :to="item.url"><v-list-tile-title >{{ item.title }}</v-list-tile-title></router-link>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-navigation-drawer>
      </v-flex>
      <v-flex>
        <router-view/>
      </v-flex>
    </v-layout>



  </v-container>
</template>
<script>
  export default {
    data () {
      return {
        items: [
          {title: 'Regions', url: '/admin/regions'},
        ]
      }
    }
  }
</script>
<style scoped>
</style>