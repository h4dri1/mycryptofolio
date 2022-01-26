const JWT = require('jsonwebtoken');

module.exports = {
    makeToken: (userId, walletId) => {
        try {
            return JWT.sign(
                {
                    user: userId,
                    wallet: walletId
                },
                process.env.JWT_SECRET,
                {
                    algorithm: 'HS256',
                    expiresIn: '5m'
                }
            );
        } catch(error) {
            console.log(error);
            throw error;
        }
    },

    makeRefreshToken: (userId, walletId) => {
        try {
            return JWT.sign(
                {
                    user: userId,
                    wallet: walletId
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