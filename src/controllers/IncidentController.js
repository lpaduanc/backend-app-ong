const connection = require('../database/connection');

module.exports = {

    // retornar todos os incidents
    async index (request, response) {
        //paginação
        const { page = 1 } = request.query;
        
        const [count] = await connection('mov_incidents')
            .count();

        //envia o total de registros no cabeçalho de resposta
        response.header('X-Total-Count', count['count(*)']);

        return response.json(
            await connection('mov_incidents')
                .join('tab_ongs', 'tab_ongs.id', '=', 'mov_incidents.ong_id')
                .limit(5)
                .offset((page - 1) * 5)
                .select([
                    'mov_incidents.*',
                    'tab_ongs.name',
                    'tab_ongs.email',
                    'tab_ongs.whatsapp',
                    'tab_ongs.city',
                    'tab_ongs.uf',
                ])
        );
    },

    //cria um incident
    async create (request, response) {
        const {
            title,
            description,
            value,
        } = request.body;

        const ong_id = request.headers.authorization;

        const [id] = await connection('mov_incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    },

    //deleta um incident de uma ong
    async delete (request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('mov_incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (incident.ong_id != ong_id) {
            return response.status(401).json({
                error: 'Operation not permitted'
            });
        }

        await connection('mov_incidents')
            .where('id', id)
            .delete();

        return response.status(204).send(); //send envia a resposta sem corpo
    }
}