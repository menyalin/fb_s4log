<template>
  <div>
    <v-btn dark @click="test">button</v-btn>
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
        this.$store.dispatch('setError', 'Ошибка!')
      }
    },
    computed: {}
  }
</script>
<style scoped>
</style>