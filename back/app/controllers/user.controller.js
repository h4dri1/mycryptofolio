const { userService } = require('../services');

module.exports = {
    login: async (req, res, next) => {
        try {
            const user = await userService.login(req, res, next);
            res.status(200).json(user);
        } catch (err) {
            next(err)
        };
    },

    addUser: async (req, res, next) => {
        try {
            const user = await userService.addUser(req, res, next);
            res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    },

    verifyEmail: async (req, res, next) => {
        try {
            const verify = await userService.verifyEmail(req, res, next);
            if (verify) {
                res.status(200).redirect('https://mycryptofolio.fr/login');
            } else {
                res.status(500).json('Token invalide');
            }
         } catch (err) {
             next(err);
         }
    },

    resendMail: async (req, res, next) => {
        try {
            const user = await userService.resendMail(req, res, next);
            if (user) {
                res.status(200).redirect('https://mycryptofolio.fr/login');
            }
        } catch (err) {
            next(err);
        }
    },
    
    forgotPassword: async (req, res, next) => {
        try {
            const user = await userService.forgotPassword(req, res, next);
            res.status(201).json(user);
        } catch (err) {
            next(err);
        }
    },

    modifyUser: async (req, res, next) => {
        try {
            const user = await userService.modifyUser(req, res, next);
            res.status(201).json(user.message);
        } catch(err) {
            next(err);
        }
    },

    modifyPassword: async (req, res, next) => {
        try {
            const user = await userService.modifyPassword(req, res, next);
            return res.status('201').json(user);
        } catch(err) {
            next(err);
        }
    },

    modifyPasswordForgot: async (req, res, next) => {
        try {
            const user = await userService.modifyPasswordForgot(req, res, next);
            return res.status('201').json(user);
        } catch(err) {
            next(err);
        }
    },

    modifyAvatar: async (req, res, next) => {
        try {
            const avatar = await userService.modifyAvatar(req, res, next);
            return res.status(201).json(avatar.status);
        } catch(err) {
            next(err);
        } 
    },

    deleteUser: async (req, res, next) => {
        try {
            const user = await userService.deleteUser(req, res, next);
            return res.status(201).json(user);
        } catch(err) {
            next(err);
        }
    }
};