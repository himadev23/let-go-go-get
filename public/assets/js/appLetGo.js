$(document).ready(function() {

  // create a handler for when the Submit button is clicked to post a new item to let go.
  $(".create-form").on("submit", function(event) {
    event.preventDefault();
    // create an object that captures the text from the input boxes on the form
    var newItem = {
      name: $("#item-name").val().trim(),
      category: $("#item-category").val().trim(),
      description: $("#item-description").val().trim(),
      photo_url: $("#item-photo").val().trim()
    };
    // send the POST request to add the item to the database
    $.ajax("/api/items", {
      type: "POST",
      data: newItem
    }).then(
      function(res) {
        
        //TODO: validate and make into a bootstrap modal.
        alert("Your item has been posted.");
        // Reload the page to get the updated list.
        window.location.replace('/');
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
  }).then(fun)

});

});