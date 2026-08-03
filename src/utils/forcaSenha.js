export function calcularForcaSenha(senha) {

    let pontos = 0;
    if (senha.length >= 6) pontos++;
    if (senha.length >= 10) pontos++;
    if (/[A-Z]/.test(senha)) pontos++;  /*validar se tem letra maiuscula*/
    if (/[0-9]/.test(senha)) pontos++;  /*validar se tem numero*/
    
    if (/[^A-Za-z0-9]/.test(senha)) pontos++;  /*validar se tem caractere especial*/

    if (senha.length === 0) return "";
    if (pontos <= 2) return "fraca";
    if (pontos === 3) return "media";
    return "forte";

}