const connection = require('../database/connection');
const crypto = require('crypto');

/**
 * Banco de dados
 * 
 * Driver:  SELECT * FROM users
 * Query Builder: table('users').select('*').where()
 */


module.exports = {


    async index(request, response){
        const ongs = await connection('ongs').select('*');

        return response.json(ongs);
    },


    async create (request, response) {
        
        //const data = request.body;   //outra forma
        const { name, email, whatsapp, city, uf } = request.body;

        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        return response.json({id});
    }
};