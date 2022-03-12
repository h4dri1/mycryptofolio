const request = require('supertest')
const { app } = require('../../server')
const { redis } = require('../../app/database')

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

describe('Logout Endpoints Invalid', () => {
    it('should return a response with status 498', async () => {
        const res = await request(app)
        .get(`/v1/logout/${refreshToken}`)
        .expect("Content-Type", /json/)
        expect(res.statusCode).toEqual(498);
    })
    it('should return a response with status 404', async () => {
        const res = await request(app)
        .get(`/v1/logout/`)
        .set('Authorization', `Bearer ${token}`)
        .expect("Content-Type", /json/)
        expect(res.statusCode).toEqual(404);
    })
});

afterAll(async () => {
    await redis.disconnect();
});