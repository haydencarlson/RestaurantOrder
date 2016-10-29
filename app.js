const settings = require("./settings");
const express = require("express");


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

app.use(express.static('public'));

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



app.set("view engine", "ejs");
app.get("/admin", (req,res) => {
res.render('admin')
});



