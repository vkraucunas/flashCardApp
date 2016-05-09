
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('owners').del(),

    // Inserts seed entries
    knex('owners').insert({
        user_id: 1,
        deck_id: 1
    }),
    knex('owners').insert({
        user_id: 1,
        deck_id: 2,
        owner: false,
        watched: true
    }),
    knex('owners').insert({
        user_id: 2,
        deck_id: 2
    })
  );
};
