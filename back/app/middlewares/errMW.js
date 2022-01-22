module.exports = {

    loginErr: (req, res, next) => {
        try {
            if (!req.body.password | !req.body.email) {
                return res.status(400).json('Veuillez renseigner vos informations de connexion !');
            }
            next();
        } catch(error) {
            return res.status(400).json(error.message);
        };
    },

    jwtErr: (req, res, next) => {
        try {
            if (!req.params.token) {
                return res.status(401).json('Token Invalide !');
            }
            next();
        } catch (error) {
            console.log(error);
            return res.status(401).json(error.message);
        };
    }
};