const Router = require('express');
const router = Router();

const personajeController = require('../controllers/personaje.controller');

// /api/characters
router.get('/', personajeController.getPersonajes);

module.exports = router;