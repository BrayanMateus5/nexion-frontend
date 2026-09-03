import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/nexion-logo.png";
import "../../styles/Auth.css";
import "./Login.css";

const AuthServiceInstance = new AuthService();

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [erroGeral, setErroGeral] = useState("");
  const [loading, setLoading] = useState(false);

  const validar = () => {
    const novosErros = {};
    if (!email) {
      novosErros.email = "O campo de email é obrigatório.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      novosErros.email = "O email fornecido não é válido.";
    }

    if (!password) {
      novosErros.password = "O campo de senha é obrigatório.";
    } else if (password.length < 6) {
      novosErros.password = "A senha deve ter pelo menos 6 caracteres.";
    }

    return novosErros;
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    const novosErros = validar();
    if (Object.keys(novosErros).length > 0) {
      setError(novosErros);
      return;
    }

    setError({});
    setErroGeral("");
    setLoading(true);

    try {
      const response = await AuthServiceInstance.login(email, password);

      localStorage.setItem("nexion_token", response.data.accessToken);

      const u = response.data.user;
      localStorage.setItem(
        "nexion_user",
        JSON.stringify({ ...u, nome: u.name }),
      );

      navigate("/dashboard");
    } catch (erro) {
      setErroGeral(erro.response?.data?.message || "Erro ao processar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/*Lado da marca */}
      <div className="auth-brand">
        <img src={logo} alt="Logo da Nexion" className="logo-image" />
        <h1 className="brand-logo-name">Nexion</h1>
      </div>

      {/*Lado do formulário */}
      <div className="form-right-section">
        <form className="auth-form-card" onSubmit={handleLogin}>
          <h2>Entrar</h2>

          <div className="p-inputs">
            <label htmlFor="email">Email</label>
            <InputText
              id="email"
              type="text"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
            {error.email && (
              <span className="error-message">{error.email}</span>
            )}
          </div>

          <div className="p-inputs">
            <label htmlFor="password">Senha</label>
            <Password
              id="password"
              placeholder="Digite sua senha"
              feedback={false}
              toggleMask
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
            {error.password && (
              <small className="error-message">{error.password}</small>
            )}
            {erroGeral && <p className="error-geral">{erroGeral}</p>}
          </div>

          <Button
            label={loading ? "Entrando..." : "Entrar"}
            className="nexion-btn"
            type="submit"
            disabled={loading}
          />

          <p className="auth-link">
            Não possui conta ? <Link to="/register">Cadastre-se</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
