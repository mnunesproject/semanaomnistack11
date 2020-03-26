const express = require('express');

const routes = express.Router();



/**
 * Banco de dados
 * 
 * Driver:  SELECT * FROM users
 * Query Builder: table('users').select('*').where()
 */



//Criando a primeira rota 'raiz'
routes.get('/', (request, response) => {  
    return response.json({
        evento: "Curso online",
        aluno: "Marcelo Nunes Ferreira"
    });
})

//Criando a rota 'usuarios'
routes.get('/users', (request, response) => {  

    const params = request.query;
    console.log(params);

    return response.json({
        evento: "Curso online",
        aluno: "Marcelo Nunes"
    });
})

routes.post('/users', (request, response) => {  

    const body = request.body;
    console.log(body);

    return response.json({
        evento: "Curso online",
        aluno: "Marcelo Nunes"
    });
})

//Criando a rota 'produtos'
routes.get('/produtos/:id', (request, response) => {  

    const params = request.params;
    console.log(params);

    return response.json({
        produto: "DVD de música",
        nome: "Paula Fernandas"
    });
})