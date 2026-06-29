import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Link } from "react-router-dom";
import logo from "../../assets/nexion-logo.png";
import "./Login.css";
import "../../styles/Auth.css";

const Login = () => {
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
            <InputText id="email" type="text" placeholder="Digite seu email" />
          </div>

          <div className="p-inputs">
            <label htmlFor="password">Senha</label>
            <Password
              id="password"
              placeholder="Digite sua senha"
              feedback={false}
              toggleMask
            />
          </div>

          <Button label="Entrar" className="nexion-btn" />

          <p className="auth-link">
            Não possui conta ? <Link to="/register">Cadastre-se</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
