const request = require('supertest')
const { app } = require('../server')

describe('Get Fear and Greed Index Endpoint', () => {
    it('should return a response with status 200', async () => {
        const res = await request(app)
          .get('/v1/index/fearandgreed')
          .expect("Content-Type", /json/)
        expect(res.statusCode).toEqual(200);
    })
});

describe('Get Top Cryptos Endpoint', () => {
  it('should return a response with status 200', async () => {
      const res = await request(app)
        .get('/v1/cryptos/USD/10')
        .expect("Content-Type", /json/)
      expect(res.statusCode).toEqual(200);
  })
  it('should return a response with status 404', async () => {
    const res = await request(app)
      .get('/v1/cryptos/USD/ss')
      .expect("Content-Type", /json/)
    expect(res.statusCode).toEqual(404);
  })
});

describe('Get One Cryptos Endpoint', () => {
  it('should return a response with status 200', async () => {
      const res = await request(app)
        .get('/v1/crypto/matic-network/USD/1')
        .expect("Content-Type", /json/)
      expect(res.statusCode).toEqual(200);
  })
  it('should return a response with status 404', async () => {
    const res = await request(app)
      .get('/v1/crypto/dsg5')
      .expect("Content-Type", /json/)
    expect(res.statusCode).toEqual(404);
  })
});

describe('Get All Cryptos Endpoint', () => {
  it('should return a response with status 200', async () => {
      const res = await request(app)
        .get('/v1/cryptos')
        .expect("Content-Type", /json/)
      expect(res.statusCode).toEqual(200);
  })
});

describe('Get Trending Cryptos Endpoint', () => {
  it('should return a response with status 200', async () => {
      const res = await request(app)
        .get('/v1/trending')
        .expect("Content-Type", /json/)
      expect(res.statusCode).toEqual(200);
  })
});

describe('Get Global Data Endpoint', () => {
  it('should return a response with status 200', async () => {
      const res = await request(app)
        .get('/v1/global')
        .expect("Content-Type", /json/)
      expect(res.statusCode).toEqual(200);
  })
});

describe('Get Historical Data Endpoint', () => {
  it('should return a response with status 200', async () => {
      const res = await request(app)
        .get('/v1/history/matic-network/01/01/2020')
        .expect("Content-Type", /json/)
      expect(res.statusCode).toEqual(200);
  })
  it('should return a response with status 404', async () => {
    const res = await request(app)
      .get('/v1/history/matic-network/01/01/f')
      .expect("Content-Type", /json/)
    expect(res.statusCode).toEqual(404);
  })
});
