const nodemailer = require("nodemailer");

require('dotenv').config();

module.exports = {
    sendMail: async (req, res, next) => {
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
                from: '"noresponse@mycryptofolio.fr 👻" <hadri1@ik.me>', // sender address
                to: req.body.email, // list of receivers
                subject: "Reset Password", // Subject line
                text: "Follow this link for choose a new password", // plain text body
                html: `<b>Follow this link for choose a new password <a href="https://mycryptofolio.fr/reset/${req.token}">Reset Password</a></b>`, // html body
            });
        
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        }
        catch (err) {
            next(err);
        }
    }
}
