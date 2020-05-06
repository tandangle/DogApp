'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "food",
      "dog_id",
      {
        type: Sequelize.INTEGER,
        references: {
          model: "dogs",
          key: "id"
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
    "food",
    "dog_id"
    )
  }
};
