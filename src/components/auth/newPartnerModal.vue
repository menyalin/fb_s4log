<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <v-btn slot="activator" color="primary" dark>Добавить</v-btn>
    <v-card>
      <v-card-title class="headline">Новая компания</v-card-title>
      <v-card-text>
        <v-text-field label="ИНН" v-model="inn"/>
        <v-text-field label="Сокращенное наименование" v-model="shortName"/>
        <v-text-field label="Полное наименование" v-model="fullName"/>
        <v-text-field disabled label="Дата регистрации юр.лица" v-model="registrationDate"/>
        <v-text-field disabled label="Фактический адрес" v-model="address"/>
        <v-text-field disabled label="Контактный телефон" v-model="phone"/>
        <v-text-field disabled label="Ответственный менеджер" v-model="manager"/>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat @click="cancelCreate">Отмена</v-btn>
        <v-btn color="green darken-1" flat @click="createPartner" :loading="loading">Создать</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: "newPartner",
    computed: {
      loading() {
        return this.$store.getters.loading
      }
    },
    methods: {
      createPartner() {
        this.$store.dispatch('createPartner', {
          inn: this.inn,
          shortName: this.shortName,
          fullName: this.fullName
        })
          .then(() => {
            this.inn = ''
            this.shortName = ''
            this.fullName = ''
            this.dialog = false
          })
          .catch((err) => this.$store.dispatch("setError", err.message))
      },
      cancelCreate() {
        this.dialog = false
      }
    },
    data() {
      return {
        dialog: false,
        inn: '',
        shortName: '',
        fullName: '',
        registrationDate: null,
        address: '',
        phone: '',
        manager: ''
      }
    }
  }
</script>

<style scoped>

</style>
