'use strict';

// const dogs = require('../models/dogs');

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('potties', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			poop: {
				type: Sequelize.BOOLEAN,
				allowNull: true
			},
			pee: {
				type: Sequelize.BOOLEAN,
				allowNull: true
			},
			time: {
				type: Sequelize.DATE,
				allowNull: false
			}
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('potties');
	}
};
