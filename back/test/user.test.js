const request = require('supertest')
const { app } = require('../server')
const { redis } = require('../app/database')
const { faker } = require('@faker-js/faker');
require('dotenv').config()

let token = '';
let refreshToken = '';

beforeAll(async () => {
  const res = await request(app)
  .post('/v1/jwt/login')
  .send({
    email: process.env.TEST_MAIL,
    password: process.env.TEST_PASSWORD,
  })
  token = res.header.authorization
  refreshToken = res.body.refreshToken
});

describe('Login Endpoints', () => {
    it('should return a response with status 200', async () => {
      const res = await request(app)
        .post('/v1/jwt/login')
        .send({
          email: 'hadri1@ik.me',
          password: '#0clock$0087',
        })
        .expect("Content-Type", /json/)
      expect(res.statusCode).toEqual(200);
    })
    it('should return a response with status 401', async () => {
        const res = await request(app)
          .post('/v1/jwt/login')
          .send({
            email: 'hadri1@ik.me',
            password: '#0clock$',
          })
          .expect("Content-Type", /json/)
        expect(res.statusCode).toEqual(401);
    })
  });

describe('RefreshToken Endpoints', () => {
  it('should return a response with status 201', async () => {
    const res = await request(app)
      .get(`/v1/jwt/refresh/${refreshToken}`)
      .expect("Content-Type", /json/)
    expect(res.statusCode).toEqual(201);
  })
  it('should return a response with status 500', async () => {
    const res = await request(app)
      .get(`/v1/jwt/refresh/silkhs`)
      .expect("Content-Type", /json/)
    expect(res.statusCode).toEqual(500);
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
