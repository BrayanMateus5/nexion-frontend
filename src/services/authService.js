const USUARIO_FALSO = [
    { id: 1, nome: 'Brayan Mateus', email: 'braya@nexion.com', senha: '123456' },
];

export function login(email, senha) {
    return new Promise((aceita, rejeita) => {
        setTimeout(() =>
            const usuario = USUARIO_FALSO.find(
            (u) => u.email === email && u.senha === senha
        )
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

export function cadastrar(nome, email, senha) {
    return new Promise
}