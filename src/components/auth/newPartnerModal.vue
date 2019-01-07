<template>
    <v-dialog v-model="dialog" persistent max-width="600">
      <v-btn slot="activator" color="primary" dark>Добавить</v-btn>
      <v-card>
        <v-card-title class="headline">Новая компания</v-card-title>
        <v-card-text>
          <v-text-field label="ИНН" v-model="inn"/>
          <v-text-field label="Сокращенное наименование" v-model="shortName"/>
          <v-text-field label="Полное наименование" v-model="fullName"/>
          <v-text-field label="Дата регистрации юр.лица" v-model="registrationDate"/>
          <v-text-field label="Фактический адрес" v-model="address"/>
          <v-text-field label="Контактный телефон" v-model="phone"/>
          <v-text-field label="Ответственный менеджер" v-model="manager"/>
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
    name: "newPartner",
    data () {
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
