<template>
<v-container fluid>
  <v-layout row wrap>
    <v-flex style="max-width: 320px;">
      <app-system-navigation/>
    </v-flex>
    <v-flex>
      <router-view/>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
  import systemNavigation from './systemNavigation'

  export default {
    components: {
      appSystemNavigation: systemNavigation
    },
    name: "systemLayout"
  }
</script>

<style scoped>

</style>
