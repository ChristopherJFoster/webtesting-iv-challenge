exports.seed = function(knex) {
  return knex('boardgames').insert([
    { name: 'Agricola' },
    { name: 'Antiquity' },
    { name: 'Food Chain Magnate' },
    { name: 'Roads & Boats' }
  ]);
};
