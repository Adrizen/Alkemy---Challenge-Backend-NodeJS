const { Model, DataTypes } = require('sequelize');
//const { database } = require('../../config');
const sequelize = require('../database/db');

const Personaje = sequelize.define('personaje', {
    imagen: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    edad: {
        type: DataTypes.INTEGER,

    },
    peso: {
        type: DataTypes.FLOAT,

    },
    historia: {
        type: DataTypes.TEXT,

    }
});



module.exports = Personaje;