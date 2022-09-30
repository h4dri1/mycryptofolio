const request = require('supertest')
const { app } = require('../server')

let token = '';

beforeAll(async () => {
  const res = await request(app)
  .post('/v1/jwt/login')
  .send({
    email: 'hadri1@ik.me',
    password: '#0clock$0087',
  })
  token = res.header.authorization
});

describe('Get Portfolio Endpoint', () => {
    it('should return a response with status 200', async () => {
        const res = await request(app)
          .get('/v1/portfolio/USD')
          .set('Authorization', `Bearer ${token}`)
          .expect("Content-Type", /json/)
      expect(res.statusCode).toEqual(200);
    })
    it('should return a response with status 498', async () => {
        const res = await request(app)
          .get('/v1/portfolio/USD')
          .expect("Content-Type", /json/)
      expect(res.statusCode).toEqual(498);
    })
});

describe('Get Portfolio Wallet Endpoint', () => {
    it('should return a response with status 200', async () => {
        const res = await request(app)
          .get('/v1/portfolio/wallet/1/USD')
          .set('Authorization', `Bearer ${token}`)
          .expect("Content-Type", /json/)
      expect(res.statusCode).toEqual(200);
    })
    it('should return a response with status 498', async () => {
        const res = await request(app)
          .get('/v1/portfolio/wallet/1/USD')
          .expect("Content-Type", /json/)
      expect(res.statusCode).toEqual(498);
    })
    it('should return a response with status 403', async () => {
        const res = await request(app)
          .get('/v1/portfolio/wallet/100/USD')
          .set('Authorization', `Bearer ${token}`)
          .expect("Content-Type", /json/)
        expect(res.statusCode).toEqual(403)
    })
});