const JWT = require('jsonwebtoken');

module.exports = {
    makeToken: (user) => {
        return JWT.sign(
            {
                user
            },
            process.env.JWT_SECRET,
            {
                algorithm: 'HS256',
                expiresIn: '1min'
            }
        );
    },

    makeRefreshToken: (user) => {
        return JWT.sign(
            {
                user
            },
            process.env.JWT_SECRET_REFRESH,
            {
                algorithm: 'HS256',
                expiresIn: '30d'
            }
        );
    },

    validateToken: token => {
        return JWT.verify(
            token,
            process.env.JWT_SECRET,
            {
                algorithms: ['HS256']
            }
        );
    },

    validateRefreshToken: token => {
        return JWT.verify(
            token,
            process.env.JWT_SECRET_REFRESH,
            {
                algorithms: ['HS256']
            }
        );
    },
}