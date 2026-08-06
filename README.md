# Nexion — Frontend

Sistema web de controle financeiro pessoal e compartilhado. Interface construída em **React (Vite)**, com autenticação, dashboard e gestão de conta.

Nesta primeira etapa, toda a comunicação com o backend é simulada localmente (*mock*), preparada para a integração com a API real (**Spring Boot**) na Parte 2.

---

## Funcionalidades

- 🔐 **Login** — validação, persistência de sessão e proteção de rotas
- 📝 **Cadastro** — indicador de força de senha em tempo real e validação de confirmação
- 🔑 **Recuperação de senha** — fluxo em 2 etapas (solicitar + redefinir via token na URL)
- 🔒 **Alteração de senha** — área autenticada, exige a senha atual
- 📊 **Dashboard** — resumo financeiro, gráfico (Recharts), lançamentos recentes e navegação lateral

---

## Tecnologias

| Ferramenta | Função |
|---|---|
| **React** + **Vite** | Biblioteca de UI e ferramenta de build |
| **React Router DOM** | Navegação e rotas protegidas |
| **PrimeReact** + **PrimeIcons** | Componentes de interface e ícones |
| **Recharts** | Gráficos do dashboard |
| **Axios** | Cliente HTTP (configurado para a integração da Parte 2) |

---

## Estrutura de pastas

```
src/
├── components/   # componentes reutilizáveis (Sidebar, ProtectedRoute)
├── pages/        # as telas (Login, Register, Dashboard, ...)
├── services/     # camada de comunicação (AuthService, BaseService, axiosConfig)
├── mocks/        # dados fictícios temporários (Parte 1)
├── utils/        # funções auxiliares (formatarMoeda, forcaSenha)
└── styles/       # estilos compartilhados (auth.css)
```

---

## Credenciais de teste (mock)

Como ainda não há backend, use estas credenciais para entrar:

- **E-mail:** `brayan@nexion.com`
- **Senha:** `123456`

Para testar a redefinição de senha, acesse:
`http://localhost:3000/redefinir-senha/qualquertoken`

---

## Decisões de projeto

**Por que separar em camadas (services / mocks / utils / components)?**
Para organização, reaproveitamento e para facilitar a troca do mock pela API real.

**Por que a camada de serviços usa classes (BaseService / AuthService)?**
O `BaseService` centraliza o CRUD; cada serviço herda e adiciona o comportamento específico, sem necessidade de duplicação.

**Por que os mocks retornam Promises com delay?**
Simulam a latência real da API, permitindo, por agora, a construção dos estados de *loading*.

**Como funciona a proteção de rotas?**
O `ProtectedRoute` checa o token no `localStorage`; sem token, redireciona para o login.

**Por que a mensagem de recuperação de senha é neutra?**
Por segurança, para não revelar se um e-mail está cadastrado.

---

## Status e próximos passos

- ✅ **Parte 1** (Frontend com mocks) — concluída
- 🔜 **Parte 2** (Backend Spring Boot + integração) — substituir os mocks pelas chamadas reais via Axios
