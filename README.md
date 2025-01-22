# Teste Backend Products Open Facts

## Introdução

Este é um teste de backend, onde foi criada um integração com o Open Foods Facts. Foi implementado o processo de busca dos produtos desta API e foram disponibilizados endpoints para busca e alteração dos dados dos produtos salvos na base de dados e um endpoint com a informação de log de processamento da API

## Tecnologias, Linguagem e Frameworks utilizados

- NodeJs
- TypeScript
- Express
- MongoDB
- Cors
- Dotenv
- Jest
- Supertest
- Nodemon
- Cron

## Instruções

Para rodar o projeto, depois de baixar do GitHub, seguir os seguintes passos:

- Dentro da pasta do projeto, rodar o comando: `npm i`
- Após a instalação, rodar o comando: `npm run dev` para rodar em desenvolvimento
- Para rodar em produção, rodar o comando: `npm run build` e em seguida `npm run start`
- Para rodar os testes, rodar o comando: `npm run test`
- Para visualiza a documentação, usar o url base com /docs

> This is a challenge by [Coodesh](https://coodesh.com/)

## Processo de Desenvolvimento

- Primeiro foi analisada a API do Open Food Facts para entender o funcionamento e estrutura da mesma.
- O projeto foi criado com as tecnologias acima, por ser a que tenho mais familiaridade.
- Para criar o teste unitário dos endpoints, precisei estudar a biblioteca Supertest, pois ainda não havia feito estes tipos de testes unitários
- No momento de buscar os dados, houve um problema relacionado ao tamanho dos arquivos, onde busquei a saída que se adequava ao momento para poder entregar o projeto no prazo acordado.
- Foi um projeto no qual pude entender melhor alguns detalhes técnicos, os quais eu sabia como trabalhar, mais a parte teórica não lembrava.
