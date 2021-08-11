# API simples
 
Este repositório contém uma simples API que demonstra funcionalidades básicas do Express. Com o intuito de ser didático e o mais simples possível, todo o armazenamento será não persistente. (Para ver esta mesma API com o armazenamento em um banco de dados, clique [aqui]()).

A API armazenará contatos como se fosse uma agenda telefônica, permitindo pesquisar (utilizando múltiplos campos), criar, editar e apagar contatos.

---
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
##  Cadastrando usuários com o GET
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

## Apagando com o método DELETE
Para apagar um contato, deve-se utilizar o método DELETE através da seguinte URL
```
http://localhost:3333/contatos/id
```

onde o paramêtro de roda id é o ID do contato que será apagado5. 

O retorno para este método é um JSON contendo o contato apagado. Caso o ID não corresponda a nenhum contato, será retornado um JSON vazio.