// create an item mode that has a category, description, photo (path to database link), and foreign key of the user who created it

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
      photo_url {
        type: DataTypes.STRING
      },
      user_email {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      }
  });
  
  Item.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Item.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Item;
};
