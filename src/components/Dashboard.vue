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
              <v-btn v-if="index >= mesAtual" color="primary" @click="abreModalDespesa">Adicionar despesa</v-btn>

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
    <v-dialog v-model="modalDespesa" persistent max-width="500px">
      <v-card>
        <v-card-title>Adicionar despesa</v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-form ref="formDespesa" v-model="formDespesaValid">
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field :rules="regras.descricao" v-model="despesaModel.descricao" label="Descrição"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Valor"
                    ref="valor"
                    v-model.lazy="despesaFormatada"
                    :rules="regras.valor" v-money="money"
                    validate-on-blur
                    required>
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-select
                    label="Tipo de gasto" 
                    :items="lstTipoGasto"
                    :rules="regras.idTipoGasto"
                    item-text="descricao" 
                    item-value="id" 
                    v-model="despesaModel.idTipoGasto">
                    <template slot="item" slot-scope="data">
                      <v-list-tile-avatar>
                        <v-icon>{{ classTipoGasto(data.item.id) }}</v-icon>
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="data.item.descricao"></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </v-select>
                </v-flex>
              </v-layout>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" flat @click.stop="modalDespesa = false">Cancelar</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" :disabled="!formDespesaValid" @click="adicionaDespesa">Adicionar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import {VMoney} from 'v-money'

export default {
  name: 'Dashboard',
  directives: {
    money: VMoney
  },
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
      this.carregaGastos(val);
    },
    despesaFormatada: function (val) {
      if (val && typeof val == 'string') {
        this.despesaModel.valor = this.formataDespesaModel(val);
      }
    }
  },
  data: () => {
    return {
      regras: {
        descricao: [v => !!v || 'Você não pode deixar este campo em branco'],
        valor: [v => v != 'R$ 0,00' || 'Você precisa informar um valor válida'],
        idTipoGasto: [v => !!v || parseInt(v) > 0 || 'Você não pode deixar este campo em branco']
      },
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
      ],
      formDespesaValid: false,
      modalDespesa: false,
      despesaFormatada: 0.0,
      despesaModel: {
        descricao: '',
        valor: 0.0,
        idTipoGasto: 0
      },
      money: {
          decimal: ',',
          thousands: '.',
          prefix: 'R$ ',
          precision: 2,
          masked: false /* doesn't work with directive */
      },
      lstTipoGasto: [
        {
          id: 1,
          descricao: 'Refeição'
        },
        {
          id: 2,
          descricao: 'Lazer'
        },
        {
          id: 3,
          descricao: 'Conta'
        },
        {
          id: 4,
          descricao: 'Mercado'
        },
        {
          id: 5,
          descricao: 'Outros'
        }
      ]
    }
  },
  methods: {
    formataDespesaModel: function (val) {
      return parseFloat(val.replace('R$ ', '').replace(/(\.)/g, '').replace(',', '.'));
    },
    formatMoney: function (valor) {
      return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' });
    },
    classTipoGasto: function (idTipoGasto) {
      switch (idTipoGasto) {
        case 1:
          return 'restaurant'
        case 2:
          return 'local_activity'
        case 3:
          return 'payment'
        case 4:
          return 'shopping_cart'
        default:
          return 'attach_money'
      }
    },
    carregaGastos: function (mes) {
      const self = this;

      let despesaStorage = JSON.parse(localStorage.getItem(`despesas-${self.usuariologado.email}-${mes}`));

      if (despesaStorage)
        self.meses[mes].despesas = despesaStorage;
    },
    limpaModalDespesa: function () {
      const self = this;
      self.$refs.valor.$el.getElementsByTagName('input')[0].value = 0;
      self.despesaModel = {
        descricao: '',
        valor: 0.0,
        idTipoGasto: 0
      };
    },
    abreModalDespesa: function() {
      const self = this;
      self.modalDespesa = true;
      self.limpaModalDespesa();
    },
    adicionaDespesa: function() {
      const self = this;

      self.meses[self.mesSelecionado].despesas.push(self.despesaModel);
      localStorage.setItem(`despesas-${self.usuariologado.email}-${self.mesSelecionado}`, JSON.stringify(self.meses[self.mesSelecionado].despesas));
      
      self.modalDespesa = false;
    }
  }
}
</script>
