const db = require('../data/dbConfig');

const Boardgames = require('./boardgamesModel');

describe('boardgames model', () => {
  // Clears boardgames table before each test
  beforeEach(async () => {
    await db('boardgames').truncate();
  });

  describe('insert()', () => {
    it('should insert the provided boardgame - array length check', async () => {
      await Boardgames.insert({ name: 'Indonesia' });
      const boardgames = await db('boardgames');
      expect(boardgames).toHaveLength(1);
    });

    it('should insert the provided boardgame - name property check', async () => {
      let boardgame = await Boardgames.insert({ name: 'Indonesia' });
      expect(boardgame.name).toBe('Indonesia');
      boardgame = await Boardgames.insert({ name: 'Le Havre' });
      expect(boardgame.name).toBe('Le Havre');
    });
  });

  describe('remove()', () => {
    // Inserts 2 boardgames into boardgames table to test deletion
    // (I think this will stack with the other beforeEach(), but I'll check to be sure)
    beforeEach(async () => {
      await Boardgames.insert({ name: 'Indonesia' });
      await Boardgames.insert({ name: 'Le Havre' });
    });

    it('should remove the boardgame with the provided id - array length check', async () => {
      await Boardgames.remove(1);
      const boardgames = await db('boardgames');
      expect(boardgames).toHaveLength(1);
    });

    it('should remove the provided boardgame - name property check', async () => {
      await Boardgames.remove(2);
      const boardgames = await Boardgames.findById(2);
      expect(boardgames).toHaveLength(0);
    });
  });
});
