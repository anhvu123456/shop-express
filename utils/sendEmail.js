
var nodemailer = require("nodemailer");
var sendMail = async (email, subject, text) => {
    try {
        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            service: "gmail",
            post: 465,
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendMail;
