const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

    async index (request, response) {
        return response.json(
            await connection('tab_ongs').select('*')
        );
    },

    async create (request, response) {
        const {
            name,
            email,
            whatsapp,
            city,
            uf,
        } = request.body

        const id = crypto.randomBytes(4).toString('HEX');

        await connection('tab_ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        });

        return response.json({ id });
    }
}