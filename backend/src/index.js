const express = require('express');
const cors = require('cors');
const routes = require('./routes');

//Criando a minha aplicação
const app = express();

app.use(cors());

//Informar a utilização de JSON no Express
app.use(express.json());

app.use(routes);




//Denindo para a minha aplicação a porta de acesso
app.listen(3333);