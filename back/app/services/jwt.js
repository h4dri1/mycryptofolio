const JWT = require('jsonwebtoken');

module.exports = {
    makeToken: userId => {
        try {
            return JWT.sign(
                {
                    data: userId
                },
                process.env.JWT_SECRET,
                {
                    algorithm: 'HS256',
                    expiresIn: '5m'
                }
            );
        } catch(error) {
             throw error.name;
        }
    },

    makeRefreshToken: userId => {
        try {
            return JWT.sign(
                {
                    data: userId
                },
                process.env.JWT_SECRET_REFRESH,
                {
                    algorithm: 'HS256',
                    expiresIn: '30d'
                }
            );
        } catch(error) {
            throw error.name;
        }
    },

    validateToken: token => {
        try {
            return JWT.verify(
                token,
                process.env.JWT_SECRET,
                {
                    algorithms: ['HS256']
                }
            );
        } catch(error) {
            throw error.name;
        }
    },

    validateRefreshToken: token => {
        try {
            return JWT.verify(
                token,
                process.env.JWT_SECRET_REFRESH,
                {
                    algorithms: ['HS256']
                }
            );
        } catch(error) {
            throw error.name;
        }
    }
}