var db = require("../models");
var path = require("path");

module.exports = function(app) {
  
  // find all items that a user has posted
  app.get("/users/:id/items", function(req, res) {
    db.User.findAll({}).then(function(dbUser) {
      res.json(dbUser);
    });  
  })  
};