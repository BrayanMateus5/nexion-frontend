import { useState } from "react";
import { Link } from "react-router-dom";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { calcularForcaSenha } from "../../utils/forcaSenha";
import AuthService from "../../services/AuthService";
import logo from "../../assets/nexion-logo.png";
import "../../styles/Auth.css";

const authService = new AuthService();

const UpdatePassword = () => {
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState({});
  const [sucesso, setSucesso] = useState("");
  const [loading, setLoading] = useState(false);

  const forca = calcularForcaSenha(novaSenha);

  const validar = () => {
    const novosErros = {};

    if (!senhaAtual) novosErros.senhaAtual = "A senha atual é obrigatória..";

    if (!novaSenha) {
      novosErros.novaSenha = "A nova senha é obrigatória..";
    } else if (novaSenha.length < 6) {
      novosErros.novaSenha = "A senha deve ter no mínimo 6 caracteres..";
    }
    if (confirmarSenha !== novaSenha) {
      novosErros.confirmarSenha = "As senhas não são iguais..";
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
    setSucesso("");
    setLoading(true);

    try {
      const resposta = await authService.alterarSenha(senhaAtual, novaSenha);
      setSucesso(resposta.data.message);
      setSenhaAtual("");
      setNovaSenha("");
      setConfirmarSenha("");
    } catch (error) {
      setErro({ senhaAtual: error.message });
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
          <h2>Alterar Senha</h2>

          {sucesso && <p className="mensagem-neutra">{sucesso}</p>}

          <div className="p-inputs">
            <label htmlFor="senhaAtual">Senha atual</label>
            <Password
              id="senhaAtual"
              placeholder="Digite sua senha atual"
              feedback={false}
              toggleMask
              value={senhaAtual}
              onChange={(e) => setSenhaAtual(e.target.value)}
            />
            {erro.senhaAtual && (
              <small className="error-message">{erro.senhaAtual}</small>
            )}
          </div>

          <div className="p-inputs">
            <label htmlFor="novaSenha">Nova Senha</label>
            <Password
              id="novaSenha"
              placeholder="Digite a sua nova senha"
              feedback={false}
              toggleMask
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
            />
            {forca && (
              <small className={`forca-senha forca-${forca}`}>
                Senha:{forca}
              </small>
            )}
            {erro.novaSenha && (
              <small className="error-message">{erro.novaSenha}</small>
            )}
          </div>

          <div className="p-inputs">
            <label htmlFor="confirmarSenha">Confirmar sua nova senha</label>
            <Password
              id="confirmarSenha"
              placeholder="Repita a nova senha"
              feedback={false}
              toggleMask
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
            {erro.confirmarSenha && (
              <small className="error-message">{erro.confirmarSenha}</small>
            )}
          </div>

          <Button
            label={loading ? "Salvando..." : "Alterar senha"}
            className="nexion-btn"
            type="submit"
            disabled={loading}
          />

          <p className="auth-link">
            <Link to="/dashboard">Voltar ao dashboard</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
