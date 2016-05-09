
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('decks').del(),

    // Inserts seed entries
    knex('decks').insert({
        deck_name: 'GIMP 101',
        deck_img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/The_GIMP_icon_-_gnome.svg/1000px-The_GIMP_icon_-_gnome.svg.png',
        deck_descript: 'Pepper jack cheesecake blue castello. Blue castello fromage camembert de normandie mascarpone mascarpone blue castello taleggio croque monsieur. Swiss bocconcini pepper jack mozzarella st. agur blue cheese parmesan mascarpone cheddar. Cow cheese triangles edam rubber cheese pepper jack gouda stinking bishop.',
        create_date: new Date("Mar 25 2016")
    }),
    knex('decks').insert({
        deck_name: 'ERD Building',
        deck_descript: 'Blue castello fromage camembert de normandie mascarpone mascarpone blue castello taleggio croque monsieur. Swiss bocconcini pepper jack mozzarella st. agur blue cheese parmesan mascarpone cheddar. Cow cheese triangles edam rubber cheese pepper jack gouda stinking bishop.',
        create_date: new Date("May 8 2016")
    })
  );
};
