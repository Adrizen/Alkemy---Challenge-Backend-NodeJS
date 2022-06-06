const peliculaOSerie = require('../models/PeliculaOSerie');

async function getPeliculasOSeries(req, res) {
    try {
        const peliculasOSeries = await peliculaOSerie.findAll();
        res.json({
            data: peliculasOSeries
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
    getPeliculasOSeries
}