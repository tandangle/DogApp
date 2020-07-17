'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class potties extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			// define association here
		}
	}
	potties.init(
		{
			dog_id: DataTypes.INTEGER,
			poop: DataTypes.BOOLEAN,
			pee: DataTypes.BOOLEAN,
			time: DataTypes.DATE
		},
		{
			sequelize,
			modelName: 'potties'
		}
	);
	return potties;
};
