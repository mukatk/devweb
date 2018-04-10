<template>
    <v-flex xs12 sm4> 
        <v-card class="white">
            <v-card-text>
                <!-- TODO: campos de login e senha -->
            </v-card-text>
            <v-card-actions>
                <v-btn flat color="primary">Criar conta</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary">Próxima</v-btn>
            </v-card-actions>
        </v-card>
    </v-flex>
</template>

<script>
export default {
    name: 'Login',
    data: () => {
      return {
          login: '',
          senha: ''
      }
    }
}
</script>