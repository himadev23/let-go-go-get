// Wait until the DOM is fully loaded to attach the handlers.
$(document).ready(function() {
  
  $.ajax("api/items", {
    type: "GET"
  }).then(
    function(res) {
      for (var i = 0; ((i < res.length) || (i < 4)); i++) {
        var itemTag = $("<a>");
        itemTag.addClass("stuff");
        //itemTag.data("target", "#item-modal");
        //  itemTag.data("toggle", "modal");
        //itemTag.attr("href", "#item-modal");
        itemTag.attr("id", res[i].id);
        // itemTag.attr("data-content", "hello");
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
    
    // use event delegation to capture the click of the a tag in the main grid because content is generated dynamically
    $("#main-grid").on("click", "a", function(event) {
      
      var id = $(this).attr("id");
      $.ajax({
        type: "GET",
        url: "/api/items/" + id
      }).done(
        function(res) {
          console.log(res.name);
          $("#item-modal").modal("toggle");
          $(".modal-header").text(res.name);
          $("#item-description").text(res.description);
          $("#item-category").text(res.category);
          //var photo = $("<img>");
          $("#item-image").attr("src", res.photo_url);
          // needs to be img-responsive to make it resize to fit within the modal window
        //  photo.addClass("img-responsive");
        //  $(".modal-body").append(photo);
        }
      );
    }); 


    // var originalModal = $('#item-modal').clone();
    // $(document).on('#item-modal', 'hidden.bs.modal', function () {
    //     $('#item-modal').remove();
    //     var myClone = originalModal.clone();
    //     $('body').append(myClone);
    // });

    
  });
    



