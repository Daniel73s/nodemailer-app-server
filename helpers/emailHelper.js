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
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmación de Reserva</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            background-color: #ffffff;
            margin: 20px auto;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #0073e6;
            color: #ffffff;
            text-align: center;
            padding: 15px;
            font-size: 20px;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
        }
        .content {
            padding: 20px;
            font-size: 16px;
            color: #333;
            box-shadow: inset 0px 2px 5px rgba(0, 0, 0, 0.05);
        }
        .content p {
            margin: 10px 0;
        }
        .footer {
            text-align: center;
            font-size: 14px;
            color: #666;
            padding: 10px;
            border-top: 1px solid #ddd;
            margin-top: 10px;
            box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.05);
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">Confirmación de Reserva</div>
        <div class="content">
            <p><strong>Nombre Completo:</strong> [Nombre Completo]</p>
            <p><strong>Correo Electrónico:</strong> [Correo]</p>
            <p><strong>Número de Celular:</strong> [Número de Celular]</p>
            <p><strong>Número de Sillas:</strong> [Número de Sillas]</p>
            <p><strong>Fecha:</strong> [Fecha]</p>
            <p><strong>Tipo de Reserva:</strong> [Cena/Desayuno/Almuerzo]</p>
            <p><strong>Mensaje:</strong> [Mensaje]</p>
        </div>
        <div class="footer">Reserva Recibida</div>
    </div>
</body>
</html>

`;
    // Set up email options
    let mailOptions = {
        from: '"Ing. Daniel Luque" <daniel.luque.tja@gmail.com>',
        to: to,
        subject: subject,
        html: text
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