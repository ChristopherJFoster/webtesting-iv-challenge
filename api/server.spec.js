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
  });

  describe('DELETE /', () => {
    it('status code should be 202 Accepted', async () => {
      const res = await request(server).delete('/1');
      expect(res.status).toBe(202);
    });

    it('boardgames table length should be 1', async () => {
      const res = await request(server).delete('/1');
      expect(res.body).toHaveLength(1);
    });
  });
});
