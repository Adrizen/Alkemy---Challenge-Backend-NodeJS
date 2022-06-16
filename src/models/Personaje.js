const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Personaje = sequelize.define('personaje', {
    imagen: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
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
},
{
    freezeTableName: true   // Para que sequelize no genere las tablas en plural.
});



module.exports = Personaje;