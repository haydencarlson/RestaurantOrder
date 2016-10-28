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
  ssl      : settings.ssl,
  debug    : true
  }
});

app.use(express.static('public'));

app.get("/", (req, res) => {

 
});

app.get("/addtocart", (req, res) => {
console.log("hello");
});

app.post("/addtocart", (req, res) => {
  knex.insert([{food: 'Chicken Parmigiana', price: '17', duration: '1020'}]).into('menu')
      .then(function(){
        console.log("Added to cart");
      });


});


app.listen(PORT, function() {
  console.log(`Now listening on port ${PORT}`);
});



