const express = require('express');
const sequelize = require('./database/db');
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()

//const PeliculaOSerie = require('./database/models/PeliculaOSerie');
//const Genero = require('./database/models/Genero');

// Importar rutas.
const personajeRoutes = require('./routes/Personaje');
const peliculaOSerieRoutes = require('./routes/PeliculaOSerie');
const generojeRoutes = require('./routes/Genero');

// Configuración.
const port = 3000 || process.env.PORT;

// Middlewares.
// Para poder rellenar el req.body
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));

app.use(morgan('dev'))    // Mostrar queries en la terminal.
app.use(express.json())   // Archivos JSON.
const jsonParser = bodyParser.json()

// Rutas.
//app.get('/', (req, res) => {
//  res.send('Hello World!')
//})
app.get('/api/characters', jsonParser, personajeRoutes);
app.get('/api/movies', jsonParser, peliculaOSerieRoutes);
app.get('/api/generos', jsonParser, generojeRoutes);

app.listen(port, () => {
  console.log(`La app ha iniciado en http://localhost:${port}/`)
  // Conectarse a la base de datos.
  // Con 'force: true' se hace DROP TABLES y se las crea de nuevo.
  sequelize.sync({ force: false }).then(() => {
    console.log("Nos hemos conectado a la base de datos.")
  }).catch(error => {
    console.log("Se ha producido un error: ", error)
  })

})

module.exports = app;