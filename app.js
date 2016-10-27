const settings = require("./settings");
const express = require("express");
const app = express();
const PORT = 8000;
var knex = require('knex')({
  client: 'pg',
  connection: {
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  ssl      : settings.ssl
  }
});

app.use(express.static('public'));

app.get("/", (req, res) => {

  res.render("index");
});

app.post("/", (req, res) => {


});



app.listen(PORT, () => {
  console.log("Now listening on port 8080");
});



