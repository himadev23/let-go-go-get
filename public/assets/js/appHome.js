$(document).ready(function() {

  // build the initial page from the total number of items in the database (or the first 10, if there are more)
  // create the page using a masonry.js templating style
  $.ajax("api/items", {
    type: "GET"
  }).then(
    function(res) {
      
      // loop through the response and display the first 10 items returned (or the total number of responses if fewer are returned)
      
      for (var i = res.length-1; (i <= res.length-1) && (i > res.length-11); i--) {
        var itemTag = $("<a>");
        itemTag.addClass("stuff");
        //itemTag.attr("href", "#item-modal");
        itemTag.attr("id", res[i].id);
        itemTag.attr("title", res[i].name);
        var article = $("<article>");
        var figure = $("<figure>");
        var figureCaption = $("<figcaption>");
        figureCaption.text(res[i].name)
        var photo = $("<img>");
        photo.attr("src", res[i].photo_url);
        figure.append(figureCaption);
        figure.append(photo);
        article.append(figure);
        itemTag.append(article);
        $("#main-grid").append(itemTag);
      }
    });

  // use event delegation to capture the click of the a tag in the main grid because content is generated dynamically and show the modal with the content
  $("#main-grid").on("click", "a", function(event) {
    var id = $(this).attr("id");
    $.ajax({
      type: "GET",
      url: "/api/items/" + id
    }).done(
      function(res) {
        $("#item-modal").modal("toggle");
        $(".modal-header").text(res.name);
        $("#item-description").text(res.description);
        $("#item-category").text(res.category);
        $("#item-image").attr("src", res.photo_url);
      }
    );
  });

});