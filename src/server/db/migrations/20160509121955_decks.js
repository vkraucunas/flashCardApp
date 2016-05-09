exports.up = function(knex, Promise) {
  return knex.schema.createTable('decks', function(table){
    table.increments();
    table.string('deck_name');
    table.string('deck_img').defaultTo('https://upload.wikimedia.org/wikipedia/en/8/83/Strong_Bad.png');
    table.text('deck_descript');
    table.date('create_date');
    table.date('update_date');
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('decks');
};
