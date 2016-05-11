var knex = require('./knex');

function Users() {
    return knex('users');
}

function Owners() {
    return knex('owners');
}

function Decks() {
    return knex('decks');
}

module.exports = {
    Users: function() {
        return Users();
    },
    CheckUsername: function(username) {
        return Users().where('username', username);
    },
    CheckEmail: function(email) {
        return Users().where('email', email);
    },
    NewUser: function(data) {
        return Users().insert(data)
        .returning('*');
    },
    DecksForUser: function(id) {
        return Owners()
        .innerJoin('decks', 'owners.deck_id', 'decks.id').where('owners.user_id', id)
    },
    SingleDeck: function(id) {
        return Decks().where('id', id);
    }
}

