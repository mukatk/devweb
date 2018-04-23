<template>
  <v-layout row justify-center>
    <v-flex xs12>
      <v-card class="white">
        <v-card-text>                   
            <h1>Vai ter um gráfico bem show aqui</h1>             
        </v-card-text>
      </v-card>
      <v-spacer class="mt-2"></v-spacer>
      <v-tabs grow show-arrows slider-color="primary" v-model="mesSelecionado">
        <v-tab v-for="mes in meses" :key="mes" ripple>{{mes.substring(0, 3)}}</v-tab>
        <v-tab-item lazy v-for="mes in meses" :key="mes">
          <v-card flat>
            <v-card-text>{{mes}}</v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'Dashboard',
  mounted: function () {
    this.mesSelecionado = (new Date().getMonth()).toString();
  },
  computed: {
    usuariologado: function () {
        return JSON.parse(sessionStorage.getItem('usuariologado'));
    }
  },
  data: () => {
    return {
      mesSelecionado: '0',
      meses: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
    }
  },
  methods: {
    carregaGastos: function (mes) {
      
    }
  }
}
</script>

