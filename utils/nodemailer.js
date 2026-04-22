const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        Pass: process.env.PASSWORD
    }
});

module.exports = async (to, subject, text) => {
    await transporter.sendMail({
        to,
        subject,
        text
    });
}