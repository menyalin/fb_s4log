<template>
  <v-app>
    <div v-if="appLoading">
      <app-loader/>
    </div>
    <div v-else>
      <app-navbar/>
      <v-content>
        <v-container fluid>
          <router-view/>
        </v-container>
      </v-content>
    </div>
    <app-error-snackbar v-if="error"/>
  </v-app>
</template>
<script>
  import appNavbar from '@/components/Navbar'
  import appLoader from '@/components/common/appLoader'
  import appErrorSnackbar from '@/components/common/errorSnackbar'

  export default {
    components: {
      appNavbar,
      appLoader,
      appErrorSnackbar
    },
    computed: {
      appLoading () {
        return this.$store.getters.appLoading
      },
      error () {
        return this.$store.getters.error
      }
    }
  }
</script>
<style scoped>
</style>
