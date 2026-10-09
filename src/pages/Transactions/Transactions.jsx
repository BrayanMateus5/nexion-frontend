import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import api from "../../configs/axiosConfig";
import Sidebar from "../../components/Sidebar/Sidebar";
import { formatarMoeda } from "../../utils/formatarMoeda";
import "../Dashboard/Dashboard.css";
import "./Transactions.css";

const TIPOS = [
  { label: "Receita", value: "INCOME" },
  { label: "Despesa", value: "EXPENSE" },
];

const Transacoes = () => {
  const [walletId, setWalletId] = useState(null);
  const [transacoes, setTransacoes] = useState([]);
  const [tipo, setTipo] = useState("EXPENSE");
  const [valor, setValor] = useState(null);
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [erroGeral, setErroGeral] = useState("");
  const [error, setError] = useState({});

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
        setErroGeral("Erro ao carregar a carteira");
      }
    }
    init();
  }, []);

  async function carregar(id) {
    const resp = await api.get(`/api/v1/wallets/${id}/transactions`);
    setTransacoes(resp.data);
  }

  const validar = () => {
    const novosErros = {};
    
    if(!valor) {
      novosErros.valor = "O valor é obrigatório.";
    }else if (valor <= 0) {
      novosErros.valor = "O valor deve ser maior do que zero.";
    }
// esse .trim é pra remover os espaços no início e no fim das palavras..
    if(!descricao.trim()) {
      novosErros.descricao = "A descrição é obrigatória.";
    }
    if (!data) {
      novosErros.data = "A data é obrigatória.";
    }else if (data > new Date()) {    //se a data escolhida for maior que a atual
      novosErros.data = "Não pode ser uma data futura.";
    }

    return novosErros;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const novosErros = validar();
    if(Object.keys(novosErros).length > 0) {       //pergunta se achou algum erro
      setError(novosErros);
      return;
    }
    setError({});
    setLoading(true);
    try {
      await api.post(`/api/v1/wallets/${walletId}/transactions`, {
        type: tipo,
        amount: valor,
        description: descricao,
        date: data.toISOString().split("T")[0],
      });
      setValor(null);
      setDescricao("");
      carregar(walletId);
    } catch (err) {
      setErroGeral(err.response?.data?.message || "Erro ao criar transação");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-content">
        <h1>Transações</h1>
        {erroGeral && <p className="error-geral">{erroGeral}</p>}

        <form onSubmit={handleSubmit} className="transacao-form">
          
          <div className="transacao-form-grid">

          <div className="p-inputs">
            <label htmlFor="tipo">Tipo</label>
            <Dropdown
              id="tipo"
              value={tipo}
              options={TIPOS}
              onChange={(e) => setTipo(e.value)}
            />
          </div>

          <div className="p-inputs">
            <label htmlFor="valor">Valor</label>
            <InputNumber
              id="valor"
              value={valor}
              onValueChange={(e) => setValor(e.value)}
              mode="currency"
              currency="BRL"
              locale="pt-BR"
            />
            {error.valor && <span className="error-message">{error.valor}</span>}

          </div>

          <div className="p-inputs">
            <label htmlFor="descricao">Descrição</label>
            <InputText
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
            {error.descricao && <span className="error-message">{error.descricao}</span>}

          </div>

          <div className="p-inputs">
            <label htmlFor="data">Data</label>
            <Calendar
              id="data"
              value={data}
              onChange={(e) => setData(e.value)}
              dateFormat="dd/mm/yy"
            />
            {error.data && <span className="error-message">{error.data}</span>}

          </div>
          </div>
          
            <Button
            label={loading ? "Salvando..." : "Adicionar"}
            type="submit"
            className="nexion-btn"
            disabled={loading}
          />
          </form>

        <h2>Lançamentos</h2>

        {transacoes.length === 0 ? (
        <p className="lista-vazia">
          Nenhuma transação ainda. Corra e adicione a sua primeira !!
        </p>  
        ) : ( 

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
        )}
        
      </div>
    </div>
  );
};

export default Transacoes;
