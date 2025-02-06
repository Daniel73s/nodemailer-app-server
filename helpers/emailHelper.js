const nodemailer = require("nodemailer");
require('dotenv').config();
const emailHelper = async (to, subject, text) => {
    // Create a transporter
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.KEYSMTP,
        },
    });

    // Contenido HTML del correo
    const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Correo Estilizado</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #007BFF;
    }
    p {
      line-height: 1.6;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #007BFF;
      color: #fff;
      text-decoration: none;
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>¡Hola!</h1>
    <p>${text}</p>
    <p>Servidor de prueba</p>
    <a href="https://example.com" class="button">Visitar Web</a>
  </div>
</body>
</html>
`;
    // Set up email options
    let mailOptions = {
        from: '"Ing. Daniel Luque" <daniel.luque.tja@gmail.com>',
        to: to,
        subject: subject,
        html: htmlContent
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

module.exports = emailHelper;