const express = require('express');
const sequelize = require('./database/db');
const app = express()


// Configuración.
const port = 3000 || process.env.PORT;

// Rutas.
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`La app ha iniciado en http://localhost:${port}/`)

  // Conectarse a la base de datos.
  sequelize.authenticate().then(() =>  {
    console.log("Nos hemos conectado a la base de datos.")
  }).catch(error => {
    console.log("Se ha producido un error: ", error)
  } )

})