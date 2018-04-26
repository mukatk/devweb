<template>
  <v-layout row justify-center>
    <v-flex xs12>
      <v-card class="white">
        <v-card-text>                   
            <h1>Vai ter um gráfico bem show aqui</h1>             
        </v-card-text>
      </v-card>
      <v-spacer class="mt-2"></v-spacer>
      <v-tabs color="grey darken-1" grow show-arrows slider-color="primary" v-model="mesSelecionado">
        <v-tab class="white--text" v-for="item in meses" :key="item.mes" ripple>{{item.mes.substring(0, 3)}}</v-tab>
        <v-tab-item lazy v-for="(item, index) in meses" :key="item.mes">
          <v-card flat color="secondary">
            <v-card-text>
              <v-btn v-if="index >= mesAtual" color="primary">Adicionar despesa</v-btn>

              <v-data-table
                :headers="cabecalhos"
                :items="item.despesas"
                hide-actions
                class="elevation-1 mt-2 grid-gastos"
                no-data-text="Parece que você não cadastrou nenhuma despesa para este período"
              >
                <template slot="items" slot-scope="props">
                  <td>{{ props.item.descricao }}</td>
                  <td>{{ formatMoney(props.item.valor) }}</td>
                  <td><v-icon>{{classTipoGasto(props.item.idTipoGasto)}}</v-icon></td>
                </template>
              </v-data-table>
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
    this.mesSelecionado = this.mesAtual.toString();
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
        this.meses[val].despesas = [{
          id: 1,
          descricao: 'Almoço no Ramblas',
          valor: 16.0,
          idTipoGasto: 1
        }];
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
      ],
      cabecalhos: [
        {
          text: 'Descrição',
          align: 'left',
          value: 'descricao'
        },
        { text: 'Valor', value: 'valor' },
        { text: 'Tipo de Gasto', value: 'idTipoGasto' }
      ]
    }
  },
  methods: {
    formatMoney: function (valor) {
      return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' });
    },
    classTipoGasto: function (idTipoGasto) {
      switch (idTipoGasto) {
        case 1:
          return 'restaurant'      
        default:
          return 'attach_money'
      }
    },
    carregaGastos: function (mes) {
      
    }
  }
}
</script>
