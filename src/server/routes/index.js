var express = require('express');
var router = express.Router();
var queries = require('../db/queries.js');


router.get('/decks/:id', function(req, res, next) {
    console.log('hey!', req.params.id);
    queries.DecksForUser(req.params.id)
    .then(function(decks) {
        res.status(200).json({
            decks: decks
        })
    })
});

module.exports = router;
