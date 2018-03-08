var db = require("../models");

module.exports = function(app) {
  
  app.get("/api/items", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.User.findAll({}).then(function(dbUser) {
      // We have access to the todos as an argument inside of the callback function
      res.json(dbUser);
    });
    
  })
  
};