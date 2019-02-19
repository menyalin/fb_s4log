<template>

  <v-container fluid pa-1 >

    <v-layout row wrap class="filters-block">
      <v-btn
        color="primary"
        fab
        dark
        small
        bottom
      >
        <v-icon>expand_less</v-icon>
      </v-btn>
      <v-flex md2 pa-1>
        <v-select
          :items='statuses'
          label="Статусы заказа"
          item-text=1
          item-value=0
          multiple
          v-model = 'statusFilter'
          @change="changeStatusFilter"
          deletable-chips
          chips
        ></v-select>
      </v-flex>
      <v-flex md2 pa-1>
        <v-switch v-model="searchCar"
                  label="Поиск ТС (все)"
                  value="all"
                  @change="changeSearchCarFilter"
        />
      </v-flex>
      <v-flex md2 pa-1>
        <v-select label="Ответсвенный"
                  :items = 'managers.sort()'
                  multiple
                  v-model="managerFilter"
                  clearable

        />

      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false,
      statusFilter: [],
      searchCar: null,
      managerFilter: null

    }
  },
  created () {
    this.statusFilter = this.$store.getters.tmpOrderFilters.statusFilter
    this.searchCar = this.$store.getters.tmpOrderFilters.searchCarFilter
  },
  computed: {
    statuses () {
      return Object.entries(this.$store.getters.tmpOrderStatus);
    },
    managers () {
      return [... new Set(this.$store.getters.fullTmpOrderArray.map(item => item.manager))]


    }
  },
  methods: {
    changeStatusFilter () {
      this.$store.commit('tmpOrderFiltersUpdate', {statusFilter: this.statusFilter})
    },
    changeSearchCarFilter () {
      this.$store.commit('tmpOrderFiltersUpdate', {searchCarFilter: this.searchCar})
    }
  }
};
</script>

<style scoped>
.filters-block {
  border-radius: 5px;
}
</style>
