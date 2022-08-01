const nodemailer = require("nodemailer");

require('dotenv').config();

module.exports = {
    sendMail: async (req, res, next) => {
        try {
            let transporter = nodemailer.createTransport({
                host: `${process.env.SMTP_HOST}`,
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: `${process.env.MAIL_USER}`, // generated ethereal user
                    pass: `${process.env.MAIL_PASS}`, // generated ethereal password
                },
            });
            
            let info = await transporter.sendMail({
                from: '"noresponse@mycryptofolio.fr 👻" <mycryptofol.io@ik.me>', // sender address
                to: req.body.email, // list of receivers
                subject: "Reset Password", // Subject line
                text: "Follow this link for choose a new password", // plain text body
                html: `<b>Follow this link for choose a new password <a href="https://mycryptofolio.fr/reset/${req.token}">Reset Password</a> it will be active during 10 minutes</b>`, // html body
            });
        
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        }
        catch (err) { 
            next(err);
        }
    },

    sendMailCheck: async (req, res, next) => {
        try {
            let transporter = nodemailer.createTransport({
                host: `${process.env.SMTP_HOST}`,
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: `${process.env.MAIL_USER}`, // generated ethereal user
                    pass: `${process.env.MAIL_PASS}`, // generated ethereal password
                },
            });
            
            let info = await transporter.sendMail({
                from: '"donotreply@mycryptofolio.fr 👻" <mycryptofol.io@ik.me>', // sender address
                to: req.body.email, // list of receivers
                subject: "Verify Email", // Subject line
                text: "Follow this link for validate your email", // plain text body
                html: `<b>Follow this link for validate your email <a href="https://mycryptofolio.fr/v1/verify/${req.token}">Verify</a> it will be active during 10 minutes</b>`, // html body
            });
        
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        }
        catch (err) { 
            next(err);
        }
    }
}
