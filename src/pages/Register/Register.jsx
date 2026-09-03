import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/nexion-logo.png";
import AuthService from "../../services/AuthService";
import "../../styles/Auth.css";
import { calcularForcaSenha } from "../../utils/forcaSenha";

const authService = new AuthService();

const Register = () => {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [error, setError] = useState({});
  const [erroGeral, setErroGeral] = useState("");
  const [loading, setLoading] = useState(false);

  const forca = calcularForcaSenha(senha);

  const validar = () => {
    const novosErros = {};

    if (!nome) novosErros.nome = "O nome é obrigatório.";

    if (!email) {
      novosErros.email = "O email é obrigatório.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      novosErros.email = "O email é inválido.";
    }
    if (!senha) {
      novosErros.senha = "A senha é obrigatória.";
    } else if (senha.length < 6) {
      novosErros.senha = "A senha deve ter pelo menos 6 caracteres.";
    }

    if (confirmarSenha !== senha) {
      novosErros.confirmarSenha = "As senhas não coincidem.";
    }
    return novosErros;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const novoErros = validar();
    if (Object.keys(novoErros).length > 0) {
      setError(novoErros);
      return;
    }
    setError({});
    setErroGeral("");
    setLoading(true);

    try {
      await authService.register(nome, email, senha);
      navigate("/login");
    } catch (erro) {
      setErroGeral(
        erro.response?.data?.message || "Erro ao processar a solicitação",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="auth-page">
      {/*Memo lado esquerdo do login*/}
      <div className="auth-brand">
        <img src={logo} alt="Logo da Nexion" className="logo-image" />
        <h1 className="brand-logo-name">Nexion</h1>
      </div>

      {/*aqui é o lado direito com o novo form*/}
      <div className="form-right-section">
        <form className="auth-form-card" onSubmit={handleRegister}>
          <h2>Criar conta</h2>

          {erroGeral && <p className="error-geral">{erroGeral}</p>}

          <div className="p-inputs">
            <label htmlFor="nome">Nome</label>
            <InputText
              id="nome"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            {error.nome && (
              <small className="error-message">{error.nome}</small>
            )}
          </div>

          <div className="p-inputs">
            <label htmlFor="email">Email</label>
            <InputText
              id="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error.email && (
              <small className="error-message">{error.email}</small>
            )}
          </div>

          <div className="p-inputs">
            <label htmlFor="senha">Senha</label>
            <Password
              id="senha"
              placeholder="Crie uma senha"
              feedback={false}
              toggleMask
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            {forca && (
              <small className={`forca-senha forca-${forca}`}>
                Senha: {forca}
              </small>
            )}
            {error.senha && (
              <small className="error-message">{error.senha}</small>
            )}
          </div>

          <div className="p-inputs">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <Password
              id="confirmarSenha"
              placeholder="Repita a senha"
              feedback={false}
              toggleMask
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
            {error.confirmarSenha && (
              <small className="error-message">{error.confirmarSenha}</small>
            )}
          </div>

          <Button
            label={loading ? "Criando..." : "Cadastrar"}
            className="nexion-btn"
            type="submit"
            disabled={loading}
          />

          <p className="auth-link">
            Já possui conta ? <Link to="/login">Entrar</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Register;
