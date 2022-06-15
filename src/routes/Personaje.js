const Router = require('express');
const router = Router();

const personajeController = require('../controllers/personaje.controller');

// /api/characters
router.post('/', personajeController.newPersonaje); // Crear un nuevo personaje.
router.get('/', personajeController.getPersonaje);   // 
router.put('/:id', personajeController.editPersonaje); // Actualizar un personaje existente.

module.exports = router;