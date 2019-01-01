<template>

    <v-dialog v-model="dialog" persistent max-width="590">
      <v-btn slot="activator" color="primary" dark><v-icon>add</v-icon></v-btn>
      <v-card>
        <v-card-title class="headline">New region</v-card-title>
        <v-card-text>
          <v-container fluid pa-0>
            <v-layout row wrap>
              <v-flex pa-2>
                <v-text-field label="Group"/>
              </v-flex>
              <v-flex pa-2>
                <v-text-field label="Region"/>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="dialog = false">Отмена</v-btn>
          <v-btn color="green darken-1" flat @click="dialog = false">Создать</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
  export default {
    name: "regionModal",
    data () {
      return {
        dialog: false,
        group: '',
        region: ''
      }
    }
  }
</script>

<style scoped>

</style>
