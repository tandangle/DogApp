'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			name: {
				type: Sequelize.STRING
			},
			email_address: {
				type: Sequelize.STRING
			},
			password: {
				type: Sequelize.STRING
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('users');
	}
};
