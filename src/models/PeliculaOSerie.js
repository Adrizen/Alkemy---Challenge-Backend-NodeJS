const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const PeliculaOSerie = sequelize.define('peliculaOSerie', {
    imagen: {
        type: DataTypes.STRING,
        allowNull: false
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fechaDeCreacion: {
        type: DataTypes.DATE,
        allowNull: false
    },
    calificacion: {
        type: DataTypes.INTEGER,
        validate: {
            min: 1,
            max: 5
        },
        allowNull: false
    }
},{
    freezeTableName: true   // Para que sequelize no genere las tablas en plural.
});

module.exports = PeliculaOSerie;