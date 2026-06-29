import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Link } from "react-router-dom";
import logo from "../../assets/nexion-logo.png";
import "../../styles/Auth.css";

const Register = () => {
  return (
    <div className="auth-page">
      {/*Memo lado esquerdo do login*/}
      <div className="auth-brand">
        <img src={logo} alt="Logo da Nexion" className="logo-image" />
        <h1 className="brand-logo-name">Nexion</h1>
      </div>

      {/*aqui é o lado direito com o novo form*/}
      <div className="form-right-section">
        <form className="auth-form-card">
          <h2>Criar conta</h2>

          <div className="p-inputs">
            <label htmlFor="nome">Nome</label>
            <InputText id="nome" type="text" placeholder="Digite seu nome" />
          </div>

          <div className="p-inputs">
            <label htmlFor="email">Email</label>
            <InputText id="email" type="text" placeholder="Digite seu email" />
          </div>

          <div className="p-inputs">
            <label htmlFor="senha">Senha</label>
            <Password
              id="senha"
              placeholder="Crie uma senha"
              feedback={false}
              toggleMask
            />
          </div>

          <div className="p-inputs">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <Password
              id="confirmarSenha"
              placeholder="Repita a senha"
              feedback={false}
              toggleMask
            />
          </div>

          <Button label="Cadastrar" className="nexion-btn" />

          <p className="auth-link">
            Já possui conta ? <Link to="/login">Entrar</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Register;
