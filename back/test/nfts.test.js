const request = require('supertest')
const { app } = require('../server')

describe('Get NFT collection Endpoint', () => {
    it('should return a response with status 200', async () => {
        const res = await request(app)
          .get('/v1/nftcollections/cryptopunks')
          .expect("Content-Type", /json/)
        expect(res.statusCode).toEqual(200);
    })
    it('should return a response with status 404', async () => {
      const res = await request(app)
        .get('/v1/nftcollections')
        .expect("Content-Type", /json/)
      expect(res.statusCode).toEqual(404);
    })
});

describe('Get Top NFT Endpoint', () => {
    it('should return a response with status 200', async () => {
        const res = await request(app)
          .get('/v1/nfts/top/5')
          .expect("Content-Type", /json/)
        expect(res.statusCode).toEqual(200);
    })
    it('should return a response with status 404', async () => {
      const res = await request(app)
        .get('/v1/nfts/top/a')
        .expect("Content-Type", /json/)
      expect(res.statusCode).toEqual(404);
    })
});