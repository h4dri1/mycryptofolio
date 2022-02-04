const JWT = require('jsonwebtoken');

module.exports = {
    makeToken: (user) => {
        try {
            return JWT.sign(
                {
                    user
                },
                process.env.JWT_SECRET,
                {
                    algorithm: 'HS256',
                    expiresIn: '5min'
                }
            );
        } catch(error) {
            console.log(error);
            throw error;
        }
    },

    makeRefreshToken: (user) => {
        try {
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
        } catch(error) {
            console.log(error);
            throw error;
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
            console.log(error);
            throw error;
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
            console.log(error);
            throw error;
        }
    }
}