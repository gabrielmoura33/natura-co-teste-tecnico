<p align="center">
     <img src="./Artefatos/preview-2.png" />
</p>

# Natura & CO Teste Técnico
<p>
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/gabrielmoura33/natura-co-teste-tecnico">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/gabrielmoura33/natura-co-teste-tecnico">
  
  <a href="https://github.com/WallysonGalvao/rocketseat-gobarber/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/gabrielmoura33/natura-co-teste-tecnico">
  </a>

  <a href="https://github.com/gabrielmoura33/natura-co-teste-tecnico/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/gabrielmoura33/natura-co-teste-tecnico">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
</p>

## 🛠️ Tecnologias utilizadas
Este projeto utiliza as seguintes tecnologias:
- **NestJS**: Framework de backend para construção de APIs eficientes.
- **Next.js**: Framework React para construção de aplicações web.
- **TailwindCSS**: Biblioteca de estilos para construção de interfaces responsivas.
- **Clerk Auth**: Serviço para autenticação e gerenciamento de usuários.
- **Redis**: Sistema de cache em memória para otimização de performance.
- **BullMQ**: Sistema para impelentacao de filas
- **MongoDB**: Banco de dados NoSQL para armazenamento de dados.
- **TypeScript**: Linguagem de programação para aumentar a robustez e escalabilidade do código.


## 📚 Instalação
- Docker
- Docker Compose
- Node.js (v16 ou superior)
- Yarn (como gerenciador de pacotes)

Passos para instalação
1. Clone este repositório:
```bash 
    git clone https://github.com/gabrielmoura33/natura-co-teste-tecnico
    cd natura-co-teste-tecnico
```

2. Inicie todos os serviços usando Docker Compose:
Na raiz do projeto, execute o seguinte comando para construir e iniciar todos os containers (API NestJS, aplicação Next.js, MongoDB e Redis):
```bash 
   docker-compose build --no-cache
   docker-compose up -d
```

3. Acesse o aplicativo no navegador em http://localhost:3000

## 🎨 Protótipo
O protótipo deste projeto está disponível no arquivo Figma localizado em `Artefatos/prototipo.fig`. Para visualizar e interagir com o design do protótipo, utilize a ferramenta Figma e abra o arquivo mencionado. Este protótipo serve como uma representação visual do layout e do fluxo da aplicação, ajudando a guiar a implementação e a experiência do usuário.

## 🤝 Contribuindo
Sinta-se à vontade para abrir issues ou enviar pull requests com suas sugestões e melhorias. Adoraríamos receber sua ajuda!


## 📞 Contato
Se você tiver alguma dúvida, entre em contato com os desenvolvedores por e-mail: gabrielmourajs@gmail.com

## 🎯 Próximos passos
À medida que o projeto evolui, planejamos implementar os seguintes recursos e melhorias:

1. **Containerizaçao com Docker e Docker-Compose**

2. **Gateway de pagamentos com Stripe**: Integrar o Stripe para facilitar os pagamentos e tornar a experiência de compra mais fluida.

3. **Testes Unitarios e E2E**: Adicionar testes automatizados para garantir a confiabilidade e a robustez do sistema.

4. **Criaçao de um gateway padrao e separacao dos servicos**: Implementar um gateway que padronize as chamadas de serviço e facilite a manutenção e escalabilidade.

Sinta-se à vontade para contribuir com essas melhorias ou sugerir novas ideias através de issues e pull requests no repositório do projeto.
