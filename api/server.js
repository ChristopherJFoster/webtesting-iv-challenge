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
      error: 'Please provide a dish name.'
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

module.exports = server;
