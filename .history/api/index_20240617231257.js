// server.js
const express = require("express");
const bodyParser = require("body-parser");
const Mailjet = require("node-mailjet");
require("dotenv").config();
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

app.post("/send-email", async (req, res) => {});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});

module.exports = express;
