const { Model, DataTypes } = require('sequelize');
//const { database } = require('../../config');
const sequelize = require('../database/db');
const PeliculaOSerie = require('./PeliculaOSerie');

const Genero = sequelize.define('genero', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imagen: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

module.exports = Genero;