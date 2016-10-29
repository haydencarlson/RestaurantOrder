function renderOrder (order) {
	order.forEach(function(posts){
		var newOrderPost = createNewOrder(posts);
		$('#newOrder-container').prepend(posting);
	});
	return true;
}

unction createNewOrder(posts) {
	var $orderID = ('<h3>' + order1.ordernumberID + '</h3>');
	var $timeRecieved = ('<h4>' + order1.timeRecieved + '</h4>');

	var $orderDetails = ('<p>' + order1.orderDetails + '</p>');
	var $readyOrder = ()

	var $clientName = ( + order1.clientInfo.name + )
	var $clientPhone = ( + order1.clientInfo.phone + )
	var $clientEmail = ( + order1.clientInfo.email + )
	var $confirmOrder = ()


	$header.append(orderID);
	$header.append(timeRecieved);

	$body.append(orderDetails);

	$footer.append(confirmOrder);

}

 function renderOrderFromServer() {
 	$.ajax ({
 		url: "/TBD",
 		method: "get",
 		success: function (data) {
 			renderTweets(data);
 		}
 	})
 }

 renderOrderFromServer();

};

