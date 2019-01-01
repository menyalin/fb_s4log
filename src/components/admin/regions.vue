<template>
  <v-container>
    <v-layout row>
      <v-flex sm2>
        <h1 class="pl-5">Regions</h1>
      </v-flex>
      <v-flex sm2>
        <v-select :items="regionGroups" label="Groups" v-model="groupFilter"/>
      </v-flex>
      <v-flex sm2 class="pl-3">
        <v-text-field label="Поиск региона" v-model="searchText"/>
      </v-flex>
      <v-flex class="text-xs-right">
        <v-spacer></v-spacer>
        <app-region-modal/>
        <v-btn dark color="primary" :loading="loading" @click="refresh"><v-icon>refresh</v-icon></v-btn>
      </v-flex>
    </v-layout>
    <v-divider/>
    <v-layout row class="pt-2">
      <v-flex sm10 offset-sm1>
        <v-card>
          <v-card-title class="regions-table">
            <div><h4>Id</h4></div>
            <div @click="changeOrder">
              <h4>Region
                <v-icon small>{{ regionsOrder === 1 ? 'arrow_drop_down': 'arrow_drop_up' }}</v-icon>
              </h4>
            </div>
            <div><h4>Group</h4></div>
            <div><h4>Actions</h4></div>
          </v-card-title>
          <v-divider/>
          <v-card-text>
            <div class="regions-table v-card--hover" v-for="region of allRegions" :key="region.id">
              <div class="pl-3">{{region.id}}</div>
              <div>{{region.region}}</div>
              <div>{{region.group}}</div>
              <div>
                <v-icon class="mr-2" @click="">edit</v-icon>
                <v-icon @click="deleteRegion(region.id)">delete</v-icon>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import regionModal from '@/components/common/regionModal'
  export default {
    name: 'regions',
    components: {
      appRegionModal: regionModal
    },
    data: () => ({
      groupFilter: 'Все',
      regionsOrder: 1,
      searchText: ''
    }),
    methods: {
      changeOrder () {
        this.regionsOrder *= -1
      },
      refresh () {
        this.$store.dispatch('getAllRegions')
      },
      deleteRegion (id) {
        this.$confirm('Вы точно хотите удалить запись?')
          .then(res => {
            if (res) this.$store.dispatch('deleteRegion', id)
          })
      }
    },
    computed: {
      allRegions () {
        return this.$store.getters.allRegions({
          group: this.groupFilter,
          regionOrder: this.regionsOrder,
          searchText: this.searchText
        })
      },
      regionGroups () {
        let groups = this.$store.getters.regionGroups
        groups.unshift('Все')
        return groups
      },
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>
<style scoped>
  .regions-table {
    display: grid;
    grid-template-columns: 2fr 2fr 2fr 1fr;
  }
</style>
