import BaseService from "./BaseService";

class AuthService extends BaseService {
    constructor() {
        super("/auth");
    }
    //iissaqui é uma requisição falsa, só pra testar
    async login(email, senha) {
        return new Promise((aceita, rejeita) => {
            setTimeout(() => {  

            if (email === "brayan@nexion.com" && senha === "123456") {

                aceita({ 
                    data:{ accessToken: "Nexion-false-1234", 
                        user: {id: 1, nome: "Brayan Mateus", email},
                },
            });
            }else {
                rejeita(new Error ("Email ou senha inválidos"));
            }
        }, 1500);
    });
    }
    async register(nome, email, senha) {
        return new Promise((aceita, rejeita) => {
            setTimeout(() => {
                if (email === "brayan@nexion.com") {
                    rejeita(new Error("Email já cadastrado"));
                } else {
                    aceita({ data: { message: "Usuário cadastrado com sucesso" } });
                }
}, 1500);
        });
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
}
export default AuthService;