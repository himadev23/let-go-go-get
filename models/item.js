// create an item mode that has a category, description, photo, and foreign key of the user who created it

module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define("Item", {
      category: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      photo {
        type: DataTypes.STRING,
        allowNull: false
      },
      user_name_owner {
        type: DataTypes.STRING,
        allowNull: false
      }
  });
  return Item;
};

Item
Category (furniture clothes, electronics, appliances)
Description
Photo
User Id and contact info of person who posted it
