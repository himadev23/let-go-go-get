// create a user model with sequelize - having a user name that is an email

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      }
  });
  return User;
};