// create a user model with sequelize - having a user name that is an email

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    contact_info: {
      type: DataTypes.STRING
    },
    social_id:{
      type:DataTypes.STRING,
      primaryKey: true
      
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