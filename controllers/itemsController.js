require("passport");

var db = require("../models");

module.exports = function(app) {

  // get one item's details
  app.get("/api/item/:id/:social", function(req, res) {
    db.User.findOne({
      where: {
        social_id: req.params.social
      },
      include: [{
        model: db.Item,
        where: {
          id: req.params.id
        }
      }]
    }).then(function(dbItem) {
      var itemObj = {
        userName: dbItem.dataValues.Name,
        userEmail: dbItem.dataValues.email,
      }
      dbItem.Items.forEach(function(item) {
        itemObj["item"] = item.dataValues
      })
      res.json(itemObj);
    });
  });

  // find all items (return the 10 most recent)
  app.get("/api/items", function(req, res) {
    db.User.findAll({
      include: [db.Item],
      limit: 10,
      order: [
        [{
          model: db.Item
        }, 'updatedAt', 'DESC']
      ]
    }).then(function(data) {
      // the data sent back to the html
      var allItems = []
      data.forEach(function(user) {
        var items = user.dataValues.Items

        if (items.length > 0) {
          // loop through all the items and add them to 
          // allItems items array
          items.forEach(function(item) {
            allItems.push(item.dataValues)
          });
        }
      })
      res.json(allItems);
    });
  });


  /* find the current user's items. Note - this is not currently implemented on the user interface, but would allow a user to sign in and manage items they have posted
    db.User.findOne({
      where:{
        social_id: req.session.passport.user
      }, include:[db.Item]
    }).then(function(data){
      var userData = {email:data.dataValues.email, name:data.dataValues.Name}
      var itemsData = []
      data.Items.forEach(function(item){
        itemsData.push(item.dataValues);
      })
      var userItems = {
        items:itemsData,
        user: userData
      }
      res.json(userItems)
    })*/


  // api route to create a new item
  app.post("/api/items", function(req, res) {
    db.Item.create({
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      photo_url: req.body.photo_url,
      UserSocialId: req.session.passport.user
    }).then(function(dbItem) {
      res.json(dbItem);
    });
  });

  // api route to delete the item using its ID. This is not currently implemented on the user interface.
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