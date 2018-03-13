// create an item model that has a category, description, photo (path to database link), and foreign key of the user who created it

module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define("Item", {
    name: {
      type: DataTypes.STRING
    },
    category: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    photo_url: {
      type: DataTypes.TEXT
    }
  });

  Item.associate = function(models) {
    Item.belongsTo(models.User, {
      foreignKey: "social_id"
    });
  };
  return Item;
};
