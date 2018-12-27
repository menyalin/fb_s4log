<template>
  <div>
    <v-snackbar
      dark
      v-model="snackbar"
      color="info"
      :multi-line="true"
      :timeout="errorTimeOut">
      {{ error }}
      <v-btn dark flat @click="close">Close</v-btn>
    </v-snackbar>
  </div>
</template>
<script>
  export default {
    name: 'errorSnackbar',
    data () {
      return {
        snackbar: true,
      }
    },
    computed: {
      error () {
        return this.$store.getters.error
      },
      errorTimeOut () {
        return this.$store.getters.errorTimeOut
      }
    },
    methods: {
      close () {
        this.$store.commit('clearError')
      }
    }
  }
</script>
<style scoped>
</style>