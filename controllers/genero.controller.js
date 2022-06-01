const genero = require('../database/models/Genero');

async function getGeneros(req, res) {
    try {
        const generos = await genero.findAll();
        res.json({
            data: generos
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
    getGeneros
}