const request = require('supertest');

const server = require('./server');
const db = require('../data/dbConfig');

describe('server.js', () => {
  beforeEach(async () => {
    await db('boardgames').truncate();
  });

  describe('GET /', () => {
    it('status code should be 200 OK', async () => {
      const res = await request(server).get('/');
      expect(res.status).toBe(200);
    });
    it('res.type should be JSON', async () => {
      const res = await request(server).get('/');
      expect(res.type).toBe('application/json');
    });
    it("res.body should equal { api: 'running...' }", async () => {
      const res = await request(server).get('/');
      expect(res.body).toEqual({ api: 'running...' });
    });
  });

  describe('POST /', () => {
    it('status code should be 201 Created', async () => {
      const res = await request(server)
        .post('/')
        .send({ name: 'Indonesia' });
      expect(res.status).toBe(201);
    });
    it('res.type should be JSON', async () => {
      const res = await request(server)
        .post('/')
        .send({ name: 'Indonesia' });
      expect(res.type).toBe('application/json');
    });
    it("res.body should equal { id: 1, name: 'Indonesia' }", async () => {
      const res = await request(server)
        .post('/')
        .send({ name: 'Indonesia' });
      expect(res.body).toEqual({ id: 1, name: 'Indonesia' });
    });

    it('status code should be 400 if no name is sent', async () => {
      const res = await request(server).post('/');
      expect(res.status).toBe(400);
    });
  });

  describe('DELETE /:id', () => {
    beforeEach(async () => {
      await db('boardgames').insert({ name: 'Indonesia' });
      await db('boardgames').insert({ name: 'Le Havre' });
    });

    it('status code should be 200 OK', async () => {
      const res = await request(server).delete('/1');
      expect(res.status).toBe(200);
    });

    it('boardgames table length should be 1', async () => {
      const res = await request(server).delete('/1');
      expect(res.body.message).toBe('Boardgame successfully deleted.');
    });

    it('status code should be 404 if nonexistent ID passed in', async () => {
      const res = await request(server).delete('/200');
      expect(res.status).toBe(404);
    });
  });
});
