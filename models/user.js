// create a user model with sequelize - having a user name that is an email

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      validate: {
        isEmail: true
      }
    },
    contact_info: {
      type: DataTypes.STRING
    }
  });
  
  User.associate = function(models) {
    User.hasMany(models.Item, {
      onDelete: "cascade"
    });
  };
  return User;
};