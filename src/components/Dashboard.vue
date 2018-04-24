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
        <v-tab v-for="item in meses" :key="item.mes" ripple>{{item.mes.substring(0, 3)}}</v-tab>
        <v-tab-item lazy v-for="(item, index) in meses" :key="item.mes">
          <v-card flat>
            <v-card-text>
              <v-btn v-if="index >= mesAtual" color="primary">Adicionar despesa</v-btn>

              <v-list>
                <v-list-tile v-for="despesa in item.despesas" :key="despesa.id">
                  <v-list-tile-action>
                    <v-icon color="primary">food</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title v-text="despesa.descricao"></v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-avatar>
                    <v-icon></v-icon>
                  </v-list-tile-avatar>
                </v-list-tile>
              </v-list>
            </v-card-text>
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
    this.mesSelecionado = this.toString();
  },
  computed: {
    mesAtual: function () {
      return (new Date().getMonth());
    },
    usuariologado: function () {
        return JSON.parse(sessionStorage.getItem('usuariologado'));
    }
  },
  watch: {
    mesSelecionado: function (val) {
      if (val == 1) {
        this.meses[val].despesas.push({
          descricao: 'Comida'
        });
      }
    }
  },
  data: () => {
    return {
      mesSelecionado: '0',
      meses: [
        { mes: "Janeiro", despesas: [] },
        { mes: "Fevereiro", despesas: [] },
        { mes: "Março", despesas: [] },
        { mes: "Abril", despesas: [] },
        { mes: "Maio", despesas: [] },
        { mes: "Junho", despesas: [] },
        { mes: "Julho", despesas: [] },
        { mes: "Agosto", despesas: [] },
        { mes: "Setembro", despesas: [] },
        { mes: "Outubro", despesas: [] },
        { mes: "Novembro", despesas: [] },
        { mes: "Dezembro", despesas: [] },
      ]
    }
  },
  methods: {
    carregaGastos: function (mes) {
      
    }
  }
}
</script>

