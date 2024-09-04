[JAVASCRIPT__BADGE]: https://img.shields.io/badge/Javascript-000?style=for-the-badge&logo=javascript
[TYPESCRIPT__BADGE]: https://img.shields.io/badge/typescript-D4FAFF?style=for-the-badge&logo=typescript
[REACT__BADGE]: https://img.shields.io/badge/React-005CFE?style=for-the-badge&logo=react
[VUE__BADGE]: https://img.shields.io/badge/VueJS-fff?style=for-the-badge&logo=vue
[GATSBY__BADGE]: https://img.shields.io/badge/Gatsby-7026b9?style=for-the-badge&logo=gatsby
[ANGULAR__BADGE]: https://img.shields.io/badge/Angular-red?style=for-the-badge&logo=angular
[PROJECT__BADGE]: https://img.shields.io/badge/📱Visit_this_project-000?style=for-the-badge&logo=project
[PROJECT__URL]: https://github.com/Fernanda-Kipper/Readme-Templates

<h1 align="center" style="font-weight: bold;">Piadas.co - Frontend/Backend</h1>

<p align="center">
 <a href="#about">Sobre</a> • 
 <a href="#started">Começando</a> • 
  <a href="#prerequisites">Requisitos</a> • 
  <a href="#routes">Rotas</a> •
 <a href="#contato">Contato</a>
</p>

<h2 id="about">Sobre o Projeto</h2>

Aplicação web desenvolvida com o Framework Next.js, com funcionalidades para consumir a API autoral para requisição das piadas."

<h3>Tecnologias</h3>

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![react][REACT__BADGE]
![typescript][TYPESCRIPT__BADGE]
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

<h2 id="started">Acesso</h2>

[Piadas.co](https://piadas-co.vercel.app/)

<h3 id="prerequisites">Pré Requisitos</h3>

Caso você queira usar o projeto localmente é preciso ter o NodeJs instalado na sua maquina.
- [NodeJS](https://nodejs.org/pt)

Primeiro Clone o repositorio

```bash
git clone https://github.com/kaualimadesouza/piadas.co.git
```

Acesse a pasta correspondente e execute.

```bash
cd piadas.co
npm install
npm run dev
```

<h2 id="routes">Rotas da Aplicação</h2>

Paginas da aplicação
​
| Rota               | Descrição                                          
|----------------------|-----------------------------------------------------
| <kbd>/</kbd>     | home page
| <kbd>/joke/randomjoke</kbd>     | Página para gerar uma piada aleatória.
| <kbd>/joke/{criador}</kbd>     | Página que gera uma piada de acordo com a query do criador e nome piada fornecido pelo usuário.

Endpoints
​
| Rota               | Descrição                                          
|----------------------|-----------------------------------------------------
| <kbd>GET /api/joke</kbd>     | Retorna todas as piadas do banco.
| <kbd>GET /api/creator</kbd>     | Retorna todas os criadores de piadas do banco.
| <kbd>GET /api/creator/{criador}</kbd>     | Retorna um criador pelo nome passado na URL.
| <kbd>GET /api/joke/{jokeId}</kbd>     | Retorna uma piada pelo Id.
| <kbd>GET /api/joke/search/{criador}/{nomeDaPiada}</kbd>     | Retorna uma piada pelo criador e nome da piada (caso existir alguma piada daquele criador com certo nome).
| <kbd>GET /api/joke/search/{criador}</kbd>     | Retorna todas as piadas desse criador.
| <kbd>POST /api/joke</kbd>     | Insere uma piada no banco.
| <kbd>POST /api/creator</kbd>     | Insere um criador no banco.


<h2 id="contato">Contato</h2>

Linkedin [@kaualimadesouza](https://www.linkedin.com/in/kaualimadesouza/) &nbsp;&middot;&nbsp;
