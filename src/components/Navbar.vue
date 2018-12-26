<template>
  <v-toolbar dark app dense>
    <v-toolbar-side-icon/>
    <v-toolbar-title><router-link to="/" >s4log</router-link></v-toolbar-title>
    <v-spacer/>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat>Link One</v-btn>
      <v-btn flat to="/auth/login">Login</v-btn>
      <v-btn flat to="/test">test</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>
<script>
  export default {
    name: 'Navbar'
  }
</script>
<style scoped>
</style>