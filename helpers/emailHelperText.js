const nodemailer = require("nodemailer");
require('dotenv').config();
const emailHelperText = async (to, subject, text) => {
    // Create a transporter
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.KEYSMTP,
        },
    });

    // Set up email options
    let mailOptions = {
        from: '"Ing. Daniel Luque" <daniel.luque.tja@gmail.com>',
        to: to,
        subject: subject,
        text: text
    };

    // Send the email
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};

module.exports = emailHelperText;