import BaseService from "./BaseService";

class AuthService extends BaseService {
    constructor() {
        super("/auth");
    }
    //iissaqui é uma requisição falsa, só pra testar
    async login(email, password) {
    return this.api.post("/auth/login", { email, password });
  }

  async register(nome, email, senha) {
    return this.api.post("/auth/register", { name: nome, email, password: senha });

    }
    /*aqui sempre será aceita a solicitação da recuperação da senha*/
    async emailForgotPassword(email) {
        return new Promise((aceita) => {
            setTimeout(() => {
                aceita({ data: { message: "Se o email citado, estiver cadastrado, você receberá as instruções...",    
                },
            });
            }, 1500);
        });
}
/*aqui, primeiro valida se tem token, mesmo que seja vazio, se tiver, aceita a solicitação de alteração da senha*/
async resetPassword(token, novaSenha) {
    return new Promise((aceita, rejeita) => {
        setTimeout(() => {
            if (!token) {
                rejeita(new Error("Token inválido"));
            } else {
                aceita({ data: { message: "Senha alterada com sucesso" } });
            }
        }, 1500);
    });
}

async alterarSenha(senhaAtual, novaSenha) {
    return this.api.patch("/api/v1/users/me/password", { currentPassword: senhaAtual, newPassword: novaSenha });
    }
}
export default AuthService;