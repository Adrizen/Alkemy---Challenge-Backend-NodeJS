const Router = require('express');
const router = Router();

const peliculaOSerieController = require('../controllers/peliculaOSerie.controller');

// /api/movies
router.get('/api/movies', peliculaOSerieController.getPeliculasOSeries);

module.exports = router;