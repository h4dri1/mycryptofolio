const request = require('supertest')
const { app } = require('../../server')
const { redis } = require('../../app/database')

let token = '';

beforeAll(async () => {
  const res = await request(app)
  .post('/v1/jwt/login')
  .send({
    email: 'test@test.fr',
    password: '#0clock$0087',
  })
  token = res.header.authorization
});

describe('Portfolio (JWT) Endpoints Invalid', () => {
  it('should return a response with status 498', async () => {
    const res = await request(app)
      .get('/v1/portfolio')
      .expect("Content-Type", /json/)
    expect(res.statusCode).toEqual(498);
  })
  it('should return a response with status 498', async () => {
    const res = await request(app)
      .get('/v1/portfolio')
      .set('Authorization', ``)
      .expect("Content-Type", /json/)
    expect(res.statusCode).toEqual(498);
  })
  it('should return a response with status 500', async () => {
    const res = await request(app)
      .get('/v1/portfolio')
      .set('Authorization', `lisefjl`)
      .expect("Content-Type", /json/)
    expect(res.statusCode).toEqual(500);
  })
});

describe('Portfolio Wallet (JWT) Endpoints Invalid', () => {
    it('should return a response with status 404', async () => {
      const res = await request(app)
        .get('/v1/portfolio/wallet/')
        .set('Authorization', `Bearer ${token}`)
        .expect("Content-Type", /json/)
      expect(res.statusCode).toEqual(404);
    })
    it('should return a response with status 498', async () => {
        const res = await request(app)
          .get('/v1/portfolio/wallet/1')
          .set('Authorization', ``)
          .expect("Content-Type", /json/)
        expect(res.statusCode).toEqual(498);
    })
    it('should return a response with status 404', async () => {
        const res = await request(app)
          .get('/v1/portfolio/wallet/a')
          .set('Authorization', `Bearer ${token}`)
          .expect("Content-Type", /json/)
        expect(res.statusCode).toEqual(404);
    })
});
  
describe('Portfolio add wallet (JWT) Endpoints Invalid', () => {
    it('should return a response with status 498', async () => {
      const res = await request(app)
        .post('/v1/portfolio/wallet')
        .set('Authorization', ``)
        .expect("Content-Type", /json/)
        .send({
          "label": 'test'
        })
      expect(res.statusCode).toEqual(498);
    })
    it('should return a response with status 400', async () => {
        const res = await request(app)
          .post('/v1/portfolio/wallet')
          .set('Authorization', `Bearer ${token}`)
          .expect("Content-Type", /json/)
          .send({
            "label": ''
          })
        expect(res.statusCode).toEqual(400);
    })
});
  
describe('Portfolio add transaction (JWT) Endpoints Invalid', () => {
    it('should return a response with status 403', async () => {
      const res = await request(app)
        .post(`/v1/portfolio/wallet/10/transaction`)
        .set('Authorization', `Bearer ${token}`)
        .expect("Content-Type", /json/)
        .send({
          "buy": true,
          "buy_date": "Fri Jan 28 2022 15:20:46 GMT+0100",
          "coin_id": "chainlink",
          "price": 16,
          "quantity": 32.25,
          "symbol": "link"
        })
      expect(res.statusCode).toEqual(403);
    })
    it('should return a response with status 400', async () => {
        const res = await request(app)
          .post(`/v1/portfolio/wallet/1/transaction`)
          .set('Authorization', `Bearer ${token}`)
          .expect("Content-Type", /json/)
          .send({
            "buy": '',
            "buy_date": '',
            "coin_id": '',
            "price": '',
            "quantity": '',
            "symbol": ''
          })
        expect(res.statusCode).toEqual(400);
    })
    it('should return a response with status 409', async () => {
        const res = await request(app)
          .post(`/v1/portfolio/wallet/1/transaction`)
          .set('Authorization', `Bearer ${token}`)
          .expect("Content-Type", /json/)
          .send({
            "buy": false,
            "buy_date": "Fri Jan 28 2022 15:20:46 GMT+0100",
            "coin_id": "chainlink",
            "price": 16,
            "quantity": -32.25,
            "symbol": "link"
          })
        expect(res.statusCode).toEqual(409);
    })
    it('should return a response with status 409', async () => {
        const res = await request(app)
          .post(`/v1/portfolio/wallet/1/transaction`)
          .set('Authorization', `Bearer ${token}`)
          .expect("Content-Type", /json/)
          .send({
            "buy": false,
            "buy_date": "Fri Jan 28 2022 15:20:46 GMT+0100",
            "coin_id": "chainlink",
            "price": 16,
            "quantity": 32.25,
            "symbol": "link"
          })
        expect(res.statusCode).toEqual(409);
    })
});

describe('Portfolio delete transaction (JWT) Endpoints Invalid', () => {
    it('should return a response with status 404', async () => {
      const res = await request(app)
        .delete(`/v1/portfolio/transaction/`)
        .set('Authorization', `Bearer ${token}`)
      expect(res.statusCode).toEqual(404);
    })
    it('should return a response with status 404', async () => {
        const res = await request(app)
          .delete(`/v1/portfolio/transaction/`)
          .set('Authorization', ``)
        expect(res.statusCode).toEqual(404);
    })
    it('should return a response with status 403', async () => {
        const res = await request(app)
          .delete(`/v1/portfolio/transaction/4`)
          .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toEqual(403);
    })
});
  
describe('Portfolio delete wallet (JWT) Endpoints Invalid', () => {
    it('should return a response with status 404', async () => {
      const res = await request(app)
        .delete(`/v1/portfolio/wallet/`)
        .set('Authorization', `Bearer ${token}`)
      expect(res.statusCode).toEqual(404);
    })
    it('should return a response with status 403', async () => {
        const res = await request(app)
          .delete(`/v1/portfolio/wallet/5`)
          .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toEqual(403);
    })
});

afterAll(async () => {
  await redis.disconnect();
});