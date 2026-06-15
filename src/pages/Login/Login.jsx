import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import './Login.css';


export default function Login() {
    return (
        <div className="login-container">
            <h1>Entrar no Nexion</h1>

            <div className="p-fluid">
                <div className="p-field">
                    <label htmlFor="email">E-mail</label>
                    <InputText id="email" placeholder="Digite seu e-mail" />
                </div>

                <div className="p-field">
                    <label htmlFor="password">Senha</label>
                    <Password id="password" placeholder="Digite sua senha" feedback={false} />  {/*desativar a dica de senha*/}
                </div>

                <Button label="Acessar sistema" className="p-mt-2" />
            </div>
        </div>
    );
}