$(function() {

  $("#item1").on("click", function(event) {
    $.ajax({
      method: "post",
      url: "/addtocart"
    });

  });
  
});