# API simples com Node.js
 
Este repositório contém uma simples API que demonstra funcionalidades básicas do Express. Com o intuito de ser didático e o mais simples possível, todo o armazenamento será não persistente. (Para ver esta mesma API com o armazenamento em um banco de dados, clique [aqui]()).

A API armazenará contatos como se fosse uma agenda telefônica, permitindo pesquisar (utilizando múltiplos campos), criar, editar e apagar contatos.

---

# Sumário
- [Baixando e executando o projeto](#executando-o-repositório)
- Acessando as rodas
    - [Consultar](#consultando-usuários-com-o-get)
    - [Cadastrar](#cadastrando-com-o-método-post)
    - [Editar](#editando-com-o-método-put)
    - [Deletar](#apagando-com-o-método-delete)

## Executando o repositório

Baixe o repositório, navegue até a pasta e instale todas as dependências com o seguinte comando na pasta raíz:

```
yarn install
```

Em seguida, digite:
```
yarn nodemon src/index.js
```

Pronto, a aplicação já está rodando.

---
## Acessando as rotas
Utilizaremos métodos HTTP para acessar a rota. Portanto, é necessário a instalação de alguma ferramenta que permita a requisição através de métodos HTTP. Recomendo o Insomnia pela sua simplicidade. [Aqui está um tutorial fácil de instalação e utilização do Insomnia](https://www.youtube.com/watch?v=022dOdiAA8Q&ab_channel=RonanAdrielZenatti)

---
##  Consultando usuários com o GET
Como o nome do método sugere, ele é responsável por consultar na API buscando os contatos. Podemos recuperar apenas contatos com determinado valor nos campos informados ou vários contatos através da seguinte URL

```
http://localhost:3333/contatos
```
que pode receber, através de query params, as seguintes variáveis:
 - id;
 - nome;
 - sobrenome;
 - numero.

Caso nenhum campo seja informado, todos os contatos serão retornados.

Um exemplo simples de string de consulta buscando pelos contatos com o nome "Luiz" está abaixo:
```
http://localhost:3333/contatos?nome=Luiz
```

Para buscar um contato com o sobrenome "Silva", temos:
```
http://localhost:3333/contatos?sobrenome=Silva
```

Para buscar um contato com o id, temos:
```
http://localhost:3333/contatos?id=0123456789
```

E, por fim, para buscar um contato com o número de telefone 99999-9999, temos:

```
http://localhost:3333/contatos?numero=999999999
```
Além disso, podemos compor a string com mais de um campo válido, otimizando o resultado da pesquisa

O retorno é uma lista com todos os contatos, cada um utilizando o formato JSON como no exemplo abaixo:

```
{
    "id":"xxxxxxxxxxxx"
    "nome":"Luiz",
    "sobrenome:"Silva",
    "numero":"999999999"
}
```

## Cadastrando com o método POST
O método post serve para registrar um contato na agenda. 

Os dados são enviados através de um JSON inserido no body da requisição. Para o cadastro, é necessário que haja pelo menos o nome e o número. Caso haja a ausência de pelo menos um dos dois, o contato não será registrado e retornaremos um erro informando ao solicitante da requisição o campo faltante.

A URL para utilizar este método é a seguinte:
```
http://localhost:3333/contatos
```
e o body no formato:
```
{
    "nome":"Fulano",
    "sobrenome":"Santos",
    "numero":"988888888"
}
```

O método retorna um JSON com o contato cadastrado e o status da operação
```
{
    "id":"xxxxxxx",
    "nome":"Fulano",
    "sobrenome":"Santos",
    "numero":"988888888",
    "status":"sucesso"
}
```
caso o cadastro seja efetuado com sucesso. Ou retorna o JSON
```
{
    "status":"erro"
}
```
em caso de erro.

## Editando com o método PUT

Para editar um contato, deve-se utilizar o método PUT através da seguinte URL
```
http://localhost:3333/contatos/id
```

onde "id" é o id do contato que será editado. O corpo da requisição deve conter um JSON apenas com os campos que serão editados e os valores que serão inseridos na modificação.

O retorno do método é um JSON com todos os dados do contato já editados.
## Apagando com o método DELETE
Para apagar um contato, deve-se utilizar o método DELETE através da seguinte URL
```
http://localhost:3333/contatos/id
```

onde o paramêtro de roda id é o ID do contato que será apagado5. 

O retorno para este método é um JSON contendo o contato apagado. Caso o ID não corresponda a nenhum contato, será retornado um JSON vazio.
