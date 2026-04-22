const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { process.env.EMAIL,
    password: process.env.PASSWORD

    }
});

module.exports = async (to, subject, text) => {
    await transporter.sendMail({
        to,
        subject,
        text
    });
}