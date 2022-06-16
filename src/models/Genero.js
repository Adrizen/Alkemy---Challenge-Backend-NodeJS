const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Genero = sequelize.define('genero', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imagen: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    freezeTableName: true   // Para que sequelize no genere las tablas en plural.
});

module.exports = Genero;