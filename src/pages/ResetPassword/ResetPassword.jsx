import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { calcularForcaSenha } from "../../utils/forcaSenha";
import AuthService from "../../services/authService";
import logo from "../../assets/nexion-logo.png";
import "../../styles/Auth.css";

const authService = new AuthService();

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState({});
  const [erroGeral, setErroGeral] = useState("");
  const [loading, setLoading] = useState(false);

  const forca = calcularForcaSenha(novaSenha);

  const validar = () => {
    const novosErros = {};

    if (!novaSenha) {
      novosErros.novaSenha = "A senha é obrigatória";
    } else if (novaSenha.length < 6) {
      novosErros.novaSenha = "A senha deve ter pelo menos 6 caracteres.";
    }

    if (confirmarSenha !== novaSenha) {
      novosErros.confirmarSenha = "As senhas não são iguais";
    }

    return novosErros;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const novosErros = validar();
    if (Object.keys(novosErros).length > 0) {
      setErro(novosErros);
      return;
    }

    setErro({});
    setErroGeral("");
    setLoading(true);

    try {
      await authService.resetPassword(token, novaSenha); //envia o token e a nova senha//
      navigate("/login");
    } catch (erro) {
      setErroGeral(erro.message);
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
        <form className="auth-form-card" onSubmit={handleSubmit}>
          <h2>Redefinir senha</h2>

          {erroGeral && <p className="erro-geral">{erroGeral}</p>}

          <div className="p-inputs">
            <label htmlFor="novaSenha">Nova senha</label>
            <Password
              id="novaSenha"
              placeholder="Digite a nova senha"
              feedback={false}
              toggleMask
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
            />
            {forca && (
              <small className={`forca-senha forca-${forca}`}>
                Senha: {forca}
              </small>
            )}
            {erro.novaSenha && (
              <small className="erro-message">{erro.novaSenha}</small>
            )}
          </div>

          <div className="p-inputs">
            <label htmlFor="confirmarSenha">Confirmar a nova senha</label>
            <Password
              id="confirmarSenha"
              placeholder="Repita a nova senha"
              feedback={false}
              toggleMask
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
            {erro.confirmarSenha && (
              <small className="erro-message">{erro.confirmarSenha}</small>
            )}
          </div>

          <Button
            label={loading ? "Salvando..." : "Redefinir senha"}
            className="nexion-btn"
            type="submit"
            disabled={loading}
          />

          <p className="auth-link">
            <Link to="/login">Voltar ao login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default ResetPassword;
