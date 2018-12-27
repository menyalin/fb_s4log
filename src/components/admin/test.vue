<template>
  <div>
    <v-btn dark @click="test" :loading="loading" :disabled="loading">button</v-btn>
  </div>
</template>
<script>
  export default {
    name: 'test',
    data () {
      return {}
    },
    methods: {
      test () {
        this.$store.dispatch('getDataTest')
      }
    },
    computed: {
      loading() {
        this.$store.getters.loading
      }
    }
  }
</script>
<style scoped>
</style>