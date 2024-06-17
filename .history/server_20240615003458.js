// server.js
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "assets")));
app.use(bodyParser.json());

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/send-email", (req, res) => {
  const { from } = req.body;

  // Konfigurieren Sie den Transporter für nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail", // Sie können auch einen anderen E-Mail-Dienst verwenden
    auth: {
      user: "berlinwebentwickler@gmail.com", // Ihre E-Mail-Adresse
      pass: "Anonymer123!", // Ihr E-Mail-Passwort
    },
  });

  const mailOptions = {
    from: from,
    to: "berlinwebentwickler@gmail.com",
    subject: "Kontaktanfrage über die Website",
    text: "Bitte kontaktiere  " + from,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send({ message: "Fehler beim Senden der E-Mail." });
    } else {
      console.log("E-Mail gesendet: " + info.response);
      res.status(200).send({ message: "E-Mail erfolgreich gesendet!" });
    }
  });
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
