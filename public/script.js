$(function() {

  $(".foods1").on("click", function(event) {
    var foodId = $(this).attr("data-food");
    console.log("food id", foodId);
      $.ajax({
        method: "post",
        url: "/addtocart",
        data: {foodId: foodId }
      }).fail(function(err) {
        console.log(err);
     });
  });
  
  $("#order-button").on("click", function() {

    console.log("clicked");
    $.ajax({
      method: "post",
      url: "/neworder"
    });
  });

  $(".cartButton").on("click", function() {
    $.ajax({
      method: "get",
      url: "/viewcart"
    });
  });
});