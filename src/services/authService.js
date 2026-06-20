const USUARIO_FALSO = [
    { id: 1, nome: 'Brayan Mateus', email: 'braya@nexion.com', password: '123456' },
];

export function login(email, password) {

    return new Promise((aceita, rejeita) => {
        setTimeout(() => {

            const usuario = USUARIO_FALSO.find(
                (u) => u.email === email && u.password === password
            );

            if (usuario) {
                aceita({
                    token: 'nexion-token-falso-123', usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email },
                });
                //aqui ele valida o email inserido

            } else {
                rejeita(new Error('E-mail e senha incorretos'));
            }
            //aqui ele rejeita dando erro e mensagem
        }, 1500);
    });
}

export function cadastrar(nome, email, password) {
    return new Promise((aceita, rejeita) => {
        setTimeout(() => {

            const jaExiste = USUARIO_FALSO.find((u) => u.email === email);

            if (jaExiste) {
                rejeita(new Error('E-mail já cadastrado no sistema !'));
            } else {
                aceita({ mensagem: 'Conta criada com sucesso !!' });
            }
        }, 1500);
    });
}
