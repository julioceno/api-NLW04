import "reflect-metadata";
import express from 'express';
import "./database"

const app = express();

/*
* GET => Buscar
* POST => Salvar
* PUT => Alterar
* DELETE => Deletar
* PATCH => Alteração específica 
*/


// https://localhost:3333/users
app.get('/', (request, response) => {
    return response.json({ message: 'Hello world - NLW04'})
});

// 1 param => Rota(Recurso API)
// 2 param => request, response

app.post('/', (request, response) => {
    // recebeu os dados para salvar
    return response.json({message: 'Os dados foram salvos com sucessos!'})
});

app.listen(3333, () => console.log('Server is running!'));