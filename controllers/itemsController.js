var db = require("../models");

module.exports = function(app) {
  
  // find all items
  app.get("/api/items", function(req, res) {
    db.Item.findAll({}).then(function(dbItem) {
      res.json(dbItem);
      console.log(dbItem);
    });
  });

  // get one item using its ID
  app.get("/api/items/:id", function(req, res) {
    db.Item.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbItem) {
      res.json(dbItem);
    });
  });
  
  // create a new item
  app.post("/api/items", function(req, res) {

    console.log(req.body);
    db.Item.create(req.body).then(function(dbItem) {
      res.json(dbItem);
    });
  });
  
  // Delete the item using its ID
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