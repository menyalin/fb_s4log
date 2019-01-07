<template>
  <v-dialog v-model="dialog" persistent max-width="590">
    <v-btn v-if="isNewRegion" slot="activator" color="primary" dark>
      <v-icon>add</v-icon>
    </v-btn>
    <v-icon v-else class="mr-2" slot="activator" @click="initialize">edit</v-icon>
    <v-card>
      <v-card-title class="headline">New region</v-card-title>
      <v-card-text>
        <v-container fluid pa-0>
          <v-layout row wrap>
            <v-flex pa-2>
              <v-text-field label="Group" v-model="group"/>
            </v-flex>
            <v-flex pa-2>
              <v-text-field label="Region" v-model="region"/>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat @click="submitHandler">{{ isNewRegion? 'Создать' : 'Обновить'}}</v-btn>
        <v-btn color="green darken-1" flat @click="cancelHandler">Отмена</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: "regionModal",
    props: ['regionId'],
    data() {
      return {
        dialog: false,
        group: '',
        region: '',
        editedRegion: {
          id: '',
          group: '',
          region: ''
        }
      }
    },
    methods: {
      cancelHandler() {
        if (this.isNewRegion) {
          this.group = ''
          this.region = ''
          this.dialog = false
        } else {
          this.group = this.editedRegion.group
          this.region = this.editedRegion.region
          this.dialog = false
        }
      },
      submitHandler() {
        if (this.isNewRegion) {
          this.$store.dispatch('newRegion', {group: this.group, region: this.region})
            .then(() => {
              this.group = ''
              this.region = ''
              this.dialog = false
            })
            .catch((error) => this.$store.dispatch("setError", error.message))
        } else {
          this.$store.dispatch('updateRegion', {id: this.regionId, group: this.group, region: this.region})
            .then(() => {
              this.dialog = false
            })
            .catch((error) => this.$store.dispatch("setError", error.message))

        }
      },
      initialize() {
        if (!this.isNewRegion) {
          this.editedRegion = this.$store.getters.regionById(this.regionId)
          this.group = this.editedRegion.group
          this.region = this.editedRegion.region
        }
      }
    },
    computed: {
      isNewRegion() {
        return !this.regionId
      }
    }
  }
</script>

<style scoped>

</style>
