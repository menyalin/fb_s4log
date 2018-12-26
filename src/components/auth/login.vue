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
              <v-text-field prepend-icon="email" name="email" label="Email" type="email" reqired v-model="email"/>
              <v-text-field id="password" prepend-icon="lock" name="password" label="Password" v-model="password"
                            type="password"></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="submit">Login</v-btn>
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
        this.$store.dispatch('login')
      }
    }
  }
</script>
<style scoped>
</style>