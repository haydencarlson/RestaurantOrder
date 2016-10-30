const settings = require("./settings");
const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session')
const twilio = require("twilio")('AC63b1e5fd8330485b2919bef9f2b4fa74', 'c8b0a56d981e0e6f73dfdbaadae96ee0') 
const helper = require('sendgrid').mail;
const from_email = new helper.Email('kyleflemington@gmail.com');
const to_email = new helper.Email('kyleflemington@gmail.com');
const subject = 'Your Order Details!';
const content = new helper.Content('text/plain', 'Order Information');
const mail = new helper.Mail(from_email, subject, to_email, content);
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

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

app.get("/notify", function(req, res){
  twilio.sendMessage({
    to: "+16049920841",
    from: "+17782007530",
    body: "Your Order Is Ready"
  }, function (err, data) {
    if (err) {
      console.log(err);
    console.log(data);
    };
  });
});

app.get('/emailnotify', (req, res) => {
  var sg = require('sendgrid')('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');
  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON(),
  });
  sg.API(request, function(error, response) {
    console.log(response.statusCode);
    console.log(response.body);
    console.log(response.headers);
    res.send("ok")
  });
});

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/neworder", (req, res) => {
   knex('order').insert({order_placed: false})
    .returning("id")
    .then(function(id) {// [7] 
      req.session.orderid = id[0];
      res.sendStatus(200);
    });
});

app.post("/neworder/placed", (req, res) => {

   console.log(req.session.orderid);
   knex('order')
  .where('id', '=', req.session.orderid)
  .update({
    order_placed: true
  }).then(function(request) {
  res.sendStatus(200);
});

});

app.post("/neworder/addtocart", (req, res) => {
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
  knex.select('')
  .from('menu')
  .join('order_item', 'menu_item_id', 'menu.id')
  .where("order_id", "=", req.session.orderid)
  .asCallback((err, rows) => {    
    if (err) {
      console.log(err);
      res.status(400).json({error: err})
    } else {
      console.log(rows);
      res.json({menu_items: rows});
    }   
  });   
});

app.get("/pullorders", (req, res) => {
  knex.select('')
  .from('menu')
  .join('order_item', 'menu_item_id', 'menu.id')
  .join('order', 'order_id', 'order.id')
  .where("order_placed", "=", true)
  .asCallback((err, rows) => {    
    if (err) {
      console.log(err);
      res.status(400).json({error: err})
    } else {
      console.log(rows);

      //process json      
      res.json({menu_items: rows});
    }   
  });  
});

app.get("/admin", (req,res) => {
  res.render('admin')
});

app.listen(PORT, function() {
  console.log(`Now listening on port ${PORT}`);
});




