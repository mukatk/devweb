<template>
    <img src="/static/img/icons/android-chrome-192x192.png" alt="logo" />
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