<template>
  <v-toolbar dark app dense>
    <v-toolbar-side-icon/>
    <v-toolbar-title>
      <router-link to="/">s4log</router-link>
    </v-toolbar-title>
    <v-spacer/>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat to="/admin">Админка</v-btn>
      <v-btn v-if="loggedIn" flat to="/account">Account</v-btn>
      <v-btn v-if="!loggedIn" flat to="/auth/login">Login</v-btn>
      <v-btn to="/chat">chat</v-btn>
      <v-btn v-if="loggedIn" flat @click="logout">Logout</v-btn>
      <v-btn v-if="loggedIn" flat to="/system">Система</v-btn>
      <v-btn flat to="/test">test</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>
<script>
  export default {
    name: 'Navbar',
    computed: {
      loggedIn() {
        return this.$store.getters.loggedIn
      }
    },
    methods: {
      logout() {
        this.$confirm('Вы уверены?')
          .then((res) => {
            if (res) {
              this.$store.dispatch('logout').then(()=>this.$router.push('/'))
            }
          })
      }
    }
  }
</script>
<style scoped>
</style>
