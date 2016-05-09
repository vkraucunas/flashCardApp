exports.up = function(knex, Promise) {
  return knex.schema.createTable('cards', function(table){
    table.increments();
    table.text('question');
    table.text('answer');
    table.integer('score').defaultTo(0);
    table.integer('deck_id').references('id').inTable('decks');
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cards');
};
