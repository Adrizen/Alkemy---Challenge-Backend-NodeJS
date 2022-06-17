const Router = require('express');
const router = Router();

const peliculaOSerieController = require('../controllers/peliculaOSerie.controller');

// /api/movies TODO: Yet to be implemented, deaaaaaaaaaaaaaa
//router.post('/', peliculaOSerieController.newPeliculaOSerie);
router.get('/', peliculaOSerieController.getPeliculaOSerieManager); // Obtener todos los personajes o algunas según un filtro de req.query.
router.get('/:id', peliculaOSerieController.getDetallePeliculaOSerie);    // DETALLE: Una peli o serie en particular con sus personajes.
//router.put('/:id', peliculaOSerieController.editPeliculaOSerie);
//router.delete('/:id', peliculaOSerieController.deletePeliculaOSerie)


module.exports = router;