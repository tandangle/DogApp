'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return Promise.all([
			queryInterface.addColumn('potties', 'dog_id', {
				type: Sequelize.INTEGER,
				references: {
					model: 'dogs',
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
				defaultValue: null,
				after: 'can_maintain_system'
			})
		]);
	},

	down: (queryInterface, Sequelize) => {
		return Promise.all([ queryInterface.removeColumn('potties', 'dog_id') ]);
	}
};
