import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import logo from '../../assets/nexion-logo.png';
import './Login.css';


export default function Login() {
    return (
        <div className="login-layout-container">

            {/*Lado da marca */}
            <div className="brand-section">
                <img src={logo} alt="Logo da Nexion" className="logo-image" />
                <h1 className="brand-name">Nexion</h1>
            </div>

            {/*Lado do formulário */}
            <div className="form-section">
                <div className="p-fluid">
                    <h2>Entrar no Nexion</h2>

                    <div className="p-field">
                        <label htmlFor="email">Email</label>
                        <InputText id="email" type="text" placeholder="Digite seu email" />
                    </div>

                    <div className="p-field">
                        <label htmlFor="password">Senha</label>
                        <Password id="password" placeholder="Digite sua senha" feedback={false} toggleMask />
                    </div>

                    <Button label="Entrar" className="nexion-btn" />

                </div>
            </div>
        </div>
    );
}