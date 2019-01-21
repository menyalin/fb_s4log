<template>
  <v-container class="chatWrapper">
    <v-layout row>
      <v-flex  class="xs3 friendsList">
        <v-list two-line>
          <v-subheader>
            Диалоги
          </v-subheader>
          <v-divider></v-divider>
          <v-list-tile @click="">
            <v-list-tile-avatar>
              <img src="https://api.adorable.io/avatars/125/abott@adorable.png"/>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>Перевозчик 1.1</v-list-tile-title>
              <v-list-tile-sub-title>test@yandex.ru</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="">
            <v-list-tile-avatar>
              <img src="https://api.adorable.io/avatars/125/abott@adorable.png"/>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>Перевозчик 2</v-list-tile-title>
              <v-list-tile-sub-title>test@yandex.ru</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="">
            <v-list-tile-avatar>
              <img src="https://api.adorable.io/avatars/125/abott@adorable.png"/>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>Перевозчик 4</v-list-tile-title>
              <v-list-tile-sub-title>test@yandex.ru</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-flex>
      <v-flex class="chatMessages">
        messages

        <div>
          <v-text-field label="some text"/>
        </div>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
  export default {
    name: "chatLayout"
  }
</script>

<style scoped>
  .chatWrapper {
    height: 100%;
  }
  .chatMessages {
    border: black 1px solid;

  }

</style>
