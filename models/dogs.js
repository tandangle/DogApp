'use strict';
module.exports = (sequelize, DataTypes) => {
	const dogs = sequelize.define(
		'dogs',
		{
			name: DataTypes.STRING,
			user_id: DataTypes.STRING
		},
		{}
	);
	dogs.associate = function(models) {
		dogs.hasMany(models.food, {
			foreignKey: 'dog_id'
		});
		dogs.hasMany(models.potties, {
			foreignKey: 'dog_id'
		});
	};
	return dogs;
};
