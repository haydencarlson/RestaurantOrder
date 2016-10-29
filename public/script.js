$(function() {

  $(".foods1").on("click", function(event) {
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

  $(".cartButton").on("click", function() {
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
    });

  });

  $(".ready").on("click", function() {
    $.ajax({
      method: "get",
      url:"/pullorders"
    }).then((orderdata) => {

    });

  });
});