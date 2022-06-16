const Router = require('express');
const router = Router();

const personajeController = require('../controllers/personaje.controller');

// /api/characters
router.post('/', personajeController.newPersonaje); // Crear un nuevo personaje.
router.get('/', personajeController.getPersonajesManager);   // Obtener todos los personajes o algunas según un filtro de req.query.
router.get('/:id', personajeController.getDetallePersonaje);   // DETALLE: Un personaje con todos sus atributos y sus pelis o series.
router.put('/:id', personajeController.editPersonaje); // Actualizar un personaje existente.
router.delete('/:id', personajeController.deletePersonaje); // Borrar un personaje.

module.exports = router;