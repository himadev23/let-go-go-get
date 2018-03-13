require("passport");

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
    // db.Item.findAll({
    //   where: {
    //     UserSocialId: req.session.passport.user
    //   },
    //   include: [db.User]
    // }).then(function(dbItem) {
    //   // console.log("$$$$$$$",dbItem);
    //   // console.log("~~~~~~",dbItem.User);
    //   // console.log("test", test)
    //   // var data = []
    //   // for(var instance in dbItem){
    //   //   data.push(dbItem[instance].dataValues)
    //   // }
    //   // console.log("$$$$", data)
    // 
    //     res.json(dbItem);
    // });
    
    
    
    db.User.findOne({
      where:{
        social_id: req.session.passport.user
      }, include:[db.Item]
    }).then(function(data){
      // console.log("$$$", data.dataValues);
      var userData = {email:data.dataValues.email, name:data.dataValues.Name}
      var itemsData = []
      data.Items.forEach(function(item){
        itemsData.push(item.dataValues);
      })
      // console.log("!!!!", itemsData)
      var userItems = {
        items:itemsData,
        user: userData
      }
      console.log("%%%%", userItems)
      res.json(userItems)
    })
  });
  
  // api route to create a new item
  // TODO: get parameter name for social_id
  app.post("/api/items", function(req, res) {
    console.log(req.body);
    console.log("id ", req.session.passport.user)
    console.log("passport ", req.session.passport)
    console.log("$$$$$$$$$$$$$$$$$$$", req.isAuthenticated())
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