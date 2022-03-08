const request = require('supertest')
const { app } = require('../../server')

describe('Login Endpoints', () => {
  it('should return a response with status 200', async () => {
    const res = await request(app)
      .post('/v1/jwt/login')
      .send({
        email: 'test@test.fr',
        password: '#0clock$0087',
      })
    expect(res.statusCode).toEqual(200);
  })
});