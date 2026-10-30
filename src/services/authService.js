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
    return this.api.post("/auth/register", {
      name: nome,
      email,
      password: senha,
    });
  }
  /*Para o envio do email de recuperação de senha, é necessário apenas o email do usuário, que será enviado para a api, que por sua vez enviará o email com o token para o usuário*/
  async emailForgotPassword(email) {
    return this.api.post("/auth/forgot-password", { email });
  }

  /*Para a redefinição da senha, é necessário o token enviado para o email do usuário e a nova senha que ele deseja definir, que será enviada para a api, que por sua vez atualizará a senha do usuário no banco de dados*/
  async resetPassword(token, novaSenha) {
    return this.api.post("/auth/reset-password", {
      token,
      newPassword: novaSenha,
    });
  }

  async alterarSenha(senhaAtual, novaSenha) {
    return this.api.patch("/api/v1/users/me/password", {
      currentPassword: senhaAtual,
      newPassword: novaSenha,
    });
  }
}
export default AuthService;
