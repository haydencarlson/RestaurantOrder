$(function(){
console.log("Good To Go")
	var composeButton = $('buttonSend');
	var composeArea = $('section.new-tweet');

	composeButton.on("click", function (event){
		composeArea.slideToggle();
		return false;
	});
});