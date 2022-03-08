const request = require('supertest')
const { app } = require('../../config')
describe('Login Endpoints', () => {
  it('should create a new post', async () => {
    const res = await request(app)
      .post('/v1/jwt/login')
      .send({
        email: 'test@test.fr',
        password: '#0clock$0087',
      })
    expect(res.statusCode).toEqual(200);
  })
})