const request = require('supertest')
const { app } = require('../server')

let token = '';
let transaction = '';

beforeAll(async () => {
  const res = await request(app)
  .post('/v1/jwt/login')
  .send({
    email: process.env.TEST_EMAIL,
    password: process.env.TEST_PASSWORD,
  })
  token = res.header.authorization
});

describe('Portfolio add and modify transaction Endpoints', () => {
    it('should return a response with status 201', async () => {
      const res = await request(app)
        .post(`/v1/portfolio/wallet/1/transaction`)
        .set('Authorization', `Bearer ${token}`)
        .expect("Content-Type", /json/)
        .send({
          "buy": true,
          "buy_date": "Fri Jan 28 2022 15:20:46 GMT+0100",
          "coin_id": "chainlink",
          "price": 16,
          "quantity": 32.25,
          "symbol": "link",
          "fiat": "usd"
        })
      expect(res.statusCode).toEqual(201);
      transaction = res.body.id;
    })
    it('should return a response with status 204', async () => {
        const res = await request(app)
          .post(`/v1/portfolio/wallet/1/transaction`)
          .set('Authorization', `Bearer ${token}`)
          .send({
            "id": transaction,
            "buy": true,
            "buy_date": "Fri Jan 28 2022 15:20:46 GMT+0100",
            "coin_id": "chainlink",
            "price": 20,
            "quantity": 32.25,
            "symbol": "link",
            "fiat": "usd"
          })
        expect(res.statusCode).toEqual(204);
      })
  });

  describe('Portfolio delete transaction Endpoints', () => {
    it('should return a response with status 204', async () => {
      const res = await request(app)
        .delete(`/v1/portfolio/transaction/${transaction}`)
        .set('Authorization', `Bearer ${token}`)
      expect(res.statusCode).toEqual(204);
    })
  });