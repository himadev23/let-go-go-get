var path = require("path");

module.exports = function(app) {
  
  // display home page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });
  
  // display a page with one item's details - note: adding /details because : it fails to display items/new otherwise
  app.get("/items/details/:id", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/goGet.html"));
  });
  
  // display page to add a new item (show a form)
  app.get("/items/new", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/letGo.html"));
  });
  
  // html route to display all items
  app.get("/items", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/main.html"));
  });
};