// create an item model that has a category, description, photo (path to database link), and foreign key of the user who created it

module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define("Item", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    photo_url: {
      type: DataTypes.STRING(1000)
    },
    social_id: {
      type: DataTypes.STRING
      // allowNull: false,
      // foreignKey: true
    }
  });
  
  // Item.associate = function(models) {
  //   Item.belongsTo(models.User, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };
  return Item;
};
