const Genero = require('../models/Genero');
const PeliculaOSerie = require('../models/PeliculaOSerie');
const Personaje = require('../models/Personaje');

// PeliculaOSerie va a tener un género. Se añade una clave 'generoId' a la tabla peliculaOSerie.
//Genero.hasMany(PeliculaOSerie, { as: "peliculasOSeries", foreignKey: "generoId" } );
Genero.hasMany(PeliculaOSerie);

// PeliculaOSerie va a tener un género. Se añade una clave 'generoId' a la tabla peliculaOSerie.
//PeliculaOSerie.belongsTo(Genero, { as: "genero" });
PeliculaOSerie.belongsTo(Genero);
//----------------------------

// Personajes participan en muchas PeliculasOseries, en varias PeliculasOseries participan muchos Personajes.
// La "function table" o relación se llama 'participa'.
Personaje.belongsToMany(PeliculaOSerie, { through: "participa" });  // personajeId en tabla 'participa'
PeliculaOSerie.belongsToMany(Personaje, { through: "participa" });  // peliculaOSerieId en tabla 'participa'

