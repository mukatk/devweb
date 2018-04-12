<template>
  <v-layout row justify-center>
    <v-flex xs12 md5>
      <h1 class="titulo">Cadastro</h1>
      <v-form ref="form">
        <v-spacer class="mb-2"></v-spacer>
        <v-layout row justify-center>
          <v-flex xs12 text-xs-center>
            <v-tooltip bottom>
              <v-avatar slot="activator" @click="() => (modalImagem = !modalImagem)" class="pointer" size="120px" color="secondary">
                <img v-if="usuario.avatar" class="avatarusuario" :src="usuario.avatar" alt="avatar">
                <v-icon class="iconefoto" color="white">add_a_photo</v-icon>
              </v-avatar>
              <span>Escolher foto</span>
            </v-tooltip>
            <v-dialog v-model="modalImagem" max-width="500px">
              <v-card>
                <v-card-title>Escolher foto</v-card-title>
                <v-card-text>
                  <v-text-field clearable v-model="urlImagemModal" label="Url da imagem"></v-text-field>
                  <v-layout row justify-center>
                    <v-flex xs12 text-xs-center>
                      <v-avatar size="120px">
                        <img @error="imagemValida=false" @load="imagemValida=true" :class="imagemValida ? '' : 'visible_off'" :src="urlImagemModal" alt="avatar">
                      </v-avatar>
                    </v-flex>
                  </v-layout>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" flat @click.stop="modalImagem=false">Cancelar</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" :disabled="!imagemValida" @click="trocaFoto">Finalizar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-flex>
        </v-layout>
        <v-spacer class="mt-2"></v-spacer>
        <v-text-field dark label="E-mail" v-model="usuario.email" required></v-text-field>
        <v-text-field dark label="Senha" 
          :type="!verSenha ? 'password' : 'text'" 
          v-model="usuario.senha"
          :append-icon="!verSenha ? 'visibility' : 'visibility_off'"
          :append-icon-cb="() => (verSenha = !verSenha)" 
          required>
        </v-text-field>
        <v-text-field dark label="Nome" v-model="usuario.nome" required></v-text-field>
        <v-text-field dark label="Renda"
          v-model.number="usuario.renda"
          required>
        </v-text-field>
        <v-select dark :items="lstEstados"
          :loading="lstEstados.length == 0"
          label="Estado"
          v-model="usuario.estado"        
          item-value="id"
          item-text="texto">
        </v-select>
        <v-select dark :items="lstCidades"
          :disabled="lstCidades.length == 0"
          :loading="lstCidades.length == 0"
          v-if="usuario.estado > 0"
          label="Cidade"
          v-model="usuario.cidade"
          autocomplete
          item-value="id"
          item-text="texto">
        </v-select>
        <v-spacer class="mt-2"></v-spacer>
        <v-btn flat color="primary">Cancelar</v-btn>
        <v-btn class="right" @click="salvarUsuario" color="primary">Salvar</v-btn>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Cadastro',
  data: () => {
    return {
      imagemValida: false,
      urlImagemModal: '',
      modalImagem: false,
      verSenha: false,
      lstEstados: [],
      lstCidades: [],
      usuario: {
        nome: '',
        email: '',
        senha: '',
        renda: 0.0,
        cidade: '',
        estado: '',
        avatar: ''
      }
    }
  },
  watch: {
    'usuario.estado': function (val) {
      if (val) {
        this.carregaCidades(val);
      }
    }
  },
  mounted: function () {
    this.carregaEstados();
  },
  methods: {
    trocaFoto: function () {
      this.usuario.avatar = this.urlImagemModal;
      this.urlImagemModal = '';
      this.modalImagem = false;
    },
    carregaUsuario: function () {
      this.usuario = JSON.parse(sessionStorage.getItem('usuariologado'));
    },
    carregaCidades: function (idEstado) {
      const self = this;
      axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${idEstado}/municipios`).then((response) => {
        self.lstCidades = response.data.map((cidade) => {
          return {
            id: cidade.id,
            texto: cidade.nome
          }
        }).sort((a, b) => { return a.texto.localeCompare(b.texto); });
      });
    },
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
    },
    salvarUsuario: function() {
      const self = this;
      const jsonUser = JSON.stringify(self.usuario);

      localStorage.setItem(self.usuario.email, jsonUser);

      sessionStorage.setItem('usuariologado', jsonUser);

      self.$router.push('/Dashboard');
    }
  }
}
</script>

<style scoped>
.titulo {
  color: #ff9800;
}

.pointer {
  cursor: pointer;
}

.iconefoto {
  position: absolute;
}

.avatarusuario {
  opacity: 0.8;
}

.visible_off {
  visibility: hidden;
  transition: visibility .5s;
}
</style>

