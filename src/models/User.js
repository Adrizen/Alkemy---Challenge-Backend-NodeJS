const { DataTypes } = require('sequelize');
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
},{
    freezeTableName: true   // Para que sequelize no genere las tablas en plural.
});

module.exports = User;