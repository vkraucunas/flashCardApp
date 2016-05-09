
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('cards').del(),

    // Inserts seed entries
    knex('cards').insert({
        question: 'What does burn do?',
        answer: 'Darkens selected area',
        deck_id: 1
    }),
    knex('cards').insert({
        question: 'What are the two tools to use for color and value control?',
        answer: 'Curves and levels',
        deck_id: 1
    }),
    knex('cards').insert({
        question: 'What is GIMP?',
        answer: 'Open source photoshop',
        deck_id: 1
    }),
    knex('cards').insert({
        question: 'What does ERD stand for?',
        answer: 'Entity relationship diagram',
        deck_id: 2
    }),
    knex('cards').insert({
        question: 'What do you do to build a many to many relationship?',
        answer: 'Make a join table',
        deck_id: 2
    })
  );
};
