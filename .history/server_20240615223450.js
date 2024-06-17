// server.js
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
// MailerSend
const app = express();
const port = 3000;

app.use(express.static(__dirname + "/public"));

app.use(express.json());
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.use(express.json());
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/send-email", async (req, res) => {
  const { email } = req.body;
  // Konfigurieren Sie den Transporter für nodemailer
  try {
    const response = await axios.post(
      "https://api.mailersend.com/v1/email",
      {
        from: {
          email: "your-email@example.com",
          name: "Your Name",
        },
        to: [
          {
            email: email,
            name: "Recipient Name",
          },
        ],
        subject: "Neue Kundenanfrage",
        text: "Bitte Kunden kontaktieren " + email,
      },
      {
        headers: {
          Authorization: "Bearer mlsn.a671d13593c5c995e4335ca9aa945f8e6c5be3a9d30fa0c42d95d88bb2d988a2";
`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).send({ message: "E-Mail erfolgreich gesendet!" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Fehler beim Senden der E-Mail." });
  }
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
