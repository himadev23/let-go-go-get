// create a user model with sequelize - having a user name that is an email

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true
        }
      },
      social_id: {
        primaryKey: true,
        type: DataTypes.UUID
        // distinct:true
      },
      Name: {
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