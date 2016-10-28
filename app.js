const settings = require("./settings");
const express = require("express");
const app = express();
const PORT = 8080;
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

 
});

app.get("/addtocart", (req, res) => {
console.log("hello");
});

app.post("/addtocart", (req, res) => {

  console.log("Added to cart");
  knex.insert([{food: 'Chips'}, {price: 123}], 'id').into('menu');

});


app.listen(PORT, function() {
  console.log(`Now listening on port ${PORT}`);
});



