import { useState, useEffect } from "react";
import { buscarDadosFinanceiros } from "../../mocks/financeiroMocks";
import { formatarMoeda } from "../../utils/formatarMoeda";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Dashboard.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const DADOS_FINANCEIROS_VAZIOS = {
  resumo: {
    saldo: 0,
    receitas: 0,
    despesas: 0,
  },
  graficoMensal: [],
  lancamentos: [],
};

const Dashboard = () => {
  //função para leitura e salvar o login do usuário no localStorage
  const usuarioLogado = JSON.parse(localStorage.getItem("nexion_user"));
  const [dados, setDados] = useState(DADOS_FINANCEIROS_VAZIOS);
  const [loading, setLoading] = useState(true); /*depois inicia o carregamento*/

  useEffect(() => {
    buscarDadosFinanceiros().then((resposta) => {
      setDados(resposta ?? DADOS_FINANCEIROS_VAZIOS);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "2rem", color: "#ffffff" }}>
        <h2>Carregando dados financeiros...</h2>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-content">
        <h1>Bem vindo, {usuarioLogado?.nome} !!</h1>
        <div className="dashboard">
          <div className="resumo-financeiro">
            <div className="card">
              <p>Saldo</p>
              <strong>{formatarMoeda(dados.resumo?.saldo ?? 0)}</strong>
            </div>
            <div className="card">
              <p>Receitas</p>
              <strong className="valor-receita">
                {formatarMoeda(dados.resumo?.receitas ?? 0)}
              </strong>
            </div>
            <div className="card">
              <p>Despesas</p>
              <strong className="valor-despesa">
                {formatarMoeda(dados.resumo?.despesas ?? 0)}
              </strong>
            </div>
          </div>

          <div className="grafico-mensal">
            <h2>Receitas X Despesas (últimos meses)</h2>
            <ResponsiveContainer width="100%" height={300}>
              {/*responsividade*/}
              <BarChart data={dados.graficoMensal ?? []}>
                {/*dados do gráfico*/}
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                {/*linhas do gráfico*/}
                <XAxis dataKey="mes" stroke="#a0a0a0" /> {/*eixo x do gráfico*/}
                <YAxis stroke="#a0a0a0" /> {/*eixo y do gráfico*/}
                <Tooltip /> {/*tooltip do gráfico*/}
                <Legend /> {/*legenda do gráfico*/}
                <Bar dataKey="receita" fill="#4ade80" name="Receitas" />
                {/*barra de receitas do gráfico*/}
                <Bar dataKey="despesa" fill="#f87171" name="Despesas" />
                {/*barra de despesas do gráfico*/}
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/*parte de lançamentos*/}
          <h2>Lançamentos recentes</h2>
          <ul className="lancamentos-list">
            {(dados.lancamentos ?? []).map((lancamento) => (
              <li
                key={lancamento.id}
                className={
                  lancamento.tipo === "RECEITA"
                    ? "lancamento receita"
                    : "lancamento despesa"
                }
              >
                <span>{lancamento.descricao}</span>
                <span>{formatarMoeda(lancamento.valor)}</span>
                <span>{lancamento.data}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
