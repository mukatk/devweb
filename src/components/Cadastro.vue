<template>
  <v-layout row justify-center>
    <v-flex xs12 md5>
      <h1 class="titulo">Cadastro</h1>
      <v-form ref="form" v-model="formularioValido">
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
        <v-text-field dark label="E-mail" 
          v-model="usuario.email"
          :rules="regras.email"
          :disabled="editando" 
          required>
        </v-text-field>
        <v-text-field dark label="Senha" 
          :type="!verSenha ? 'password' : 'text'" 
          v-model="usuario.senha"
          :append-icon="!verSenha ? 'visibility' : 'visibility_off'"
          :append-icon-cb="() => (verSenha = !verSenha)"
          :rules="regras.senha" 
          required>
        </v-text-field>
        <v-text-field dark label="Nome"
          :counter="100" 
          v-model="usuario.nome" 
          :rules="regras.nome"
          required>
        </v-text-field>
        <v-text-field dark label="Renda"
          ref="renda"
          v-model.lazy="rendaFormatada"
          :rules="regras.renda" v-money="money"
          :validate-on-blur="!editando"
          required>
        </v-text-field>
        <v-select dark :items="lstEstados"
          :loading="lstEstados.length == 0"
          label="Estado"
          v-model="usuario.estado"        
          item-value="texto"
          item-text="texto">
        </v-select>
        <v-select dark :items="lstCidades"
          :disabled="lstCidades.length == 0"
          :loading="lstCidades.length == 0"
          v-if="usuario.estado > 0"
          label="Cidade"
          v-model="usuario.cidade"
          autocomplete
          item-value="texto"
          item-text="texto">
        </v-select>
        <v-spacer class="mt-2"></v-spacer>
        <v-btn flat color="primary">Cancelar</v-btn>
        <v-btn class="right" :disabled="!formularioValido" @click="salvarUsuario" color="primary">Salvar</v-btn>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'
import {VMoney} from 'v-money'

export default {
  name: 'Cadastro',
  directives: {
    money: VMoney
  },
  data: () => {
    return {
      editando: false,
      formularioValido: false,
      imagemValida: false,
      urlImagemModal: '',
      modalImagem: false,
      verSenha: false,
      lstEstados: [],
      lstCidades: [],
      rendaFormatada: 0.0,
      regras: {
        nome: [
          v => !!v || 'Você não pode deixar este campo em branco',
          v => v.length <= 100 || 'O nome pode ter no máximo 100 caracteres'
        ],
        senha: [
          v => !!v || 'Você não pode deixar este campo em branco',
        ],
        email: [
          v => !!v || 'Você não pode deixar este campo em branco',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Este formato de e-mail não é válido'
        ],
        renda: [
          v => v != 'R$ 0,00' || 'Você precisa informar uma renda válida'
        ]
      },
      usuario: {
        nome: '',
        email: '',
        senha: '',
        renda: 0.0,
        cidade: '',
        estado: '',
        avatar: ''
      },
      money: {
          decimal: ',',
          thousands: '.',
          prefix: 'R$ ',
          precision: 2,
          masked: false /* doesn't work with directive */
      }
    }
  },
  watch: {
    'usuario.estado': function (val) {
      if (val) {
        this.carregaCidades(val);
      }
    },
    rendaFormatada: function (val) {
      if (val && typeof val == 'string') {
        this.usuario.renda = this.formataRenda(val);
      }
    }
  },
  mounted: function () {
    this.carregaEstados();
    this.carregaUsuario();
  },
  methods: {
    formataRenda: function (val) {
      return parseFloat(val.replace('R$ ', '').replace(/(\.)/g, '').replace(',', '.'));
    },
    trocaFoto: function () {
      this.usuario.avatar = this.urlImagemModal;
      this.urlImagemModal = '';
      this.modalImagem = false;
    },
    carregaUsuario: function () {
      const usuariologado = JSON.parse(sessionStorage.getItem('usuariologado'));
      
      if (usuariologado) {
        this.usuario = usuariologado;
        this.$refs.renda.$el.getElementsByTagName('input')[0].value = usuariologado.renda * 100; //Tratativa para bug do componente
        this.rendaFormatada = usuariologado.renda;
        this.editando = true;
      }
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
      axios.post('http://ws-save-app.herokuapp.com/usuario', self.usuario)
      .then(() => {
        axios.get(`http://ws-save-app.herokuapp.com/usuario?email=${self.usuario.email}&senha=${self.usuario.senha}`)
        .then((response) => {
          localStorage.setItem('usuariologado', JSON.stringify(response.data));
          self.$router.push('/Dashboard');
        });
      });
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

