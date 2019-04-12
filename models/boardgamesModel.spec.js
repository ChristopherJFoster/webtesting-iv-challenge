const db = require('../data/dbConfig');

const Boardgames = require('./boardgamesModel');

describe('boardgames model', () => {
  beforeEach(async () => {
    await db('boardgames').truncate();
  });
  afterEach(async () => {
    await db('boardgames').truncate();
  });

  describe('insert()', () => {
    it('should insert the provided boardgame - array length check', async () => {
      let boardgames = await db('boardgames');

      await Boardgames.insert({ name: 'Indonesia' });

      boardgames = await db('boardgames');
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
    // Yes, it seems the wider-scope beforeEach() on line 6 runs first, then this beforeEach() (only inside this remove() block)
    // beforeEach(async () => {
    //   // await Boardgames.insert({ name: 'Indonesia' });
    //   // await Boardgames.insert({ name: 'Le Havre' });
    // });

    it('should remove the boardgame with the provided id - array length check', async () => {
      await Boardgames.insert({ name: 'Indonesia' });
      await Boardgames.insert({ name: 'Le Havre' });
      let boardgames = await db('boardgames');
      console.log(boardgames);
      expect(boardgames).toHaveLength(2);
      await Boardgames.remove(1);
      boardgames = await db('boardgames');
      expect(boardgames).toHaveLength(1);
    });

    it('should remove the provided boardgame - getting the game by id should fail', async () => {
      await Boardgames.insert({ name: 'Indonesia' });
      await Boardgames.insert({ name: 'Le Havre' });
      let boardgames = await db('boardgames');
      expect(boardgames).toHaveLength(2);
      await Boardgames.remove(2);
      boardgames = await db('boardgames')
        .where({ id: 2 })
        .first();
      expect(boardgames).toBe(undefined);
    });
  });
});
