<template>
    <v-container fluid pa-0> 
      <v-layout row wrap>
        <v-flex>
          <app-tmp-order-filters/>
          <v-divider/>
          <app-tmp-order-row :header='true'/>
          <app-tmp-order-row v-for="order in tmpOrdersArray" :key="order._id" :order='order'/>
         
        </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import tmpOrderRow from './tmpOrderRow.vue'
import appTmpOrderFilters from './tmpOrderFilters.vue'

export default {
  name: "test",
  components: {
    appTmpOrderRow: tmpOrderRow,
    appTmpOrderFilters
  },
  data() {
    return {
     
    }
  },
  methods: {
    test() {}
  },
  computed: {
    tmpOrdersArray() {
      return this.$store.getters.tmpOrdersArray || null
    }
  }
};
</script>
<style scoped>
</style>


