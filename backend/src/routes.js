const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const connection = require('./database/connection');

const routes = express.Router();



//Login
routes.post('/sessions', SessionController.create);

//Rota para listar dos as Ongs do banco
routes.get('/ongs', OngController.index);
//Criando rota para inserir uma nova Ong
routes.post('/ongs', OngController.create);

//Incidents
routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

//Profile
routes.get('/profile', ProfileController.index);

//Torná-lo acessível no contexto externo  (expost de uma veriável)
module.exports = routes;