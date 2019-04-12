const db = require('../data/dbConfig');

module.exports = {
  insert,
  remove,
  getAll
};

async function insert(boardgame) {
  const [id] = await db('boardgames').insert(boardgame);
  return db('boardgames')
    .where({ id })
    .first();
}

function remove(id) {
  return db('boardgames')
    .where({ id })
    .del();
}

function getAll() {
  return db('boardgames');
}
