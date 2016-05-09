var bcrypt = require("bcrypt");

exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),

    // Inserts seed entries
    knex('users').insert({
        username: 'vjk23912',
        email: 'test@test.com',
        password: bcrypt.hashSync('test', 10)
    }),
    knex('users').insert({
        username: 'sparky',
        email: 'testy@test.com',
        password: bcrypt.hashSync('test', 10)
    })
  );
};
