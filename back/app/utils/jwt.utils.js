const JWT = require('jsonwebtoken');

module.exports = {
  makeToken: (user) => JWT.sign(
    {
      user,
    },
    process.env.JWT_SECRET,
    {
      algorithm: 'HS256',
      expiresIn: '1min',
    },
  ),

  makeRefreshToken: (user) => JWT.sign(
    {
      user,
    },
    process.env.JWT_SECRET_REFRESH,
    {
      algorithm: 'HS256',
      expiresIn: '30d',
    },
  ),

  validateToken: (token) => JWT.verify(
    token,
    process.env.JWT_SECRET,
    {
      algorithms: ['HS256'],
    },
  ),

  validateRefreshToken: (token) => JWT.verify(
    token,
    process.env.JWT_SECRET_REFRESH,
    {
      algorithms: ['HS256'],
    },
  ),
};
