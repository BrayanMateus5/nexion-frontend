import { useState } from "react";
import { Link } from "react-router-dom";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { calcularForcaSenha } from "../../utils/forcaSenha";
import AuthService from "../../services/authService";
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
      senhaAtual("");
      setNovaSenha("");
      setConfirmarSenha("");
    } catch (erro) {
      setErro({ senhaAtual: erro.message });
    } finally {
      setLoading(false);
    }
  };
};
