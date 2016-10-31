$(function(){
    $('.ready').click(function(){
        $(this).hide("slow");

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