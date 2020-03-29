const connection = require('../database/connection');

module.exports = {
    //retorna todos incidents de uma ong
    async index (request, response) {
        const ong_id = request.headers.authorization;

        const incidents = await connection('mov_incidents')
            .where('ong_id', ong_id)
            .select('*');

        return response.json(incidents);
    }
}