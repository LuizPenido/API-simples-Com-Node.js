const { uuid } = require('uuidv4');

const { request, response } = require('express');
const express = require('express');

const app = express();

//Para ler, futuramente, os arquivos JSON na requisição de cadastro
app.use(express.json());

//Inicialização básica da lista de contato
const contatos = [{
    "id": uuid(),
    "nome": "Luiz",
    "sobrenome": "Eduardo",
    "numero": "31999999999"
}, {
    "id": uuid(),
    "nome": "Pedro",
    "sobrenome": "Alcantara",
    "numero": "35999999999"
}, {
    "id": uuid(),
    "nome": "Luiz",
    "sobrenome": "Alcantara",
    "numero": "30999999999"
}];

//Método simples de consulta. Permite pesquisa utilizando mais de um parâmetro ao mesmo tempo
//Necessita ser otimizada e mais bem escrita, mas para ser simples, deixarei assim por enquanto
app.get('/contatos', (request, response) => {
    const { id, nome, sobrenome, numero } = request.query;

    //Copia o array principal, permitindo o armazenamento dos dados fitrados na mesma variável e a composição dos campos de pesquisa. Mandar uma solicitação sem campo, indica que todos os contatos devem ser retornados.
    contatosFiltrados = contatos;

    if(id != undefined)
    {
        contatosFiltrados = contatosFiltrados.filter(contato => contato.id === id);
    }
    if(nome != undefined)
    {
        contatosFiltrados = contatosFiltrados.filter(contato => contato.nome === nome);
    }
    if(sobrenome != undefined)
    {
        contatosFiltrados = contatosFiltrados.filter(contato => contato.sobrenome === sobrenome);
    }
    if(numero != undefined)
    {
        contatosFiltrados = contatosFiltrados.filter(contato => contato.numero === numero);
    }

    return response.json(contatosFiltrados);
});

app.post('/contatos', (request, response) => {
    const { nome, sobrenome, numero } = request.body;

    if(nome === undefined || nome === "" || numero === undefined || numero === "")
    {
        return response.status(400).json({
            "status":"erro",
            "erro":"informação incompleta"
        });
    }

    const contato = {
        "id": uuid(),
        "nome": nome,
        "sobrenome": sobrenome === undefined ? "" : sobrenome,
        "numero": numero
    };
    contatos.push(contato);

    contato.status = "sucesso";
    return response.json(contato); 
});

app.delete('/contatos/:id', (request, response) => {
    const { id } = request.params;
    const indexDoContato = contatos.findIndex(contato => contato.id === id);
    const contato = contatos[indexDoContato];

    if(indexDoContato < 0) {
        return response.status(404).json({});
    }

    contatos.splice(indexDoContato, 1);
    return response.status(200).json(contato);
});

app.listen(3333);