<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center class="pt-5">
      <v-progress-circular
        :size="200"
        :width="30"
        color="blue"
        indeterminate
      />
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    name: 'appLoader'
  }
</script>
<style scoped>
</style>