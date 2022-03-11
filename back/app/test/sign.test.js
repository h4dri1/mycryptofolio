const request = require('supertest')
const { app } = require('../../server')
const { redis } = require('../database')
const { faker } = require('@faker-js/faker');

let token = '';
let refreshToken = '';
let refreshTokenBl = '';

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

describe('Login Endpoints Invalid', () => {
  it('should return a response with status 400', async () => {
    const res = await request(app)
      .post('/v1/jwt/login')
      .send({
        email: '',
        password: '',
      })
      .expect("Content-Type", /json/)
    expect(res.statusCode).toEqual(400);
  }),
  it('should return a response with status 401', async () => {
    const res = await request(app)
      .post('/v1/jwt/login')
      .send({
        email: 'email@email.fr',
        password: 'password',
      })
      .expect("Content-Type", /json/)
    expect(res.statusCode).toEqual(401);
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

describe('RefreshToken Endpoints Invalid', () => {
  it('should return a response with status 404', async () => {
    const res = await request(app)
      .get(`/v1/jwt/refresh/`)
      .expect("Content-Type", /json/)
    expect(res.statusCode).toEqual(404);
  })
  it('should return a response with status 500', async () => {
    const res = await request(app)
      .get(`/v1/jwt/refresh/sdihjOIJH85sdf`)
      .expect("Content-Type", /json/)
    expect(res.statusCode).toEqual(500);
  })
});

describe('Logout Endpoints', () => {
  it('should return a response with status 200', async () => {
    const res = await request(app)
      .get(`/v1/logout/${refreshToken}`)
      .set('Authorization', `Bearer ${token}`)
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
  })
});

afterAll(async () => {
  await redis.disconnect();
});









