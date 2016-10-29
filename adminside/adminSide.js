function renderOrder (order) {
	order.forEach(function(posts){
		var newOrderPost = createNewOrder(posts);
		$('#newOrder-container').prepend(posting);
	});
	return true;
}

function createNewOrder(posts) {
	var $orderID = ('<h2>' + order1.ordernumberID + '</h2>');
	var $timeRecieved = ('<h3>' + order1.timeRecieved + '</h3>');

	var $orderDetails = ('<h4>' + order1.orderDetails + '</h4>');

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

