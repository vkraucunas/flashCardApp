var express = require('express');
var router = express.Router();
var queries = require('../db/queries.js');


router.get('/decks/:id', function(req, res, next) {
    queries.DecksForUser(req.params.id)
    .then(function(decks) {
        res.status(200).json({
            decks: decks
        })
    })
});

router.get('/deck/:id', function(req, res, next) {
    queries.SingleDeck(req.params.id)
    .then(function(deck) {
        res.status(200).json({
            deck: deck
        })
    })
})

module.exports = router;
