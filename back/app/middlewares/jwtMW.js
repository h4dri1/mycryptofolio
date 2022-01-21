const jwt = require('../services/jwt');

module.exports = (req, res, next) => {
    try {
        let token = req.headers['authorization'];
        console.log(token);
        if (!token) {
            return res.status(401).json('Invalid token');
        }
        const payload = jwt.validateToken(token);
        console.log(payload);
        if (!payload.data) {
            return res.status(401).json('Invalid token');
        }
        next();
    } catch(error) {
        console.log(error);
        res.status(401).json(error.message);
    }
}