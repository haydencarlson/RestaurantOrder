$(function(){
	var readyButton = $('.ready');
	readyButton.on("click", function (event){
		console.log("clicked");
		document.getElementById("customerDeets").style.display = null;
	});
});

