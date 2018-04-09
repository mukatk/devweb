<template>
  <v-container fluid fill-height>
      <v-layout flex align-center justify-center>
        <v-flex xs12 sm4> 
            <v-card class="white">
                <v-card-text class="white--text text-xs-center">
                    <v-avatar size="120px">
                        <img :src="usuariologado.imgAvatar" alt="avatar">
                    </v-avatar>
                    <h3 class="nome-usuario mt-3">{{ usuariologado.nome }}</h3>
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="efetuarLogout" flat color="primary">Logout</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="primary">Continuar</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'Landing',
    computed: {
        usuariologado: function () {
            return JSON.parse(sessionStorage.getItem('usuariologado'));
        }
    },
    methods: {
        efetuarLogout: function () {
            sessionStorage.removeItem('usuariologado');
            this.$router.push('/Login');
        }
    }
}
</script>

<style>
.nome-usuario {
    color: #757575;
}
</style>
