$(function(){
    $('.ready').click(function(){
        console.log("click")
        $('.col-md-12').slideToggle("fast");
    });
});

$(function(){
    var notifyButton = $('.confirm');
    notifyButton.on('click', function(event){
    $.ajax({
    type: "GET",
    url: "/notify"
  	});
  });
});