<template>
  <v-dialog v-model="dialog" persistent max-width="500">
    <v-btn slot="activator" color="primary" dark @click="initModal">Изменить личные данные</v-btn>
    <v-card>
      <v-card-title class="headline">{{ user.email }}</v-card-title>
      <v-card-text>
        <v-text-field label="Имя" v-model="name"/>
        <v-text-field  disabled label="Телефон"/>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat @click="dialog = false">Отмена</v-btn>
        <v-btn color="green darken-1" flat @click="updateUser">Сохранить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'accountSettingModal',
    data() {
      return {
        dialog: false,
        name: ''
      }
    },
    computed: {
      user() {
        return this.$store.getters.user
      }
    },
    methods: {
      initModal() {
        this.name = this.user.displayName
      },
      updateUser() {
        this.$store.dispatch('updateUser', {displayName: this.name})
          .then(() => this.dialog = false)
      }
    }
  }
</script>

<style scoped>

</style>
