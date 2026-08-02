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
}
export default AuthService;