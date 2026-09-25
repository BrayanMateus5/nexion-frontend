import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import api from "../../configs/axiosConfig";
import Sidebar from "../../components/Sidebar/Sidebar";
import "../Dashboard/Dashboard.css";
import { formatarMoeda } from "../../utils/formatarMoeda";

const Transacoes = () => {
  const [walletId, setWalletId] = useState(null);
  const [transacoes, setTransacoes] = useState([]);
  const [tipo, setTipo] = useState("EXPENSE");
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState(new Date().toISOString().split("T")[0]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function init() {
      try {
        const resp = await api.get("/api/v1/wallets");
        let wallets = resp.data;
        if (wallets.length === 0) {
          const nova = await api.post("/api/v1/wallets", {
            name: "Minha Carteira",
          });
          wallets = [nova.data];
        }
        setWalletId(wallets[0].id);
        carregar(wallets[0].id);
      } catch {
        setErro("Erro ao carregar a carteira");
      }
    }
    init();
  }, []);

  async function carregar(id) {
    const resp = await api.get(`/api/v1/wallets/${id}/transactions`);
    setTransacoes(resp.data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setLoading(true);
    try {
      await api.post(`/api/v1/wallets/${walletId}/transactions`, {
        type: tipo,
        amount: parseFloat(valor),
        description: descricao,
        date: data,
      });
      setValor("");
      setDescricao("");
      carregar(walletId);
    } catch (err) {
      setErro(err.response?.data?.message || "Erro ao criar transação");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-content">
        <h1>Transações</h1>
        {erro && <p className="error-geral">{erro}</p>}

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            gap: "0.75rem",
            flexWrap: "wrap",
            margin: "1.5rem 0",
          }}
        >
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            style={{ padding: "0.6rem", borderRadius: "8px" }}
          >
            <option value="INCOME">Receita</option>
            <option value="EXPENSE">Despesa</option>
          </select>
          <input
            type="number"
            step="0.01"
            placeholder="Valor"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required
            style={{ padding: "0.6rem", borderRadius: "8px" }}
          />
          <input
            type="text"
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            style={{ padding: "0.6rem", borderRadius: "8px" }}
          />
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            style={{ padding: "0.6rem", borderRadius: "8px" }}
          />
          <Button
            label={loading ? "Salvando..." : "Adicionar"}
            type="submit"
            className="nexion-btn"
            disabled={loading}
          />
        </form>

        <h2>Lançamentos</h2>
        <ul className="lancamentos-list">
          {transacoes.map((t) => (
            <li
              key={t.id}
              className={
                t.type === "INCOME"
                  ? "lancamento receita"
                  : "lancamento despesa"
              }
            >
              <span>{t.description}</span>
              <span>{formatarMoeda(t.amount)}</span>
              <span>{t.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Transacoes;
