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

        email: email,

    };
    (function(){
      emailjs.init("EVNPc5ILzdvb1fQ5O");
    })();

    emailjs.send("service_geu705r", "template_eys6olt",data).then(console.log("E-Mail gesendet!"));
    
      } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Fehler beim Senden der E-Mail." });
  }
    })
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
