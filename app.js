const express = require('express');
const sequelize = require('./database/db');
const app = express()

// TODO: Dejar más prolijo, quizás en otro lado incluso.
const Personaje = require('./database/models/Personaje');
const PeliculaOSerie = require('./database/models/PeliculaOSerie');
const Genero = require('./database/models/Genero');

// Configuración.
const port = 3000 || process.env.PORT;

// Rutas.
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`La app ha iniciado en http://localhost:${port}/`)

  // Conectarse a la base de datos.
  // Con 'force: true' se hace DROP TABLES.
  sequelize.sync( { force: true } ).then(() =>  {
    console.log("Nos hemos conectado a la base de datos.")
  }).catch(error => {
    console.log("Se ha producido un error: ", error)
  } )

})