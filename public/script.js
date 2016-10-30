$(function() {

  $(".foodItem").on("click", function(event) {
    var foodId = $(this).attr("data-food");
    $.ajax({
      method: "post",
      url: "/neworder/addtocart",
      data: {foodId: foodId }
    }).fail(function(err) {
      console.log(err);
    });
  });
  
  $("#order-button").on("click", function() {
    $.ajax({
      method: "post",
      url: "/neworder"
    });
  });

  $(".foodItem").on("click", function() {
    $(".cart").empty();
    $.ajax({
      method: "get",
      url: "/viewcart",
    }).then((data) => {

        var sum = data.menu_items.reduce((a,b) => a + b.price, 0);
        $(".cart").append(`<p class="cartList">Price: $${sum} </p>`);

        data.menu_items.forEach((item) => {
          $(".cart").append(`<p class="cartList"> ${item.food} </p>`);
        });
      }).fail((err) => {
        alert(err);
    });
  });

  $("#placeorder").on("click", function() {
    $.ajax({
      method: "post",
      url: "/neworder/placed"
    }).then((email) => {
      alert("Your order has been placed. Check your email for order details!");
      $.ajax({
        method: "get",
        url: "/emailnotify"
      });
    });
  });

  $(".ready").on("click", function() {
    $("foodItem").empty();
    $.ajax({
      method: "get",
      url:"/pullorders"
    }).then((orderdata) => {
    //call $.ajax here
        orderdata.orders.forEach((item) => {
          $("#orderID").replaceWith(`<h2>${item.id}</h2>`);
          $(".col-sm-12").append(`<p class = "foodItem">${item.food}</p>`);

      });  
    });
  });
});