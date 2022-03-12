const request = require('supertest')
const { app } = require('../../../server')
const { redis } = require('../../database')

describe('Top Cryptos Endpoints', () => {
    it('should return a response with status 200', async () => {
      const res = await request(app)
        .get('/v1/cryptos/usd/1')
        .expect("Content-Type", /json/)
      expect(res.statusCode).toEqual(200);
    })
  });
  
  describe('Get one crypto Endpoints', () => {
    it('should return a response with status 200', async () => {
      const res = await request(app)
        .get('/v1/crypto/bitcoin')
        .expect("Content-Type", /json/)
      expect(res.statusCode).toEqual(200);
    })
  });
  
  describe('Get all cryptos Endpoints', () => {
    it('should return a response with status 200', async () => {
      const res = await request(app)
        .get('/v1/cryptos')
        .expect("Content-Type", /json/)
      expect(res.statusCode).toEqual(200);
    })
  });
  
  describe('Top trending cryptos Endpoints', () => {
    it('should return a response with status 200', async () => {
      const res = await request(app)
        .get('/v1/trending')
        .expect("Content-Type", /json/)
      expect(res.statusCode).toEqual(200);
    })
  });
  
  describe('Global cryptos info Endpoints', () => {
    it('should return a response with status 200', async () => {
      const res = await request(app)
        .get('/v1/global')
        .expect("Content-Type", /json/)
      expect(res.statusCode).toEqual(200);
    })
  });
  
  describe('Histroy price one Cryptos Endpoints', () => {
    it('should return a response with status 200', async () => {
      const res = await request(app)
        .get('/v1/history/bitcoin/03-01-2018')
        .expect("Content-Type", /json/)
      expect(res.statusCode).toEqual(200);
    })
  });
  
  describe('Global cryptos info Endpoints', () => {
    it('should return a response with status 200', async () => {
      const res = await request(app)
        .get('/v1/cryptoprice/bitcoin/usd/false/false/false/false')
        .expect("Content-Type", /json/)
      expect(res.statusCode).toEqual(200);
    })
  });

  afterAll(async () => {
    await redis.disconnect();
  });