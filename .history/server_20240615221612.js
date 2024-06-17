// server.js
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require("path");
const emailjs = require("@emailjs/browser");

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

app.post("/send-email", (req, res) => {
  const { email } = req.body;
  console.log(email);
  // Konfigurieren Sie den Transporter für nodemailer

  const mailOptions = {
    from: email,
    to: "berlinwebentwickler@gmail.com",
    subject: "Kontaktanfrage über die Website",
    text: "Bitte kontaktiere  " + from,
  };
  (function () {
    emailjs.init("EVNPc5ILzdvb1fQ5O"); // Ersetzen Sie YOUR_PUBLIC_KEY durch Ihren EmailJS öffentlichen Schlüssel
  })();
  emailjs.send("service_geu705r", "template_98zaaqp", mailOptions).then(
    function (response) {
      console.log("E-Mail gesendet!", response.status, response.text);
    },
    function (error) {
      console.error("Fehler:", error);
    }
  );
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
