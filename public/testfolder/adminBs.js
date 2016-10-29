$(function(){
    $('.ready').click(function(){
        console.log("click")
        $('.col-md-12').slideToggle("fast");
    });
});


var twilioClient = require('../twilioClient');
var admins = require('../config/administrators.json');
$(function(){
    var notifyButton = $('.confirm');
    notifyButton.on('click', function(event){
        console.log('click2')
        client.sendMessage({
				  to: '6049920841',
				  from: '7782007530',
				  body: 'Hello Hayden,'
				 },
				 function(err, message) {
				 	if (err) {
				 		console.log(err.message)
				 	}
				 });
    }); 
});