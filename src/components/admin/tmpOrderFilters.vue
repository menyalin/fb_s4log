<template>
  <v-container fluid pa-1> 
    <v-layout row wrap class="filters-block">
      <v-flex md2 pa-2>
        <v-select
          :items='statuses'
          label="Статусы заказа"
          item-text=1
          item-value=0
          multiple
          chips
          v-model = 'statusFilter'
          @change="changeStatusFilter"
        ></v-select>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      statusFilter: []
    }
  },
  created () {
    this.statusFilter = this.$store.getters.tmpOrderFilters.statusFilter
  },
  computed: {
    statuses (){
      return Object.entries(this.$store.getters.tmpOrderStatus);
    }
  },
  methods: {
    changeStatusFilter () {
      this.$store.commit('tmpOrderFiltersUpdate', {statusFilter: this.statusFilter})
    }
  }
};
</script>

<style scoped>
.filters-block {
  border-radius: 5px;
}
</style>