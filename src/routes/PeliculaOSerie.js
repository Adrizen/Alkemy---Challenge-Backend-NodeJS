const Router = require('express');
const router = Router();

const peliculaOSerieController = require('../controllers/peliculaOSerie.controller');

// /api/movies. TODO: Poner la dirección como /movies/ y borrar /movies/ de app.js?
router.get('/', peliculaOSerieController.getPeliculasOSeries);

module.exports = router;