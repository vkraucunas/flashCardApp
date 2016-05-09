var knex = require('./knex');

function Users() {
    return knex('users');
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
    }
}

