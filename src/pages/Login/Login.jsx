import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import logo from '../../assets/nexion-logo.png';
import './Login.css';


export default function Login() {
    return (
        <div className="login-back-form">

            {/*Lado da marca */}
            <div className="brand-left-section">
                <img src={logo} alt="Logo da Nexion" className="logo-image" />
                <h1 className="brand-logo-name">Nexion</h1>
            </div>

            {/*Lado do formulário */}
            <div className="form-right-section">
                <div className="p-interna-form">
                    <h2>Entrar</h2>

                    <div className="p-inputs">
                        <label htmlFor="email">Email</label>
                        <InputText id="email" type="text" placeholder="Digite seu email" />
                    </div>

                    <div className="p-inputs">
                        <label htmlFor="password">Senha</label>
                        <Password id="password" placeholder="Digite sua senha" feedback={false} toggleMask />
                    </div>

                    <Button label="Entrar" className="nexion-btn" />

                </div>
            </div>
        </div>
    );
}