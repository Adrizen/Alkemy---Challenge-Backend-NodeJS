const Router = require('express');
const router = Router();

const peliculaOSerieController = require('../controllers/peliculaOSerie.controller');

// /api/movies 
router.post('/', peliculaOSerieController.newPeliculaOSerie);   // Crear una nueva película/serie.
router.get('/', peliculaOSerieController.getPeliculaOSerieManager); // Obtener todos los personajes o algunas según un filtro de req.query.
router.get('/:id', peliculaOSerieController.getDetallePeliculaOSerie);    // DETALLE: Una peli o serie en particular con sus personajes.
router.put('/:id', peliculaOSerieController.editPeliculaOSerie);    // Actualizar una película o serie existente.
router.delete('/:id', peliculaOSerieController.deletePeliculaOSerie)    // Borrar una película o serie.


module.exports = router;