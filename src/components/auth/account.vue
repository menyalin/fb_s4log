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
              <h2>Компании:</h2>
            </v-flex>
            <v-flex class="text-xs-right">
              <app-new-partner-modal/>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex>
              <v-card v-for="(partner, key) in partners" class="ma-1" :key="key">
                <v-card-title class="headline">
                  {{ partner.shortName }}
                  {{ partner}}
                </v-card-title>
                <v-card-actions>
                  <v-btn :to="'/partner/'+ key">Открыть</v-btn>
                </v-card-actions>

              </v-card>
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
      },
      partners() {
        return this.$store.getters.partners
      }
    },
    methods: {
      partnerUrl(id) {
        return `/partner/${id}`
      },
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
