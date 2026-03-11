# 🚀 Forum API - NestJS Clean Architecture

<p align="center">
  <img alt="NestJS" src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white"/>
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img alt="Prisma" src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white"/>
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"/>
  <img alt="Docker" src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white"/>
  <img alt="Vitest" src="https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white"/>
</p>

> Projeto desenvolvido durante o módulo "NestJS com Clean Architecture" da trilha de Node.js do **Ignite** da [Rocketseat](https://www.rocketseat.com.br/).

## 📖 Sobre o Projeto

O **Forum API** é uma aplicação de Perguntas e Respostas (estilo StackOverflow) desenvolvida para aplicar conceitos avançados de arquitetura de software e design de código. A API permite que estudantes façam perguntas e instrutores (ou outros estudantes) possam respondê-las, incluindo a funcionalidade de marcar a melhor resposta de uma pergunta.

O principal objetivo deste projeto não é apenas entregar a funcionalidade, mas sim focar em **como** a aplicação é construída, garantindo alta coesão, baixo acoplamento e um código altamente testável através do Clean Architecture e DDD.

## 🎯 Conceitos Estudados

Este projeto foi construído colocando em prática os seguintes padrões e conceitos:

- **Domain-Driven Design (DDD)**: Modelagem focada no domínio do negócio (Entidades, Casos de Uso, Value Objects, Aggregates, Eventos de Domínio).
- **Clean Architecture**: Separação clara de responsabilidades em camadas (Core/Domain, Application, Infraestructure).
- **Inversão de Dependência**: Desacoplamento de frameworks e ferramentas externas (como banco de dados e criptografia) das regras de negócio.
- **SOLID**: Princípios aplicados para facilitar a manutenção e evolução do software.
- **Testes Automatizados**: Implementação de testes unitários abrangentes com Vitest e Testes End-to-End (E2E) com Supertest para a camada de infraestrutura.
- **Autenticação**: Uso de JWT (JSON Web Token) e Passport com estratégias seguras e guardiões de rotas no NestJS.
- **Validação de Dados**: Uso do Zod em conjunto com o sistema de Pipes do NestJS.

## ⚙️ Funcionalidades (Features)

- [x] Criação de conta de usuário (Estudante/Instrutor)
- [x] Autenticação de usuário e geração de token JWT
- [x] Criação, edição e exclusão de Perguntas (Questions)
- [x] Criação, edição e exclusão de Respostas (Answers)
- [x] Escolha da melhor resposta para uma pergunta
- [x] Paginação e listagem de perguntas recentes

## 🛠️ Tecnologias Utilizadas

- [Node.js](https://nodejs.org/) & [TypeScript](https://www.typescriptlang.org/)
- [NestJS](https://nestjs.com/) - Framework robusto para Node.js progressivo
- [Prisma ORM](https://www.prisma.io/) - Mapeador objeto-relacional (ORM)
- [PostgreSQL](https://www.postgresql.org/) - Banco de Dados Relacional via Docker
- [Vitest](https://vitest.dev/) - Framework de testes ultra-rápido (Testes Unitários e E2E)
- [BCrypt.js](https://www.npmjs.com/package/bcryptjs) - Hashing de senhas
- [Zod](https://zod.dev/) - Validação de schemas e dados
- [Husky](https://typicode.github.io/husky/) - Git hooks para garantir a qualidade de código antes do commit/push

## 🚀 Como Executar

**1. Clone o repositório**
```bash
git clone <url-do-seu-repositorio>
cd 05-nest-clean
```

**2. Instale as dependências**
```bash
pnpm install
```

**3. Inicie o banco de dados via Docker**
```bash
docker compose up -d
```

**4. Configure as variáveis de ambiente**
Crie um arquivo `.env` na raiz do projeto contendo as variáveis necessárias:
```env
DATABASE_URL="postgresql://postgres:docker@localhost:5432/nest-clean?schema=public"
JWT_PRIVATE_KEY="sua_chave_privada_base64"
JWT_PUBLIC_KEY="sua_chave_publica_base64"
PORT=3333
```
*(As chaves JWT devem ser geradas através do algoritmo RS256 e encodadas em base64, conforme o padrão de configuração desta aplicação)*

**5. Execute as migrations do Prisma**
```bash
npx prisma migrate dev
```

**6. Rode a aplicação**
```bash
pnpm run start:dev
```
A API estará rodando em `http://localhost:3333` (por padrão, ou configurado no Nest).

## 🧪 Testes

A aplicação possui excelente cobertura de testes focado primariamente nas regras de negócios da aplicação.

```bash
# Rodar testes unitários
pnpm run test

# Rodar testes E2E
pnpm run test:e2e

# Ver cobertura de testes
pnpm run test:cov
```

## 📝 Licença

Este projeto foi desenvolvido para fins de estudo e aprendizado prático durante o Ignite da Rocketseat. Sinta-se à vontade para utilizá-lo para seus próprios estudos e evoluções!
