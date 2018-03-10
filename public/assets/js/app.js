// Wait until the DOM is fully loaded to attach the handlers.
$(function() {
  // Run a function when the user clicks the Devour It! button.
  // $(".change-devour").on("click", function(event) {
  //   var id = $(this).data("id");
  //   var newDevour = $(this).data("newdevour");
  //   var newDevourState = {
  //     devoured: newDevour
  //   };
  //   // Send the PUT request.
  //   $.ajax("/api/burgers/" + id, {
  //     type: "PUT",
  //     data: newDevourState
  //   }).then(
  //     function() {
  //       console.log("changed devoured to", newDevour);
  //       // Reload the page to get the updated list.
  //       location.reload();
  //     }
  //   );
  // });
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
});