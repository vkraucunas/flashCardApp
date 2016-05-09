exports.up = function(knex, Promise) {
  return knex.schema.createTable('owners', function(table){
    table.integer('user_id').references('id').inTable('users');
    table.integer('deck_id').references('id').inTable('decks');
    table.boolean('owner').defaultTo(true);
    table.boolean('cloned').defaultTo(false);
    table.boolean('watched').defaultTo(false);
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('owners');
};