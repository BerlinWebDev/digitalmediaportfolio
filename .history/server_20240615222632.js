// server.js
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
// MailerSend
const Recipient = require("mailersend").Recipient;
const EmailParams = require("mailersend").EmailParams;
const MailerSend = require("mailersend");

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
  // Konfigurieren Sie den Transporter für nodemailer
const mailersend = new MailerSend({
    api_key: "mlsn.a671d13593c5c995e4335ca9aa945f8e6c5be3a9d30fa0c42d95d88bb2d988a2",
});

const recipients = [new Recipient("recipient@email.com", "Recipient")];

const emailParams = new EmailParams()
    .setFrom("digitalmedia@test.de")
    .setFromName("Serkan")
    .setRecipients(email)
    .setSubject("Neue KUNDENANFRAGE")
    .setHtml("Neue KUNDENANFRAGE")
    .setText("Neue KUNDENANFRAGE");

mailersend.send(emailParams);




app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
