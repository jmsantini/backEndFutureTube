# backEndFutureTube
Projeto Backend FutureTube
 
## Stack
Projeto Backend utilizando NodeJS, Express, Typescript e MySQL. Segue uma arquitetura em camadas:

Presentation: responsável pela comunicação com agentes externos.
Data: responsável pela comunicação direta com o banco de dados.
Business: responsável pela lógica.

## Sobre
Esse foi um projeto Backend um pouco mais completo. Com base o Youtube. Algumas funções são:

Parte dos Users
1. Cadastro
2. Login
3. Pegar todos os usuários
4. Trocar senha

Parte dos videos
1. Criar video
2. Renderizar os videos
3. Deletar um vido
4. Alterar o video
5. Pegar os detalhes do video
6. Pegar videos por usuários


## Instruções para rodar
As instruções são:

npm install para instalar todas as dependências;
npm run start para rodar localmente o projeto
npm run build para gerar uma versão possível de ser deployada com os arquivos transpilados para Javascript
Utiliza o env com os dados:

HOST=
USER=
PASSWORD=
DATABASE=
CLIENT=
JWT_SECRET=
ACCESS_TOKEN_TIME=12h
REFRESH_TOKEN_TIME=24h

## Contato
João Marcelo Santini

jmsantini@live.com

(14) 99682-1388