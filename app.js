const express = require('express');
const sequelize = require('./src/database/db');
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()

// Importar rutas.
const personajeRoutes = require('./src/routes/Personaje');
const peliculaOSerieRoutes = require('./src/routes/PeliculaOSerie');
const generoRoutes = require('./src/routes/Genero');
const userRoutes = require('./src/routes/User');
const auth = require('./middleware/auth');

// Configuración.
const port = 3000 || process.env.PORT;

app.use(morgan('dev'))    // Mostrar queries en la terminal.
app.use(express.json())   // Archivos JSON.
const jsonParser = bodyParser.json()

// Rutas. Nota: Se requiere autenticación antes de hacer un petición a la API. Se obtiene con un token al loguearse.
app.use('/api/characters', jsonParser, auth, personajeRoutes);
app.use('/api/movies', jsonParser, auth, peliculaOSerieRoutes);
app.use('/api/generos', jsonParser, auth, generoRoutes);
app.use('/auth', jsonParser, userRoutes);

app.listen(port, () => {
  console.log(`La app ha iniciado en http://localhost:${port}/`)
  // Conectarse a la base de datos.
  // Con 'force: true' se hace DROP TABLES y se las crea de nuevo.
  sequelize.sync({ force: false }).then(() => {
  }).then(() => {
    require('./src/database/associations');
  }).then(() => {
    require('./seed')
  }).catch(error => {
    console.log("Se ha producido un error: ", error)
  })
})

// TOOD: Chequear todos los https codes.

module.exports = app;