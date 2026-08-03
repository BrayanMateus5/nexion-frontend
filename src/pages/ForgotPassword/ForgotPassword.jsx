import { useState } from "react";
import { Link } from "react-router-dom";
import { inputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import logo from "../../assets/logo.png";
import "../../styles/Auth.css";
import AuthService from "../../services/authService";

const authService = new AuthService();

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setErro("Por favor, insira um email válido.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErro("O email não é válido.");
      return;
    }
    setErro("");
    setLoading(true);
    try {
      const response = await authService.emailForgotPassword(email);
      setMessage(response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-brand">
        <img src={logo} alt="Logo da Nexion" className="logo-image" />
        <h1 className="brand-logo-name">Nexion</h1>
      </div>
      <div className="form-right-section">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Recuperar senha</h2>

          {mensagem /*Aqui no caso,  */ ? (
            <p className="mensagem-neutra">{mensagem}</p>
          ) : (
            <>
              <div className="p-inputs">
                <label htmlFor="email">Email</label>
                <inputText
                  id="email"
                  placeholder="Digite seu email de cadastro"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {erro && <small className="erro-message">{erro}</small>}
              </div>

              <Button
                label={loading ? "Enviando..." : "Enviar instruções"}
                className="nexion-btn"
                type="submit"
                disabled={loading}
              />
            </>
          )}
          <p className="auth-link">
            Se lemboru da senha ? <Link to="/login">Voltar ao Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default ForgotPassword;
