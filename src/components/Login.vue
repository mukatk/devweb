<template>
    <v-layout flex align-center justify-center>
        <v-flex xs12 sm4> 
            <h1 class="titulo">Login</h1>
            <v-card class="white">
                <v-card-text>                   
                    <v-text-field dark label="Login:" v-model="usuario.login" required></v-text-field>
                    <v-text-field dark label="Senha:" 
                    :type="!verSenha ? 'password' : 'text'"
                    v-model="usuario.senha"
                    :append-icon="!verSenha ? 'visibility' : 'visibility_off'"
                    :append-icon-cb="() => (verSenha = !verSenha)" 
                    required>
                    </v-text-field>                   
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="navigateTo('/Cadastro')" flat color="primary">Criar conta</v-btn>                    
                    <v-spacer></v-spacer>
                    <v-btn color="primary">Próxima</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    name: 'Login',
    data: () => {
      return {
          login: '',
          senha: ''
      }
    },
    created: function(){
        this.navigateTo();
    },
    methods: {
        navigateTo: function(nav){
             this.$router.push(nav);
        }
    }
}
</script>
