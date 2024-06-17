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
    var data = {
      service_id: "service_geu705r",
      template_id: "template_eys6olt",
      user_id: "EVNPc5ILzdvb1fQ5O",
      template_params: {
        email: email,
      },
    };

    axios
      .post("https://api.emailjs.com/api/v1.0/email/send-form", {
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
      })
      .done(function () {
        alert("Your mail is sent!");
      })
      .fail(function (error) {
        alert("Oops... " + JSON.stringify(error));
      });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Fehler beim Senden der E-Mail." });
  }
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
