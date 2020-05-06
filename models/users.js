'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    name: DataTypes.STRING,
    email_address: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  users.associate = function (models) {
    users.hasMany(models.dogs)
  };
  return users;
};