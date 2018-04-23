<template>
  <v-app>
    <v-container fluid :fill-height="fillheight">
      <transition appear mode="out-in" name="fade">
        <router-view />
      </transition>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  computed: {
    fillheight: function () {
      const rota = this.$route.path;
      return rota == '/' || rota == '/Login' || rota == '/Landing';
    }
  }
}
</script>

<style scoped>
#app {
    background: #0646a6;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
