'use strict';
module.exports = (sequelize, DataTypes) => {
  const food = sequelize.define('food', {
    types_of_food: DataTypes.STRING,
    time: DataTypes.DATE
  }, {});
  food.associate = function (models) {
    food.belongsTo(models.dogs, {
      foreignKey: { name: "id", allowNull: false},
      onDelete: "CASCADE",
    });
  };
  return food;
};

