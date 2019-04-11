const express = require('express');

const Boardgames = require('../models/boardgamesModel');

const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
  res.status(200).json({ api: 'running...' });
});

server.post('/', async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({
      error: 'Please provide a boardgame name.'
    });
  } else {
    try {
      const addedBoardgame = await Boardgames.insert({ name });
      res.status(201).json(addedBoardgame);
    } catch (err) {
      res.status(500).json({
        error: `There was an error while adding the boardgame data. ${err}`
      });
    }
  }
});

server.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const boardgames = await Boardgames.remove({ id });
    if (boardgames.length === 2) {
      res
        .status(404)
        .json({ error: 'The boardgame with the specified ID does not exist.' });
    } else {
      res.status(200).json({ message: 'Boardgame successfully deleted.' });
    }
  } catch (err) {
    res.status(500).json({
      error: `There was an error while deleting the boardgame data. ${err}`
    });
  }
});

module.exports = server;
