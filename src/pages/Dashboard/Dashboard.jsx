import { useState, useEffect } from "react";
import api from "../../configs/axiosConfig";
import { formatarMoeda } from "../../utils/formatarMoeda";
import { formatarData } from "../../utils/formatarData";
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

const Dashboard = () => {
  //função para leitura e salvar o login do usuário no localStorage
  const usuarioLogado = JSON.parse(localStorage.getItem("nexion_user"));

  const [resumo, setResumo] = useState(null);
  const [grafico, setGrafico] = useState([]);
  const [lancamentos, setLancamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [walletId, setWalletId] = useState(null);
  const [insight, setInsight] = useState([]);
  const [carregandoInsight, setCarregandoInsight] = useState(false);

  useEffect(() => {
    async function carregar() {
      try {
        const w = await api.get("/api/v1/wallets");
        if (w.data.length === 0) {
          setLoading(false);
          return;
        }
        const id = w.data[0].id;
        setWalletId(id);

        const [s, m, t] = await Promise.all([
          api.get(`/api/v1/wallets/${id}/summary`),
          api.get(`/api/v1/wallets/${id}/reports/monthly`),
          api.get(`/api/v1/wallets/${id}/transactions`),
        ]);

        setResumo(s.data);
        setGrafico(m.data);
        setLancamentos(t.data);
      } catch {
        setErro("Erro ao carregar dados financeiros.");
      } finally {
        setLoading(false);
      }
    }
    carregar();
  }, []);
  useEffect(() => {
    if (!walletId) return;

    setCarregandoInsight(true);
    api
      .get(`/api/v1/wallets/${walletId}/insights`)
      .then((r) => setInsight(r.data.observacoes))
      .catch(() => setInsight(["Não foi possível carregar a análise.."]))
      .finally(() => setCarregandoInsight(false));
  }, [walletId]);

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
        {erro && <p className="error-geral">{erro}</p>}
        <div className="dashboard">
          <div className="resumo-financeiro">
            <div className="card">
              <p>Saldo</p>
              <strong>{formatarMoeda(resumo?.balance ?? 0)}</strong>
            </div>
            <div className="card">
              <p>Receitas</p>
              <strong className="valor-receita">
                {formatarMoeda(resumo?.totalIncome ?? 0)}
              </strong>
            </div>
            <div className="card">
              <p>Despesas</p>
              <strong className="valor-despesa">
                {formatarMoeda(resumo?.totalExpense ?? 0)}
              </strong>
            </div>
          </div>
          <div className="insight-card">
            <h2>Análise inteligente</h2>
            {carregandoInsight ? (
              <p className="insight-loading">Analisando seus gastos...</p>
            ) : (
              <div className="insight-grid">
                {insight.map((obs, i) => (
                  <div className="insight-item" key={i}>
                    <span className="insight-numero">{i + 1}</span>
                    <p>{obs}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grafico-mensal">
            <h2>Receitas X Despesas (últimos meses)</h2>
            <ResponsiveContainer width="100%" height={300}>
              {/*responsividade*/}
              <BarChart data={grafico}>
                {/*dados do gráfico*/}
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                {/*linhas do gráfico*/}
                <XAxis dataKey="month" stroke="#a0a0a0" />{" "}
                {/*eixo x do gráfico*/}
                <YAxis stroke="#a0a0a0" /> {/*eixo y do gráfico*/}
                <Tooltip /> {/*tooltip do gráfico*/}
                <Legend /> {/*legenda do gráfico*/}
                <Bar
                  dataKey="income"
                  fill="#4ade80"
                  name="Receitas"
                  maxBarSize={60}
                />
                {/*barra de receitas do gráfico*/}
                <Bar
                  dataKey="expense"
                  fill="#f87171"
                  name="Despesas"
                  maxBarSize={60}
                />
                {/*barra de despesas do gráfico*/}
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/*parte de lançamentos*/}
          <h2>Lançamentos recentes</h2>
          <ul className="lancamentos-list">
            {lancamentos.map((lancamento) => (
              <li
                key={lancamento.id}
                className={
                  lancamento.type === "INCOME"
                    ? "lancamento receita"
                    : "lancamento despesa"
                }
              >
                <span>{lancamento.description}</span>
                <span>{formatarData(lancamento.date)}</span>
                <span>{formatarMoeda(lancamento.amount)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
