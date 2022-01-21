module.exports = (req, res, next) => {
    try {
        if (!req.body.password) {
            return res.status(400).json('Veuillez renseigner un mot de passe !')
        }
        if (!req.body.email) {
            return res.status(400).json(`Veuillez renseigner un nom d'utilisateur !`)
        }
        next();
    } catch(error) {
        if (error.detail) {
            throw new Error(error.detail);
         }
         throw error;
    }
}