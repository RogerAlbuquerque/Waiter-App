# Waiter App

## Visão geral

Waiter App é um projeto fullstack que conecta três camadas de aplicação em um único repositório:

- `api`: backend em Node.js/Express com MongoDB e WebSocket
- `fe`: aplicação web em React para equipe de cozinha
- `app`: aplicativo móvel em React Native / Expo para uso do garçom

O objetivo principal é oferecer um fluxo de atendimento em restaurantes: o garçom registra pedidos na aplicação móvel, o backend armazena e distribui estes pedidos, e a cozinha acompanha e atualiza o status dos pedidos em tempo real.

## Arquitetura do sistema

### Estrutura geral

- `api/`: serviço REST + WebSocket responsável por gerenciar categorias, produtos e pedidos
- `fe/`: painel web para visualizar pedidos por status e controlar o fluxo de produção
- `app/`: app mobile para criar pedidos a partir de categorias e produtos disponíveis

### Fluxo de dados

1. O `app` consulta categorias e produtos do backend.
2. O garçom seleciona mesa, produtos e confirma o pedido.
3. O backend grava o pedido no MongoDB e emite um evento via `socket.io`.
4. O `fe` recebe o evento em tempo real e atualiza o painel de pedidos.
5. A equipe de cozinha altera o status do pedido em `fe` ou cancela, e o backend persiste essa mudança.

## Backend (`api`)

### Principais responsabilidades

- Conectar ao MongoDB usando `mongoose`
- Expor rotas REST para categorias, produtos e pedidos
- Receber uploads de imagem para produtos com `multer`
- Servir arquivos estáticos de imagens através de `/uploads`
- Emitir eventos em tempo real com `socket.io`

### Endpoints importantes

- `GET /categories` — lista todas as categorias
- `POST /categories` — cria uma nova categoria
- `GET /products` — lista todos os produtos
- `POST /products` — cria um produto com upload de imagem
- `DELETE /products/:productId` — remove produto
- `GET /categories/:categoryId/products` — lista produtos por categoria
- `GET /orders` — lista todos os pedidos
- `POST /orders` — cria um novo pedido
- `PATCH /orders/:orderId` — atualiza o status do pedido
- `DELETE /orders/:orderId` — cancela um pedido

### Modelos de domínio

- `Category`: nome e ícone
- `Product`: nome, descrição, imagem, preço, ingredientes e referência de categoria
- `Order`: mesa, status, data de criação e lista de produtos com quantidades

### Observações técnicas

- A conexão com MongoDB é definida por `process.env.MONGODB_URI`.

---

## Web app (`fe`)

### Objetivo

Painel administrativo para a cozinha acompanhar e gerenciar pedidos.

### Comportamento principal

- Consulta pedidos via API e mantém uma lista local de pedidos
- Conecta ao backend por WebSocket para receber novos pedidos em tempo real
- Exibe pedidos agrupados por status: `WAITING`, `IN_PRODUCTION`, `DONE`
- Permite abrir o modal de pedido, mudar status e cancelar pedidos
- Atualiza o estado da interface local sem recarregar a página

### Observações importantes

- O frontend usa `import.meta.env.VITE_API_URI` para configurar o endpoint da API.
- Em `OrderModal`, há uma URL de imagem codificada: `https://waiterapp-api.onrender.com/uploads/...`, o que pode causar inconsistência entre ambientes.
- A aplicação usa `react-toastify` para feedback visual de ações concluídas.

---

## Mobile app (`app`)

### Objetivo

Aplicativo para garçom criar pedidos e enviar para o backend.

### Comportamento principal

- Carrega categorias e produtos em paralelo ao iniciar
- Filtra produtos por categoria selecionada
- Permite selecionar mesa e montar carrinho de itens
- Exibe total do pedido e quantidade por item
- Envia o pedido para o backend via `POST /orders`
- Exibe modal de confirmação de envio

### Observações importantes

- O mobile usa `process.env.URI_API` para configurar a URL base da API.
- As imagens de produto são carregadas via URL baseada no campo `imagePath` retornado pela API.

## Tecnologias utilizadas

### Backend

- Node.js
- Express
- TypeScript
- Mongoose
- MongoDB
- Multer
- Socket.io
- dotenv
- nodemon

### Frontend web

- React
- TypeScript
- Vite
- Axios
- Styled-components
- react-toastify
- socket.io-client

### Mobile

- React Native
- Expo
- Axios
- Styled-components
- Expo Font

## Organização dos diretórios

- `api/`
  
  - `src/index.ts`: ponto de entrada, inicializa Express, MongoDB e Socket.io
  - `src/router.ts`: define rotas e middleware de upload
  - `src/app/models`: modelos de dados
  - `src/app/useCases`: lógica de CRUD por domínio
  - `uploads/`: pasta para imagens enviadas via API

- `fe/`
  
  - `src/App.tsx`: ponto de entrada da UI web
  - `src/components`: componentes de UI e painel de pedidos
  - `src/utils/api.ts`: cliente Axios configurado
  - `src/types`: tipagens TypeScript

- `app/`
  
  - `App.tsx`: ponto de entrada do Expo
  - `src/Main`: tela principal do garçom
  - `src/components`: componentes de interface móvel
  - `src/utils/api.ts`: cliente Axios móvel
  - `src/types`: tipos de dados mobile

## Instalação e execução

### Pré-requisitos

- Node.js
- Yarn ou npm
- MongoDB rodando localmente ou com Docker
- Expo CLI para a aplicação mobile

### Backend

```bash
cd api
yarn install
# ou npm install
```

Configurar variável de ambiente:

```env
MONGODB_URI=mongodb://localhost:27017/waiterapp
```

Iniciar:

```bash
yarn dev
# ou npm run dev
```

### Frontend web

```bash
cd fe
yarn install
# ou npm install
```

Configurar variável de ambiente em `fe/.env` ou equivalente:

```env
VITE_API_URI=http://localhost:3001
```

Iniciar:

```bash
yarn dev
# ou npm run dev
```

### Mobile

```bash
cd app
yarn install
# ou npm install
```

Configurar variável de ambiente em `app/.env` ou no arquivo de ambiente do Expo:

```env
URI_API=http://localhost:3001
```

Iniciar:

```bash
yarn start
# ou npm run start
```

## Exemplos de uso

- Garçom abre o app móvel, escolhe uma mesa, adiciona itens ao carrinho e confirma pedido.
- Cozinha visualiza o pedido no painel web em `Fila de espera`.
- Ao iniciar a produção, a cozinha muda o pedido para `Em preparação`.
- Quando o pedido estiver pronto, a cozinha muda para `Pronto` ou cancela o pedido.

## Possíveis melhorias futuras

- Centralizar as variáveis de ambiente e remover URLs codificadas no frontend.
- Adicionar autenticação para separar as credenciais de garçom e cozinha.
- Implementar tratamento de erros mais robusto nas chamadas de API.
- Adicionar documentação OpenAPI/Swagger para o backend.
- Usar armazenamento de arquivos em nuvem em vez da pasta local `uploads`.
- Padronizar a forma como os clientes consomem a API para garantir compatibilidade entre ambientes.

## Observações finais

Esse é um MVP de um sistema de pedidos para restaurante, com foco em integração entre garçom e cozinha. A arquitetura é simples e modular, permitindo evoluir o backend, o painel web e o app móvel de forma independente.
