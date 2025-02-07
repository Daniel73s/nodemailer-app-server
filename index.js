const express = require("express");
const emailHelper = require("./helpers/emailHelper");
const cors = require('cors');
const app = express();
// Configuración básica (permite todas las solicitudes)
app.use(cors());
// Middleware
app.use(express.json());

// Routes
app.post("/send-email", async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    let info = await emailHelper(to, subject, text);
    res.status(200).send(`Email sent: ${info.response}`);
  } catch (error) {
    res.status(500).send("Error sending email");
  }
});

// Start the server
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});