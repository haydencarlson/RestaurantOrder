const settings = require("./settings");
const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session')
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

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/neworder", (req, res) => {
   knex('order').insert({temporary_id: '123'})
    .returning("id")
    .then(function(id) {// [7] 
      req.session.orderid = id[0];
      res.sendStatus(200);
    });
});

app.post("/addtocart", (req, res) => {
  var foodId = Number(req.body.foodId);
  var orderid = req.session.orderid;
  console.log("hello", orderid);
  knex('order_item').insert({menu_item_id: foodId, order_id: orderid}).asCallback(function(err) {
    if (err) {
      console.log(err);
    }
  });
  console.log("foodId", foodId);
  res.sendStatus(200);
});

app.get("/viewcart", (req, res) => {
  var ordr = req.session.orderid;
  knex.select('')
  .from('menu')
  .join('order_item', 'menu_item_id', 'menu.id')
  .where("order_id", "=", req.session.orderid)
  .asCallback((err, rows) => {    
    if (err) {
      console.log(err);
      res.status(400).json({error: err})
    } else {
      res.json({menu_items: rows});
    }   
  });   
});
  
app.listen(PORT, function() {
  console.log(`Now listening on port ${PORT}`);
});

const generateRandomString = () => {
  let randomString = "";
  var possible = "0123456789";
for (let i = 0; i < 6; i++)
    randomString += possible.charAt(Math.floor(Math.random() * possible.length));
  return randomString;
};



