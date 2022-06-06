const express = require('express');
const sequelize = require('./src/database/db');
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()
require('./src/database/associations');
require('./seed')

//const PeliculaOSerie = require('./database/models/PeliculaOSerie');
//const Genero = require('./database/models/Genero');

// Importar rutas.
const personajeRoutes = require('./src/routes/Personaje');
const peliculaOSerieRoutes = require('./src/routes/PeliculaOSerie');
const generoRoutes = require('./src/routes/Genero');
const userRoutes = require('./src/routes/User');
const auth = require('./middleware/auth');

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
app.use('/api/characters', jsonParser, auth, personajeRoutes);
app.use('/api/movies', jsonParser, auth, peliculaOSerieRoutes);
app.use('/api/generos', jsonParser, auth, generoRoutes);
app.use('/auth', jsonParser, userRoutes);

app.use('/welcome', auth, (req, res) => { // Testing auth. TODO: Borrar.
  res.status(200).send("Bienvenuti 🙌")
});


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