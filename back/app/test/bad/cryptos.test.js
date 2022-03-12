const request = require('supertest')
const { app } = require('../../../server')
const { redis } = require('../../database')

describe('Top Cryptos Endpoints Invalid', () => {
    it('should return a response with status 404', async () => {
      const res = await request(app)
        .get('/v1/cryptos/usd')
        .expect("Content-Type", /json/)
      expect(res.statusCode).toEqual(404);
    })
    it('should return a response with status 404', async () => {
        const res = await request(app)
          .get('/v1/cryptos/usd/xxx')
          .expect("Content-Type", /json/)
        expect(res.statusCode).toEqual(404);
      })
});
  
describe('Get one crypto Endpoints Invalid', () => {
    it('should return a response with status 404', async () => {
      const res = await request(app)
        .get('/v1/crypto/')
        .expect("Content-Type", /json/)
      expect(res.statusCode).toEqual(404);
    })
    it('should return a response with status 404', async () => {
        const res = await request(app)
          .get('/v1/crypto/bitcoin/aa')
          .expect("Content-Type", /json/)
        expect(res.statusCode).toEqual(404);
    })
});
  
describe('Histroy price one Cryptos Endpoints Invalid', () => {
    it('should return a response with status 404', async () => {
      const res = await request(app)
        .get('/v1/history/')
        .expect("Content-Type", /json/)
      expect(res.statusCode).toEqual(404);
    })
});
  
describe('Global cryptos info Endpoints Invalid', () => {
    it('should return a response with status 404', async () => {
      const res = await request(app)
        .get('/v1/cryptoprice/1')
        .expect("Content-Type", /json/)
      expect(res.statusCode).toEqual(404);
    })
});

afterAll(async () => {
    await redis.disconnect();
});