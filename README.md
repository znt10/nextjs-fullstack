# 📌 JobConnect - Plataforma de Recrutamento


## Equipe
- José Cicero da Silva Neto
- Josá Everton da Silva filho
- Carlos Eduardo


## 📖 Teste
as page de reset-password/[token] , forgot-password, tendei implementar mas ainda nao conseguimos, a senha nao é alterada.


Plataforma web moderna que conecta **candidatos** e **empresas**, facilitando o processo de recrutamento e oferta de vagas de forma rápida, organizada e segura.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)
![Tailwind CSS](https://img.shields.io/badge/Style-Tailwind-38bdf8)
![NextAuth](https://img.shields.io/badge/Auth-NextAuth-purple)

---

## 📖 Descrição

**JobConnect** é uma plataforma fullstack desenvolvida como projeto final da disciplina **Desenvolvimento Web II**. O sistema permite que:

- **Candidatos** cadastrem perfis profissionais, enviem currículos e busquem vagas disponíveis.
- **Empresas** publiquem oportunidades, gerenciem vagas e encontrem profissionais qualificados.
- **Administradores** gerenciem usuários, empresas e vagas da plataforma.

A aplicação implementa conceitos modernos de desenvolvimento web, incluindo autenticação segura, banco de dados NoSQL, componentes reutilizáveis e arquitetura cliente-servidor robusta.

---

## 🛠️ Stack Tecnológico

| Tecnologia               | Versão  | Funcionalidade                           |
| :----------------------- | :------ | :--------------------------------------- |
| **Next.js (App Router)** | 16.0.7  | Framework fullstack (Frontend + Backend) |
| **React**                | 19.2.0  | Biblioteca de componentes                |
| **TypeScript**           | 5.0+    | Tipagem estática para segurança          |
| **Tailwind CSS**         | 4.0+    | Estilização responsiva e moderna         |
| **HeroUI (NextUI)**      | 2.8.5+  | Componentes de UI pré-estilizados        |
| **MongoDB Atlas**        | 7.0.0+  | Banco de dados NoSQL na nuvem            |
| **Mongoose**             | 9.0.0+  | ODM para modelagem de dados              |
| **NextAuth.js**          | 4.24.13 | Gerenciamento de autenticação e sessões  |
| **BcryptJS**             | 3.0.3   | Criptografia de senhas                   |

---

## ✨ Funcionalidades Principais

### 🔐 Autenticação e Usuários

- [x] Cadastro de novos usuários (Candidato ou Empresa)
- [x] Login seguro com validação de credenciais
- [x] Recuperação de senha via token
- [x] Gerenciamento de sessão com JWT e cookies
- [x] Sistema de roles (candidato, empresa, admin)
- [x] Proteção de rotas privadas

### 💼 Gestão de Vagas (CRUD Completo)

- [x] Criação de vagas (apenas por empresas)
- [x] Listagem de vagas com filtros
- [x] Visualização detalhada de vagas
- [x] Edição de vagas (por proprietário)
- [x] Exclusão de vagas (por proprietário)
- [x] Associação automática com empresa

### 🏢 Gerenciamento de Empresas

- [x] Cadastro de novas empresas
- [x] Listagem de empresas cadastradas
- [x] Perfil da empresa com vagas relacionadas
- [x] Informações: nome, descrição, área de atuação

### 👤 Perfil de Candidatos

- [x] Cadastro de dados profissionais
- [x] Upload/gerenciamento de currículo
- [x] Visualização de vagas compatíveis
- [x] Histórico de vagas consultadas

### 📊 Dashboard Administrativo

- [x] Visualização de estatísticas (candidatos, empresas, vagas)
- [x] Gerenciamento de usuários
- [x] Listagem de empresas cadastradas
- [x] Monitoramento de vagas ativas

### 🎨 Interface e UX

- [x] Design responsivo (mobile, tablet, desktop)
- [x] Componentes HeroUI customizados
- [x] Navbar com dropdown de navegação
- [x] Página 404 customizada com rota para vagas
- [x] Indicador de carregamento (loading state)
- [x] Mensagens de acesso negado

---


## 🚀 Como Configurar e Rodar

### 1️⃣ Pré-requisitos

Certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (v18+)
- [Git](https://git-scm.com/)
- Uma conta em [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (gratuito)

### 2️⃣ Clonar o Repositório

```bash
git clone https://github.com/znt10/nextjs-fullstack.git
cd nextjs-fullstack
```

### 3️⃣ Instalar Dependências

```bash
npm install
```

### 4️⃣ Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
# MongoDB (String de Conexão do MongoDB Atlas)
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/jobconnect?retryWrites=true&w=majority

# NextAuth - URL da Aplicação
NEXTAUTH_URL=http://localhost:3000

# NextAuth - Chave Secreta (Gere uma com: openssl rand -base64 32)
NEXTAUTH_SECRET=sua_chave_secreta_muito_longa_aqui

# Credenciais de Admin (Opcional - para login de administrador)
ADMIN_EMAIL=admin@jobconnect.com
ADMIN_PASSWORD=senha_admin_segura
```

**Como gerar NEXTAUTH_SECRET:**

```bash
# Linux/Mac
openssl rand -base64 32

# Windows (PowerShell)
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

Ou use: https://generate.plus/en/base64

### 5️⃣ Executar o Projeto

```bash
npm run dev
```

Acesse: **http://localhost:3000**



## 📝 Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Build para produção
npm start        # Inicia servidor em modo produção
npm run lint     # Executa linter (ESLint)
```


**Desenvolvido com ❤️ usando Next.js, MongoDB e ☕ café**
## Deploy
https://nextjs-fullstack-rosy.vercel.app
