$(document).ready(function() {
var user = null
  // build the initial page from the total number of items in the database (or the first 10, if there are more)
  // create the page using a masonry.js templating style
  $.ajax("api/items", {
    type: "GET"
  }).then(
    function(res) {
      
      user = res.user
      console.log(user)
      // loop through the response and display the first 10 items returned (or the total number of responses if fewer are returned)
      
      for (var i = res.items.length-1; (i <= res.items.length-1) && (i > res.items.length-11); i--) {
        var itemTag = $("<a>");
        itemTag.addClass("stuff");
        //itemTag.attr("href", "#item-modal");
        itemTag.attr("id", res.items[i].id);
        itemTag.attr("title", res.items[i].name);
        var article = $("<article>");
        var figure = $("<figure>");
        var figureCaption = $("<figcaption>");
        figureCaption.text(res.items[i].name);
        var photo = $("<img>");
        photo.attr("src", res.items[i].photo_url);
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
        $("#item-description").text("Description: " + res.description);
        $("#item-category").text("Category: " + res.category);
        $("#item-image").attr("src", res.photo_url);
        $(".contactUser").attr("href", `
          mailto:${user}?Subject=Inquiry%Item:${res.name}
        `)
        $("#userName").text(user.name);
        $("#userEmail").text(user.email)
      }
    );
  });
  
  $('#login').on('click',function(){
  console.log("Calling login api");
  window.location='/login'
   // $.ajax('/login',{
   //  type:'GET',
   //  headers: new Headers({
   //    "Access-Control-Allow-Origin":  "http://127.0.0.1:8000",
   //    "Access-Control-Allow-Methods": "GET",
   //    "Access-Control-Allow-Headers": "Content-Type, Authorization"
   //  })        
   // });
  console.log('login clicked');
});

$('#logout').on('click',function(){
  // window.location='/auth/logout';

  $.ajax('/auth/logout',{
    type:"GET"
  })

});

});