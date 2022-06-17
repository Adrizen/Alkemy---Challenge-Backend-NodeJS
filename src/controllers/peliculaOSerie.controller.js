const PeliculaOSerie = require('../models/PeliculaOSerie');
const Genero = require('../models/Genero');
const Personaje = require('../models/Personaje');

// Dependiendo de si hay query o no, se devuelven todos las peliculas/series (no hay query) o se filtan (hay query)
function getPeliculaOSerieManager(req, res) {
    if (JSON.stringify(req.query) === "{}") {
        getTodasLasPeliculasOSeries(req, res);
    } else {
        getPeliculasOSeriesFiltradas(req, res);
    }
}

// Obtener todos las peliculas o series y mostrar sus imagen, titulo y fecha de creación.
async function getTodasLasPeliculasOSeries(req, res) {
    try {
        const peliculasOSeries = await PeliculaOSerie.findAll({
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

// Obtener todos las peliculas o series y luego filtrarlas de acuerdo al req.query.
// Esto sería mucho más simple si no hubiera agregado la posibilidad de combinar filtros.
async function getPeliculasOSeriesFiltradas(req, res) {
    try {
        let ordenarPorFecha = false;    // Si en el for de abajo se vuelve true, entonces hay que ordenar x fecha de creación antes de devolver el json (ASC o DES).
        let ordenFechaDeCreacion;
        const filtros = req.query;
        const peliculasOSeriesTotales = await PeliculaOSerie.findAll({
            raw: true,
        });
        let peliculasOSeriesFiltradas = peliculasOSeriesTotales.filter(pos => {
            let esValido = true;    // Al aplicar todos los filtros del for de abajo, siempre debe ser true. Para cumplir todas las condiciones.
            for (key in filtros) {
                if (key == "order") {    // Si alguna key es 'order' entonces hay que ordenar las películas/series x fecha de creación.
                    ordenarPorFecha = true;
                    ordenFechaDeCreacion = filtros[key];
                } else {
                    esValido = esValido && pos[key] == filtros[key];
                }
                //console.log(key, "POS[key]:", pos[key], "Filtros[key]:", filtros[key]);
            }
            return esValido;    // Si esto resulta true, entonces 'pj' cumplió con todos los filtros propuestos.
        });

        // Si ordenarPorFecha es true, entonces se ordena de manera ascendente o descendente: depende de 'ordenFechaDeCreacion'
        if (ordenarPorFecha) {
            if (ordenFechaDeCreacion === "ASC") {    // Si es true, el órden es ASCendiente.
                peliculasOSeriesFiltradas = peliculasOSeriesFiltradas.sort((a, b) => {
                    return new Date(a.fechaDeCreacion).getTime() - new Date(b.fechaDeCreacion).getTime();  // ASCendiente.
                });
            } else {    // Si es falso, el órden es DESCendiente.
                peliculasOSeriesFiltradas = peliculasOSeriesFiltradas.sort((a, b) => {
                    return new Date(b.fechaDeCreacion).getTime() - new Date(a.fechaDeCreacion).getTime();  // DESCendiente.
                });
            }
        }
        res.status(200).json({
            data: peliculasOSeriesFiltradas
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
        const peliculasOSeries = await PeliculaOSerie.findByPk(req.params.id, {
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

module.exports = {  // TODO: Yet to implement
    //newPeliculaOSerie,
    getPeliculaOSerieManager,
    getDetallePeliculaOSerie,
    //editPeliculaOSerie,
    //deletePeliculaOSerie
}