const Sequelize = require('sequelize');

const sequelize = new Sequelize('users', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres'
  });

const Model = Sequelize.Model;
class Users extends Model {}

Users.init({
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
},
    {   sequelize, 
        modelName: 'users', 
        tableName: 'users',
});