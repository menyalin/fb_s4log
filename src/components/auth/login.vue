<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-form>
          <v-card class="elevation-12">
            <v-toolbar dark>
              <v-toolbar-title>Login form</v-toolbar-title>
              <v-spacer/>
            </v-toolbar>
            <v-card-text>
              <v-text-field prepend-icon="email" label="Email" type="email" reqired v-model="email"/>
              <v-text-field prepend-icon="lock" label="Password" v-model="password" type="password"/>
            </v-card-text>
            <v-card-actions>
              <router-link to="/auth/signUp">Регистрация</router-link>
              <v-spacer/>
              <v-btn color="primary" @click="submit" :loading="loading" :disabled="loading">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    name: 'Login',
    data () {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      submit () {
        this.$store.dispatch('login', {email: this.email, password: this.password})
          .then(() => {
            if (this.loggedIn){
              this.$router.push('/')
            }
          })
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      },
      loggedIn () {
        return this.$store.getters.loggedIn
      }
    }
  }
</script>
<style scoped>
</style>