
const request = require('supertest')
const { app } = require('../../server')
const { redis } = require('../../app/database')

let token = '';
let wallet = '';
let transaction = '';

beforeAll(async () => {
  const res = await request(app)
  .post('/v1/jwt/login')
  .send({
    email: 'test@test.fr',
    password: '#0clock$0087',
  })
  token = res.header.authorization
});

describe('Portfolio (JWT) Endpoints', () => {
  it('should return a response with status 200', async () => {
    const res = await request(app)
      .get('/v1/portfolio')
      .set('Authorization', `Bearer ${token}`)
      .expect("Content-Type", /json/)
    expect(res.statusCode).toEqual(200);
  })
});

describe('Portfolio Wallet (JWT) Endpoints', () => {
  it('should return a response with status 200', async () => {
    const res = await request(app)
      .get('/v1/portfolio/wallet/1')
      .set('Authorization', `Bearer ${token}`)
      .expect("Content-Type", /json/)
    expect(res.statusCode).toEqual(200);
  })
});

describe('Portfolio add wallet (JWT) Endpoints', () => {
  it('should return a response with status 201', async () => {
    const res = await request(app)
      .post('/v1/portfolio/wallet')
      .set('Authorization', `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .send({
        "label": 'test'
      })
    expect(res.statusCode).toEqual(201);
    wallet = res.body.id
  })
});

describe('Portfolio add transaction (JWT) Endpoints', () => {
  it('should return a response with status 201', async () => {
    const res = await request(app)
      .post(`/v1/portfolio/wallet/${wallet}/transaction`)
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
    expect(res.statusCode).toEqual(201);
    transaction = res.body.id;
  })
});

describe('Portfolio delete transaction (JWT) Endpoints', () => {
  it('should return a response with status 204', async () => {
    const res = await request(app)
      .delete(`/v1/portfolio/transaction/${transaction}`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.statusCode).toEqual(204);
  })
});

describe('Portfolio delete wallet (JWT) Endpoints', () => {
  it('should return a response with status 204', async () => {
    const res = await request(app)
      .delete(`/v1/portfolio/wallet/${wallet}`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.statusCode).toEqual(204);
  })
});

afterAll(async () => {
  await redis.disconnect();
});