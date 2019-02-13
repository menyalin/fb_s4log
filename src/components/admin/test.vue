<template>
    <v-container fluid pa-0>
      <v-layout row wrap>
        <v-flex>
          <app-tmp-order-row :header='true'/>
          <app-tmp-order-row/>
          <app-tmp-order-row/>
        </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import tmpOrderRow from './tmpOrderRow.vue'

export default {
  name: "test",
  components: {
    appTmpOrderRow: tmpOrderRow
  },
  data() {
    return {}
  },
  methods: {
    test() {}
  },
  computed: {
    loading() {
      this.$store.getters.loading;
    }
  }
};
</script>
<style scoped>
</style>


