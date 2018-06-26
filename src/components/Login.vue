<template>
    <v-layout flex align-center justify-center>
        <v-flex xs12 sm4> 
            <h1 class="titulo">Login</h1>            
                <v-card-text>                   
                    <v-text-field dark label="E-mail:"
                        v-model="usuario.email" 
                        :rules="regras.email"
                        required>
                    </v-text-field>
                    <v-text-field dark label="Senha:"   
                        :type="!verSenha ? 'password' : 'text'"                      
                        v-model="usuario.senha"            
                        :append-icon="!verSenha ? 'visibility' : 'visibility_off'"
                        :append-icon-cb="() => (verSenha = !verSenha)"
                        :rules="regras.senha"           
                        required>                  
                    </v-text-field>                   
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="cadastro" flat color="primary">Criar conta</v-btn>                    
                    <v-spacer></v-spacer>
                    <v-btn @click="verificaUser" color="primary">Próxima</v-btn>
                </v-card-actions>
           
        </v-flex>
    </v-layout>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Login',
    data: () => {
      return {
          usuario:{
            email: '',
            senha: ''
          },

          verSenha: false,
          regras: {
            email: [
                v => !!v || 'Você não pode deixar este campo em branco',
                v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Formato de e-mail inválido'
              ],
             senha: [
                v => !!v || 'Você não pode deixar este campo em branco'
             ]
          },          
      }
    },    

    methods: {
        cadastro: function(){
            const self = this;
            self.$router.push('/Cadastro');
        },
        verificaUser: function() {
            const self = this;
            axios.get(`http://ws-save-app.herokuapp.com/usuario?email=${self.usuario.email}&senha=${self.usuario.senha}`)
            .then((response) => {
                if (response.data) {
                    localStorage.setItem('usuariologado', JSON.stringify(response.data));
                    self.$router.push('/Dashboard');
                } else {
                    alert('Login incorreto');
                }
            });
        }    

    },     
}
</script>
<style scoped>
.titulo {
  color: #ff9800;
}

.pointer {
  cursor: pointer;
}

.visible_off {
  visibility: hidden;
  transition: visibility .5s;
}
</style>
