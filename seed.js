const sequelize = require('./src/database/db');
const Personaje = require('./src/models/Personaje');
const Genero = require('./src/models/Genero');
const PeliculaOSerie = require('./src/models/PeliculaOSerie');

const personajes = [
    { imagen: "url", nombre: "Chefcito", edad: "2", peso: "0.5", historia: "Es una rata" },
    { imagen: "url", nombre: "Blancanieves", edad: "25", peso: "60", historia: "Es una princesa" },
    { imagen: "url", nombre: "Simba", edad: "4", peso: "60", historia: "Es un león" },
    { imagen: "url", nombre: "Woody", edad: "1", peso: "0.5", historia: "Es un sheriff" },
    { imagen: "url", nombre: "Buzz Lightyear", edad: "1", peso: "0.5", historia: "Es un guardía espacial" }
]

const peliculasOSeries = [
    { imagen: "url", titulo: "Blancanieves y los siete enanitos", fechaDeCreacion: "1937/01/01", calificacion: "5", generoId: "1" },
    { imagen: "url", titulo: "Ratatouille", fechaDeCreacion: "2007/01/01", calificacion: "5", generoId: "2" },
    { imagen: "url", titulo: "El rey león (1994)", fechaDeCreacion: "1994/01/01", calificacion: "5", generoId: "1" },
    { imagen: "url", titulo: "El rey león (2019)", fechaDeCreacion: "2019/01/01", calificacion: "5", generoId: "2" },
    { imagen: "url", titulo: "Toy Story", fechaDeCreacion: "1995/01/01", calificacion: "5", generoId: "2" },
    { imagen: "url", titulo: "Toy Story 2", fechaDeCreacion: "1999/01/01", calificacion: "5", generoId: "2" }
]

const generos = [
    { nombre: "Animación clásica", imagen: "url" },
    { nombre: "CGI", imagen: "url" }
]

const participaciones = [
    { personajeId: "1", peliculaOSerieId: "2" },
    { personajeId: "2", peliculaOSerieId: "1" },
    { personajeId: "3", peliculaOSerieId: "3" },
    { personajeId: "3", peliculaOSerieId: "4" },
    { personajeId: "4", peliculaOSerieId: "5" },
    { personajeId: "4", peliculaOSerieId: "6" },
    { personajeId: "5", peliculaOSerieId: "5" },
    { personajeId: "5", peliculaOSerieId: "6" }
]

async function sincronizar() {
    await sequelize.sync({ force: true }).then(() => {
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
}

sincronizar().then(() => {
    participaciones.forEach(async participacion => {    // Se rellena la tabla 'participa'. La cual tiene personajeId-peliculaOSerieId
        const identificadorPersonaje = participacion.personajeId;
        const identificadorPeliOSerie = participacion.peliculaOSerieId;
        await Personaje.findOne()   // wtf. Sin esto, revienta todo.
        let personajeBuscado = await Personaje.findByPk(identificadorPersonaje);
        let peliculaOSerieBuscada = await PeliculaOSerie.findByPk(identificadorPeliOSerie)
        personajeBuscado.addPeliculaOSerie(peliculaOSerieBuscada)
    })
});

