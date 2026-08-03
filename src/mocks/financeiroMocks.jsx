const DADOS_FINANCEIROS = {
  resumo: {
    saldo: 5000,
    receitas: 2000,
    despesas: 1800,
  },
  graficoMensal: [
    { mes: "Abr", receita: 3000, despesa: 2000 },
    { mes: "Mai", receita: 3200, despesa: 2500 },
    { mes: "Jun", receita: 2800, despesa: 3000 },
    { mes: "Jul", receita: 3500, despesa: 2700 },
  ],

  lancamentos: [
    {
      id: 1,
      descricao: "Salário",
      valor: 3000,
      tipo: "RECEITA",
      data: "05/08/2026",
    },
    {
      id: 2,
      descricao: "Aluguel",
      valor: 1200,
      tipo: "DESPESA",
      data: "01/08/2026",
    },
    {
      id: 3,
      descricao: "Supermercado",
      valor: 400,
      tipo: "DESPESA",
      data: "12/08/2026",
    },
    {
      id: 4,
      descricao: "Freelance",
      valor: 500,
      tipo: "RECEITA",
      data: "08/08/2026",
    },
    {
      id: 5,
      descricao: "Transporte",
      valor: 100,
      tipo: "DESPESA",
      data: "04/08/2026",
    },
  ],
};

export function buscarDadosFinanceiros() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(DADOS_FINANCEIROS);
    }, 1000);
  });
}
