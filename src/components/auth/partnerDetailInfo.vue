<template>
  <div>
    <h3>ИНН {{ partner.inn }}</h3>
    <h2>{{ partner.shortName }}</h2>
    <h3>{{ partner.fullName }}</h3>
    <h4>Пользователи:</h4>
      <div v-for="user in partner.users" >{{ user }}</div>
  </div>
</template>

<script>
  import firebase from '../../firebase'

  export default {
    name: "partnerDetailInfo",
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.$store.getters.partners[vm.id] ? next() : next('/account')
      })
    },

    computed: {
      partner() {
        return this.$store.getters.partners[this.id] || 'user not found'
      }
    },
    beforeMount() {
      // проверяем, есть ли currentUser в списке в партнере
      const UID = firebase.auth().currentUser.uid
    },
    props: ['id']
  }
</script>

<style scoped>

</style>
