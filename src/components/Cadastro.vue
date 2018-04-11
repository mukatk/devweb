<template>
  <v-layout row justify-center>
    <v-flex xs12 md5>
      <h1 class="titulo">Cadastro</h1>
      <v-text-field dark label="Nome" v-model="usuario.nome" required></v-text-field>
      <v-text-field dark label="Senha" 
        :type="!verSenha ? 'password' : 'text'" 
        v-model="usuario.senha"
        :append-icon="!verSenha ? 'visibility' : 'visibility_off'"
        :append-icon-cb="() => (verSenha = !verSenha)" 
        required>
      </v-text-field>
      <v-text-field dark label="Renda"
        v-model.number="usuario.renda"
        required>
      </v-text-field>
      <v-select dark :items="lstEstados"
        :loading="lstEstados.length == 0"
        label="Estado"
        item-value="id"
        item-text="texto">
      </v-select>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Cadastro',
  data: () => {
    return {
      verSenha: false,
      lstEstados: [],
      usuario: {
        nome: '',
        senha: '',
        renda: 0.0,
        cidade: '',
        estado: '',
        avatar: ''
      }
    }
  },
  created: function () {
    this.carregaEstados();
  },
  methods: {
    carregaEstados: function () {
      const self = this;
      axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then((response) => {
        self.lstEstados = response.data.map((estado) => {
          return {
            id: estado.id,
            texto: `${estado.sigla} - ${estado.nome}`
          }
        }).sort((a, b) => { return a.texto.localeCompare(b.texto); });
      });
    }
  }
}
</script>

<style scoped>
.titulo {
  color: #ff9800;
}
</style>

