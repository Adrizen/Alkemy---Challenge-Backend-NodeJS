const { Model, DataTypes } = require('sequelize');
//const { database } = require('../../config');
const sequelize = require('../database/db');

const Genero = sequelize.define('genero', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imagen: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    peliculasOSeries: {
        type: DataTypes.TEXT,
        
    }
},{
    timestamps: false
});

module.exports = Genero;