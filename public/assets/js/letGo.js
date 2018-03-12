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