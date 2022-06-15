const Router = require('express');
const router = Router();

const peliculaOSerieController = require('../controllers/peliculaOSerie.controller');

router.get('/', peliculaOSerieController.getPeliculasOSeries);            // Obtener todas las pelis/series o algunas según un filtro de req.query.
router.get('/:id', peliculaOSerieController.getDetallePeliculaOSerie);    // DETALLE: Una peli o serie en particular con sus pejotas.

module.exports = router;