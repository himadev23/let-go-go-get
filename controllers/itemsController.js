var db = require("../models");

// TODO: Support updating item details?

// TODO: add a user profile -- get /user/id html to show form for user profile and api for user/id with adding contact info (phone_number) and location? 

module.exports = function(app) {
  
  // get one item's details
  app.get("/api/items/:id", function(req, res) {
    db.Item.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbItem) {
      res.json(dbItem);
    });
  });
  
  // find all items
  app.get("/api/items", function(req, res) {
    db.Item.findAll({}).then(function(dbItem) {
      res.json(dbItem);
      // console.log(dbItem);
    });
  });
  
  // api route to create a new item
  // TODO: get parameter name for social_id
  app.post("/api/items", function(req, res) {
    console.log(req.body);
    db.Item.create(req.body).then(function(dbItem) {
      res.json(dbItem);
    });
  });
  
  // api route to delete the item using its ID
  app.delete("/api/items/:id", function(req, res) {
    db.Item.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbItem) {
      res.json(dbItem);
    });
  });
  
};