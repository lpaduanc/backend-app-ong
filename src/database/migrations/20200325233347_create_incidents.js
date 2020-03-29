
exports.up = function(knex) {
    return knex.schema.createTable('mov_incidents', function(table){
        table.increments();

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('ong_id').notNullable();

        // criação de chave estrangeira
        table.foreign('ong_id').references('id').inTable('tab_ongs');
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('mov_incidents');
};
