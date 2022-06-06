const Router = require('express');
const router = Router();

const generoController = require('../controllers/genero.controller');

// /api/generos
router.get('/', generoController.getGeneros) ;

module.exports = router;