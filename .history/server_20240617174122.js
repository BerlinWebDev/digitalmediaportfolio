// server.js
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const emailjs = require("@emailjs/browser");
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
    const mailjet = require("node-mailjet").connect(
      process.env.MJ_APIKEY_PUBLIC,
      process.env.MJ_APIKEY_PRIVATE
    );
    const request = mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: process.env.MJ_SENDER_EMAIL,
            Name: "Me",
          },
          To: [
            {
              Email: email,
              Name: "You",
            },
          ],
          Subject: "My first Mailjet Email!",
          TextPart: "Greetings from Mailjet!",
          HTMLPart:
            '<h3>Dear passenger 1, welcome to <a href="https://www.mailjet.com/">Mailjet</a>!</h3><br />May the delivery force be with you!',
        },
      ],
    });
    request
      .then((result) => {
        console.log(result.body);
      })
      .catch((err) => {
        console.log(err.statusCode);
      });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Fehler beim Senden der E-Mail." });
  }

  /**

    axios
      .post("https://api.emailjs.com/api/v1.0/email/send", data)
      .then(function (response) {
        console.log("E-Mail gesendet: " + response.data.message);
      })
      .catch(function (error) {
        console.log("Oops... " + JSON.stringify(error));
      });

     */
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
