// Wait until the DOM is fully loaded to attach the handlers.
$(document).ready(function() {

  $.ajax("api/items", {
    type: "GET"
  }).then(
    function(res) {
      for (var i = 0; i < 10; i++) {
        var atag = $("<a>");
        atag.attr("href", "#");
        atag.attr("title", res[i].name);
        var article = $("<article>");
        article.attr("id", res[i].id);
        var figure = $("<figure>");
        var figureCaption = $("<figcaption>");
        figureCaption.text(res[i].name)
        var photo = $("<img>");
        photo.attr("src", res[i].photo_url);
        figure.append(figureCaption);
        figure.append(photo);
        article.append(figure);
        atag.append(article);
        $("#main-grid").append(atag);
      }
    });

  // Run a function when the user clicks the Submit button.
  $(".create-form").on("submit", function(event) {
    // PreventDefault on a submit event.
    event.preventDefault();
    var newItem = {
      name: $("#item-name").val().trim(),
      category: $("#item-category").val().trim(),
      description: $("#item-description").val().trim(),
      photo_url: $("#item-photo").val().trim()
    };
    // Send the POST request.
    $.ajax("/api/items", {
      type: "POST",
      data: newItem
    }).then(
      function(res) {
        console.log("created new item");
        // Reload the page to get the updated list.
        location.reload();
      }
    );
  });
  $('#login').on('click',function(){
    console.log("Calling login api");
    window.location='/login'
    // $.ajax('/login',{
    //   type:'GET'
    // });
    console.log('login clicked');
  })

});