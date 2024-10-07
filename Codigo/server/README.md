
# Documentação da API

Esta documentação fornece detalhes completos sobre a API desenvolvida utilizando NestJS, com módulos de **Produtos** e **Carrinho**, conexão com MongoDB via Mongoose, cacheamento de produtos utilizando Redis para otimizar buscas, e implementação de filas com BullMQ para atualização de estoque. Além disso, a API utiliza Clerk para autenticação e gerenciamento de usuários, garantindo a segurança das operações.


## Sumário

- [Introdução](#introdução)
- [Configuração Inicial](#configuração-inicial)
  - [Requisitos](#requisitos)
  - [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Módulo de Produtos](#módulo-de-produtos)
  - [Modelos](#modelos)
    - [Produto](#produto)
  - [Rotas](#rotas)
    - [Listar Produtos](#listar-produtos)
    - [Criar Produto](#criar-produto)
    - [Atualizar Produto](#atualizar-produto)
    - [Atualizar Estoque do Produto](#atualizar-estoque-do-produto)
- [Módulo de Carrinho](#módulo-de-carrinho)
  - [Modelos](#modelos-1)
    - [Carrinho](#carrinho)
  - [Rotas](#rotas-1)
    - [Obter Carrinho](#obter-carrinho)
    - [Adicionar Produto ao Carrinho](#adicionar-produto-ao-carrinho)
    - [Atualizar Quantidade de Produto no Carrinho](#atualizar-quantidade-de-produto-no-carrinho)
    - [Remover Produto do Carrinho](#remover-produto-do-carrinho)
- [Atualização de Estoque com BullMQ](#atualização-de-estoque-com-bullmq)
  - [Configuração do BullMQ](#configuração-do-bullmq)
  - [Processador de Atualização de Estoque](#processador-de-atualização-de-estoque)
- [Seed de Produtos](#seed-de-produtos)
  - [Execução Automática do Seed](#execução-automática-do-seed)
- [Notas Finais](#notas-finais)

## Introdução

Esta API foi desenvolvida utilizando o framework NestJS, com o objetivo de gerenciar produtos e carrinhos de compras. Ela inclui conexão com MongoDB via Mongoose, implementação de repositórios, casos de uso para cada rota, e processamento assíncrono de atualização de estoque utilizando BullMQ.

## Configuração Inicial

### Requisitos

- Node.js (versão 12 ou superior)
- MongoDB
- Redis (para filas com BullMQ)

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Configurações do MongoDB
DB_HOST=localhost
DB_PORT=27017
DB_NAME=seu_nome_do_banco
DB_USER=seu_usuario
DB_PASS=sua_senha

# Configurações do Redis para BullMQ
DBAAS_REDIS_HOST=localhost
DBAAS_REDIS_PORT=6379
DBAAS_REDIS_PASSWORD=sua_senha_redis (se aplicável)
```

## Módulo de Produtos

### Modelos

#### Produto

```typescript
{
  name: string;
  originalPrice: number;
  price: number;
  stock: number;
  slug: string; // Único
  rating: number;
  image: string;
  description: string;
}
```

### Rotas

#### Listar Produtos

- **Método:** GET
- **Endpoint:** `/products`
- **Descrição:** Lista produtos com opção de busca e paginação.

##### Parâmetros de Query:

- `search` (opcional): Termo de busca para filtrar produtos pelo nome.
- `page` (opcional): Número da página para paginação (padrão: 1).
- `limit` (opcional): Número de produtos por página (padrão: 10).

##### Exemplo de Requisição:

```http
GET /products?search=perfume&page=1&limit=5
```

##### Exemplo de Resposta:

```json
{
  "products": [
    {
      "_id": "5f8f8c44b54764421b7156c3",
      "name": "Essência Floral",
      "originalPrice": 150,
      "price": 120,
      "stock": 8,
      "slug": "essencia-floral",
      "rating": 4.1,
      "image": "https://m.media-amazon.com/images/I/41-4SD9wGeL._AC_.jpg",
      "description": "Perfume Essência Floral"
    }
    // ... outros produtos
  ],
  "currentPage": 1,
  "totalPages": 2,
  "totalProducts": 7
}
```

#### Criar Produto

- **Método:** POST
- **Endpoint:** `/products`
- **Descrição:** Cria um novo produto.

##### Corpo da Requisição:

```json
{
  "name": "Essência Floral",
  "originalPrice": 150,
  "price": 120,
  "stock": 8,
  "slug": "essencia-floral",
  "rating": 4.1,
  "image": "https://m.media-amazon.com/images/I/41-4SD9wGeL._AC_.jpg",
  "description": "Perfume Essência Floral"
}
```

##### Exemplo de Resposta:

```json
{
  "_id": "5f8f8c44b54764421b7156c3",
  "name": "Essência Floral",
  "originalPrice": 150,
  "price": 120,
  "stock": 8,
  "slug": "essencia-floral",
  "rating": 4.1,
  "image": "https://m.media-amazon.com/images/I/41-4SD9wGeL._AC_.jpg",
  "description": "Perfume Essência Floral"
}
```

#### Atualizar Produto

- **Método:** PUT
- **Endpoint:** `/products/:id`
- **Descrição:** Atualiza as informações de um produto existente.

##### Parâmetros de Rota:

- `id`: ID do produto a ser atualizado.

##### Corpo da Requisição:

```json
{
  "name": "Essência Floral Atualizada",
  "price": 130,
  "stock": 10,
  "description": "Descrição atualizada do produto"
}
```

##### Exemplo de Resposta:

```json
{
  "_id": "5f8f8c44b54764421b7156c3",
  "name": "Essência Floral Atualizada",
  "originalPrice": 150,
  "price": 130,
  "stock": 10,
  "slug": "essencia-floral",
  "rating": 4.1,
  "image": "https://m.media-amazon.com/images/I/41-4SD9wGeL._AC_.jpg",
  "description": "Descrição atualizada do produto"
}
```

#### Atualizar Estoque do Produto

- **Método:** PATCH
- **Endpoint:** `/products/:id/stock`
- **Descrição:** Atualiza apenas o estoque de um produto.

##### Parâmetros de Rota:

- `id`: ID do produto.

##### Corpo da Requisição:

```json
{
  "stock": 15
}
```

##### Exemplo de Resposta:

```json
{
  "message": "Estoque atualizado com sucesso",
  "product": {
    "_id": "5f8f8c44b54764421b7156c3",
    "name": "Essência Floral",
    "originalPrice": 150,
    "price": 120,
    "stock": 15,
    "slug": "essencia-floral",
    "rating": 4.1,
    "image": "https://m.media-amazon.com/images/I/41-4SD9wGeL._AC_.jpg",
    "description": "Perfume Essência Floral"
  }
}
```
## Módulo de Carrinho

### Modelos

#### Carrinho

```typescript
{
  cartItems: [
    {
      product: Product; // Referência ao modelo Produto
      quantity: number;
    }
  ],
  shippingCost: number;
}
```

### Rotas

#### Obter Carrinho

- **Método:** GET
- **Endpoint:** `/cart/:id`
- **Descrição:** Retorna o estado atual do carrinho.

##### Parâmetros de Rota:

- `id`: ID do carrinho.

##### Exemplo de Resposta:

```json
{
  "_id": "5f8f8d1b6b0c2225d4c3b2f1",
  "cartItems": [
    {
      "product": {
        "_id": "5f8f8c44b54764421b7156c3",
        "name": "Essência Floral",
        // ... outros campos do produto
      },
      "quantity": 2
    }
    // ... outros itens do carrinho
  ],
  "shippingCost": 0
}
```

#### Adicionar Produto ao Carrinho

- **Método:** POST
- **Endpoint:** `/cart/add`
- **Descrição:** Adiciona um produto ao carrinho.

##### Corpo da Requisição:

```json
{
  "cartId": "5f8f8d1b6b0c2225d4c3b2f1",
  "productId": "5f8f8c44b54764421b7156c3",
  "quantity": 2
}
```

##### Exemplo de Resposta:

```json
{
  "message": "Produto adicionado ao carrinho"
}
```

#### Atualizar Quantidade de Produto no Carrinho

- **Método:** PUT
- **Endpoint:** `/cart/:id/update-product`
- **Descrição:** Atualiza a quantidade de um produto no carrinho.

##### Parâmetros de Rota:

- `id`: ID do carrinho.

##### Corpo da Requisição:

```json
{
  "productId": "5f8f8c44b54764421b7156c3",
  "quantity": 5
}
```

##### Exemplo de Resposta:

```json
{
  "_id": "5f8f8d1b6b0c2225d4c3b2f1",
  "cartItems": [
    {
      "product": {
        "_id": "5f8f8c44b54764421b7156c3",
        "name": "Essência Floral",
        // ... outros campos do produto
      },
      "quantity": 5
    }
    // ... outros itens do carrinho
  ],
  "shippingCost": 0
}
```

#### Remover Produto do Carrinho

- **Método:** DELETE
- **Endpoint:** `/cart/:id/remove-product/:productId`
- **Descrição:** Remove um produto do carrinho.

##### Parâmetros de Rota:

- `id`: ID do carrinho.
- `productId`: ID do produto a ser removido.

##### Exemplo de Resposta:

```json
{
  "_id": "5f8f8d1b6b0c2225d4c3b2f1",
  "cartItems": [
    // ... itens restantes no carrinho
  ],
  "shippingCost": 0
}
```
