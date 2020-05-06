'use strict';
module.exports = (sequelize, DataTypes) => {
  const dogs = sequelize.define('dogs', {
    name: DataTypes.STRING
  }, {});
  dogs.associate = function (models) {
    dogs.belongsTo(models.users)
    dogs.hasMany(models.food)
  };
  return dogs;
};