const peliculaOSerie = require('../models/PeliculaOSerie');
const Genero = require('../models/Genero');
const Personaje = require('../models/Personaje');

async function getPeliculasOSeries(req, res) {
    try {
        const peliculasOSeries = await peliculaOSerie.findAll({
            attributes: ['imagen', 'titulo', 'fechaDeCreacion']
        });
        res.json({
            data: peliculasOSeries
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            "message": 'Algo salió mal.',
            "data": {}
        })
    }
}

// Devuelve toda la info de la peliOSerie junto con sus personajes.
async function getDetallePeliculaOSerie(req, res) {
    try {
        const peliculasOSeries = await peliculaOSerie.findByPk(req.params.id, {
            include: Personaje,
        });
        if (peliculasOSeries) {
            res.status(201).json({
                "data": peliculasOSeries
            })
        } else {
            res.status(409).json({
                "message": 'Pelicula o serie no encontrada',
                "data": {}
            });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            "message": 'Algo salió mal.',
            "data": {}
        })
    }
}

module.exports = {
    getPeliculasOSeries,
    getDetallePeliculaOSerie
}