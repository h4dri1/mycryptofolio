const request = require('supertest');
const { app } = require('../server');

describe('Token History Endpoint', () => {
  it('should return a response with status 200', async () => {
    const res = await request(app)
      .get('/v1/tokens/history/0x0884AD41Edc3D1CA76C1584fbe53fa5B13D8E096')
      .expect('Content-Type', /json/);
    expect(res.statusCode).toEqual(200);
  });
  it('should return a response with status 404', async () => {
    const res = await request(app)
      .get('/v1/tokens/history/')
      .expect('Content-Type', /json/);
    expect(res.statusCode).toEqual(404);
  });
});

describe('Get Tokens Endpoint', () => {
  it('should return a response with status 200', async () => {
    const res = await request(app)
      .get('/v1/token/0x0884ad41edc3d1ca76c1584fbe53fa5b13d8e096/usd/0x2207eb89fc27380000/1')
      .expect('Content-Type', /json/);
    expect(res.statusCode).toEqual(200);
  });
  it('should return a response with status 404', async () => {
    const res = await request(app)
      .get('/v1/token/')
      .expect('Content-Type', /json/);
    expect(res.statusCode).toEqual(404);
  });
});

describe('Get NFT Endpoint', () => {
  it('should return a response with status 200', async () => {
    const res = await request(app)
      .get('/v1/nft/0x0884ad41edc3d1ca76c1584fbe53fa5b13d8e096/1')
      .expect('Content-Type', /json/);
    expect(res.statusCode).toEqual(200);
  });
  it('should return a response with status 404', async () => {
    const res = await request(app)
      .get('/v1/nft/1')
      .expect('Content-Type', /json/);
    expect(res.statusCode).toEqual(404);
  });
});

describe('Get ENS Endpoint', () => {
  it('should return a response with status 200', async () => {
    const res = await request(app)
      .get('/v1/ens/0x0884ad41edc3d1ca76c1584fbe53fa5b13d8e096')
      .expect('Content-Type', /json/);
    expect(res.statusCode).toEqual(200);
  });
  it('should return a response with status 404', async () => {
    const res = await request(app)
      .get('/v1/ens/')
      .expect('Content-Type', /json/);
    expect(res.statusCode).toEqual(404);
  });
});
