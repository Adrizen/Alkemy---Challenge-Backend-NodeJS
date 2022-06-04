const Router = require('express');
const router = Router();

const userController = require('../controllers/user.controller');

// Registrarse.
router.post('/register', userController.register) ;

// Loguearse.
router.post('/login', userController.login) ;

module.exports = router;