const express = require("express");
const emailHelper = require("./helpers/emailHelper");
const cors = require('cors');
const emailHelperText = require("./helpers/emailHelperText");
const app = express();
// Configuración básica (permite todas las solicitudes)
// Configura CORS para permitir solo un dominio específico
const corsOptions = {
  origin: 'https://duodigitalweb.com', // Reemplaza con tu dominio
  optionsSuccessStatus: 200, // Algunos navegadores antiguos (IE11) requieren esto
};
app.use(cors(corsOptions));
// Middleware
app.use(express.json());

// Routes
app.post("/send-email-html", async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    let info = await emailHelper(to, subject, text);
    res.status(200).json({
      message:`Email enviado: ${info.response}`
    });
  } catch (error) {
    res.status(500).send("Error sending email");
  }
});

app.post("/send-email-text", async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    let info = await emailHelperText(to, subject, text);
    res.status(200).json({
      message:`Email enviado: ${info.response}`
    });
  } catch (error) {
    res.status(500).send("Error sending email");
  }
});

// Start the server
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});