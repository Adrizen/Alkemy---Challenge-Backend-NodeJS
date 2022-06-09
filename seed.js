const sequelize = require('./src/database/db');
const Personaje = require('./src/models/Personaje');
const Genero = require('./src/models/Genero');
const PeliculaOSerie = require('./src/models/PeliculaOSerie');
const User = require('./src/models/User');

const personajes = [
    { imagen: "url", nombre: "Chefcito", edad: "2", peso: "0.5", historia: "Es una rata" },
    { imagen: "url", nombre: "Blancanieves", edad: "25", peso: "60", historia: "Es una princesa" },
    { imagen: "url", nombre: "Simba", edad: "2", peso: "0.5", historia: "Es un león" }
]

const peliculasOSeries = [
    { imagen: "url", titulo: "Blancanieves y los siete enanitos", fechaDeCreacion: "1937/01/01", calificacion: "5", generoId: "1" },
    { imagen: "url", titulo: "Ratatouille", fechaDeCreacion: "2007/01/01", calificacion: "5", generoId: "2" },
    { imagen: "url", titulo: "El rey león", fechaDeCreacion: "1994/01/01", calificacion: "5", generoId: "1" }
]

const generos = [
    { nombre: "Animación clásica", imagen: "url"},
    { nombre: "CGI", imagen: "url" }
]
//peliculasOSeriesId: ['1', '3']
// peliculasOSeriesId: ['2']

sequelize.sync({ force: true }).then(() => {
    // Conexión establecida
    console.log("Conexión establecida a la base de datos.");
}).then(() => {
    // Rellenar personajes.
    personajes.forEach(personaje => Personaje.create(personaje));
}).then(() => {
    // Rellenar generos.
    generos.forEach(genero => Genero.create(genero));
}).then(() => {
    // Rellenar peliculasOSeries
    peliculasOSeries.forEach(peliculaOSerie => PeliculaOSerie.create(peliculaOSerie));
}).catch(error => {
    console.log("Se ha producido un error: ", error)
});

