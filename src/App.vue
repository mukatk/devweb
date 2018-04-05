<template>
  <v-app>
    <transition appear mode="out-in" name="fade">
      <router-view />
    </transition>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
