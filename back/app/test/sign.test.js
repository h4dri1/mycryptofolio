const request = require('supertest')
const { app } = require('../../server')
const { redis } = require('../database')
const { faker } = require('@faker-js/faker');

describe('Login Endpoints', () => {
  it('should return a response with status 200', async () => {
    const res = await request(app)
      .post('/v1/jwt/login')
      .send({
        email: 'test@test.fr',
        password: '#0clock$0087',
      })
      .expect("Content-Type", /json/)
    expect(res.statusCode).toEqual(200);
  })
});

describe('Signup Endpoints', () => {
  it('should return a response with status 201', async () => {
    const res = await request(app)
      .post('/v1/signup')
      .expect("Content-Type", /json/)
      .send({
        email: faker.internet.email(),
        nickname: faker.random.word(),
        password: '#dkddpp$0087Hkjhkk',
        passwordCheck: '#dkddpp$0087Hkjhkk',
        picture: 'picture'
      })
    expect(res.statusCode).toEqual(201);
    await redis.disconnect();
  })
});









