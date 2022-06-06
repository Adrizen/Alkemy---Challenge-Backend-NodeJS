const Personaje = require('../models/Personaje');

async function getPersonajes(req, res) {
    try {
        const personajes = await Personaje.findAll();
        res.json({
            data: personajes
        });
    } catch (error) {
        console.log(err)
        res.status(500).json({
            "message": 'Algo salió mal.',
            "data": {}
        })
    }
}

module.exports = {
    getPersonajes
}