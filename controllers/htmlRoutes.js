var path = require("path");

module.exports = function(app) {
  
  // display home page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });
  
  // display page to add a new item (show a form)
  app.get("/items/new", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/letGo.html"));
  });
  
  // html route to display all items
  app.get("/items", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });
};
