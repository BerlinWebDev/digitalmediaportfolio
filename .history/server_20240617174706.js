// server.js
const express = require("express");
const bodyParser = require("body-parser");
const mailjet = require("node-mailjet");
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
    mailjet.apiConnect(
      process.env.MJ_APIKEY_PUBLIC,
      process.env.MJ_APIKEY_PRIVATE
    );
    const request = mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: process.env.MJ_SENDER_EMAIL,
            Name: "Serkan",
          },
          To: [
            {
              Email: email,
              Name: "Kunde",
            },
          ],
          Subject: "Kundenanfrage",
          TextPart: "Kunden kontaktieren",
          HTMLPart: "<h3>Bitte Kunden kontaktieren",
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
