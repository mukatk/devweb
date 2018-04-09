<template>
  <v-container fluid fill-height>
      <v-layout flex align-center justify-center>
        <v-flex xs12 sm4 lg2> 
            <v-card class="white">
                <v-card-text class="white--text text-xs-center">
                    <v-avatar size="120px">
                        <img :src="imgAvatar" alt="avatar">
                    </v-avatar>
                    <h3 class="nome-usuario mt-3">{{ nome }}</h3>
                </v-card-text>
                <v-card-actions>
                    <v-btn flat color="primary">Continuar</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary">Logout</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'Landing',
    data: () => {
      return {
          nome: 'Joice Cazanoski Gomes',
          imgAvatar: 'https://instagram.fpoa9-2.fna.fbcdn.net/vp/871b91a175c433517175462e7534e578/5B65381F/t51.2885-19/s320x320/29093239_2041143672840525_1199620164325212160_n.jpg'
      }
    }
}
</script>

<style>
.nome-usuario {
    color: #757575;
}
</style>
