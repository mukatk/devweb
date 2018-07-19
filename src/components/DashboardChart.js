import { Doughnut } from 'vue-chartjs'

export default {
    extends: Doughnut,
    data: () => {
        return {
            data: [],
            dadosAgrupados: [],
            labelsUp: [],
            lstTipoGasto: [
                {
                  id: 'REFEICAO',
                  descricao: 'Refeição'
                },
                {
                  id: 'LAZER',
                  descricao: 'Lazer'
                },
                {
                  id: 'CONTA',
                  descricao: 'Conta'
                },
                {
                  id: 'MERCADO',
                  descricao: 'Mercado'
                },
                {
                  id: 'OUTROS',
                  descricao: 'Outros'
                }
              ]
        }
    },
    watch: {
        data: function () {
            this.renderizaGrafico();
        }
    },
    mounted: function () {
        this.renderizaGrafico();
    },
    methods: {
        renderizaGrafico: function () {
            const self = this;
            self.montaDadosGrafico();

            if (self.$data._chart) {
                self.$data._chart.destroy();
            }

            self.renderChart({
                labels: self.labelsUp,
                datasets: [
                    {
                    label: 'Gasto mensal',
                    data: self.dadosAgrupados,
                    backgroundColor: [
                        "#1976D2",
                        "#FF5722",
                        "#757575",
                        "#388E3C",
                        "#FFC107"
                    ]
                    }
                ]
            })
        },
        montaDadosGrafico: function () {
            const self = this;

            var result = [];
            self.data.reduce(function (res, value) {
                if (!res[value.idTipoGasto]) {
                    res[value.idTipoGasto] = {
                        valor: 0,
                        idTipoGasto: value.idTipoGasto
                    };
                    result.push(res[value.idTipoGasto])
                }
                res[value.idTipoGasto].valor += value.valor
                return res;
            }, {});

            var sortResult = result.sort((a, b) => { return a.idTipoGasto > b.idTipoGasto; });
            self.labelsUp = result.map((despesa) => { return self.lstTipoGasto.filter((f) => { return f.id == despesa.idTipoGasto})[0].descricao });
            self.dadosAgrupados = sortResult.map((despesa) => { return despesa.valor });
        }
    }
}