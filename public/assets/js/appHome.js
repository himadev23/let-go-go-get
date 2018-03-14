$(document).ready(function() {
  $('#logout').hide()
  $('#flashMessage').hide()
  var user = null
  // build the items page from the database
  // create the page using a masonry.js templating style
  $.ajax("api/items", {
    type: "GET"
  }).then(
    function(results) {

      // loop through the response and display the items on the page

      results.forEach(function(itemObj) {
        var itemTag = $("<a>");
        itemTag.addClass("stuff");
        // a tag's title property is used for the sample masonry template style
        itemTag.attr("title", itemObj.name);
        itemTag.attr("data-itemId", itemObj.id);
        itemTag.attr("data-social", itemObj.UserSocialId)
        itemTag.attr("data-itemTitle", itemObj.name);
        var article = $("<article>");
        var figure = $("<figure>");
        var figureCaption = $("<figcaption>");
        figureCaption.text(itemObj.name);
        var photo = $("<img>");
        photo.attr("src", itemObj.photo_url);
        figure.append(figureCaption);
        figure.append(photo);
        article.append(figure);
        itemTag.append(article);

        $("#main-grid").append(itemTag);
      })
    });

  // use event delegation to capture the click of the a tag in the main grid because content is generated dynamically and show the modal with the content
  $("#main-grid").on("click", "a", function(event) {
    var id = $(this).attr("data-itemId")
    var social = $(this).data("social");
    $.ajax({
      type: "GET",
      url: `/api/item/${id}/${social}`
    }).done(
      function(res) {
        $("#item-modal").modal("toggle");
        $(".modal-header").text(res.item.name);
        $("#item-description").text("Description: " + res.item.description);
        $("#item-category").text("Category: " + res.item.category);
        $("#item-image").attr("src", res.item.photo_url);
        $(".contactUser").attr("href", `
          mailto:${res.userEmail}?Subject=Inquiry%Item:${res.item.name}
        `)
        $("#userName").text(res.userName);
        $("#userEmail").text(res.userEmail)
      }
    );
  });

  // show and hide sign in and out buttons
  $('#login').on('click', function() {
    $('#logout').show()
    window.location = '/login'
  });

  $('#logout').on('click', function() {
    $('#flashMessage').slideDown().delay(2500).slideUp();

    $.ajax('/auth/logout', {
      type: "GET"

    }).then(function(data, res) {
      //console.log(data)
    })
  });

});