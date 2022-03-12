const request = require('supertest')
const { app } = require('../../../server')
const { redis } = require('../../database')
const { faker } = require('@faker-js/faker');

let token = '';
let refreshToken = '';

beforeAll(async () => {
  const res = await request(app)
  .post('/v1/jwt/login')
  .send({
    email: 'test@test.fr',
    password: '#0clock$0087',
  })
  token = res.header.authorization
  refreshToken = res.body.refreshToken
});

describe('Login Endpoints Valid', () => {
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

describe('RefreshToken Endpoints Valid', () => {
  it('should return a response with status 200', async () => {
    const res = await request(app)
      .get(`/v1/jwt/refresh/${refreshToken}`)
      .expect("Content-Type", /json/)
    expect(res.statusCode).toEqual(200);
  })
});

describe('Logout Endpoints Valid', () => {
  it('should return a response with status 200', async () => {
    const res = await request(app)
      .get(`/v1/logout/${refreshToken}`)
      .set('Authorization', `Bearer ${token}`)
      .expect("Content-Type", /json/)
    expect(res.statusCode).toEqual(200);
  })
});

describe('Signup Endpoints Valid', () => {
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
  })
});

describe('Signup Endpoints Invalid', () => {
  it('should return a response with status 400', async () => {
    const res = await request(app)
      .post('/v1/signup')
      .expect("Content-Type", /json/)
      .send({
        email: '',
        nickname: '',
        password: '',
        passwordCheck: '',
        picture: ''
      })
    expect(res.statusCode).toEqual(400);
  })
});

afterAll(async () => {
  await redis.disconnect();
});









