"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    mail: DataTypes.STRING,
    pass: DataTypes.STRING,
    pass2: DataTypes.STRING,
    color: DataTypes.STRING,
    secret: DataTypes.STRING
  }, {});
  User.associate = function (models) {
    User.hasMany(models.History);
  };
  return User;
}
