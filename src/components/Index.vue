<template>
    <v-layout flex align-center justify-center>
        <img src="/static/img/icons/android-chrome-192x192.png" alt="logo" />
    </v-layout>
</template>

<script>
export default {
  name: 'Index',
  mounted: function () {
      const self = this;
      const usuarioLogado = sessionStorage.getItem("usuariologado");

      setTimeout(function () {
          self.$router.push(usuarioLogado ? '/Landing' : '/Login');
      }, 5000);
  }
}
</script>