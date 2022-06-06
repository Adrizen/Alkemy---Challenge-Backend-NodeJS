const Genero = require('../models/Genero');
const PeliculaOSerie = require('../models/PeliculaOSerie');
const Personaje = require('../models/Personaje');

// Genero va a tener asociadas muchas películas.
//Genero.hasMany(PeliculaOSerie, { as: "peliculasOSeries", foreignKey: "generoId" } );
Genero.hasMany(PeliculaOSerie);

// PeliculaOSerie va a tener un género.
PeliculaOSerie.belongsTo(Genero);

