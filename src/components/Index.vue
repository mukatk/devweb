<template>
    <v-container fluid fill-height>
      <v-layout flex align-center justify-center>
          <img src="/static/img/icons/android-chrome-192x192.png" alt="logo" />
      </v-layout>
    </v-container>
</template>

<script>
export default {
  name: 'Index',
  mounted: function () {
      const self = this;
      setTimeout(function () {
          self.$router.push('/Landing');
      }, 5000);
  }
}
</script>