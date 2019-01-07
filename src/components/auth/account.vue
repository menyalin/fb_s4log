<template>
  <v-container>
    <v-layout row wrap>
      <v-flex md2>
        <h2>{{ user.displayName }}</h2>
        <small> {{ user.uid}}</small>
        <div>{{user.email}}</div>
        <div v-if="user.emailVerified">email подтвержден</div>
        <div v-else @click="emailVerified"><a>требуется подтверждение Email</a></div>
        <app-account-setting-modal :userId="user.uid"/>
      </v-flex>
      <v-flex md5>
        <v-container fluid>
          <v-layout row class="align-center">
            <v-flex>
              <h2>Компании:</h2></v-flex>
            <v-flex class="right">
              <app-new-partner-modal/>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import accountSettingModal from "./accountSettingModal";
  import newPartnerModal from './newPartnerModal'

  export default {
    name: 'account',
    components: {
      appAccountSettingModal: accountSettingModal,
      appNewPartnerModal: newPartnerModal
    },
    computed: {
      user() {
        return this.$store.getters.user
      }
    },
    methods: {
      emailVerified() {
        if (!this.user.emailVerified) {
          this.$store.dispatch('emailVerified')
        }
      }
    }
  }
</script>

<style scoped>

</style>
