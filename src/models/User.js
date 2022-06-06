const { Model, DataTypes } = require('sequelize');
//const { database } = require('../../config');
const sequelize = require('../database/db');

const User = sequelize.define('user', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
});

module.exports = User;