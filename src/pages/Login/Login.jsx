import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Link } from "react-router-dom";
import logo from "../../assets/nexion-logo.png";
import "./Login.css";
import "../../styles/Auth.css";

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
  const handleLogin = async () => {
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
      localStorage.setItem("nexion_user", JSON.stringify(response.data.user));

      navigate("/dashboard");
    } catch (erro) {
      setErroGeral(erro.message);
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
        <div className="auth-form-card">
          <h2>Entrar</h2>

          <div className="p-inputs">
            <label htmlFor="email">Email</label>
            <InputText
              id="email"
              type="text"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            />
            {error.password && (
              <small className="error-message">{error.password}</small>
            )}
            {erroGeral && <p className="error-geral">{erroGeral}</p>}
          </div>

          <Button
            label={loading ? "Entrando..." : "Entrar"}
            className="nexion-btn"
            onClick={handleLogin}
            disabled={loading}
          />

          <p className="auth-link">
            Não possui conta ? <Link to="/register">Cadastre-se</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
