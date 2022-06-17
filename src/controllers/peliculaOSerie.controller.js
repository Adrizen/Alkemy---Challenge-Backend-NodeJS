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

// Crear una nueva película o serie.
async function newPeliculaOSerie(req, res) {
    try {
        const { imagen, titulo, fechaDeCreacion, calificacion, generoId } = req.body;
        const peliculaOSerieNueva = await PeliculaOSerie.create({
            imagen,
            titulo,
            fechaDeCreacion,
            calificacion,
            generoId
        });
        if (peliculaOSerieNueva) {
            res.status(201).json({
                "message": "Pelicula/Serie creada con éxito",
                "data": peliculaOSerieNueva
            })
        }
    } catch (error) {
        console.log(error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(409).json({
                "message": 'Esa pelicula/serie ya existe.',
                "data": {}
            });
        } else {
            res.status(500).json({
                "message": 'Algo salió mal.',
                "data": {}
            });
        }
    }
}

// Editar una película o serie dado un id pasado por parámetro.
async function editPeliculaOSerie(req, res) {
    try {
        const idPeliculaOSerie = req.params.id;
        const { imagen, fechaDeCreacion, calificacion, generoId } = req.body;
        PeliculaOSerie.update({ // Esto devuelve un arreglo con la cantidad de filas actualizadas.
            imagen: imagen,
            fechaDeCreacion: fechaDeCreacion,
            calificacion: calificacion,
            generoId: generoId
        }, {
            where: { id: idPeliculaOSerie }
        }).then(async filasActualizadas => {

            // Si al menos una fila se actualizó, entonces tuve éxito.
            if (filasActualizadas[0] > 0) {
                let peliculaOSerie = await PeliculaOSerie.findByPk(idPeliculaOSerie);
                res.status(200).json({
                    "message": "Pelicula/Serie actualizada con éxito.",
                    "data": peliculaOSerie
                });
            } else {
                res.status(409).json({
                    "message": "No se pudo actualizar la película/serie",
                    "data": {}
                });
            }
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            "message": 'Algo salió mal.',
            "data": {}
        });
    }
}

// Borrar una película o serie.
async function deletePeliculaOSerie(req, res) {
    try {
        const idPeliculaOSerie = req.params.id;
        PeliculaOSerie.destroy({
            where: { id: idPeliculaOSerie }
        }).then(filasBorradas => {
            console.log(filasBorradas)
            if (filasBorradas > 0) {
                res.status(200).json({
                    "message": "Película/serie borrada con éxito.",
                    "data": {
                        id: idPeliculaOSerie
                    }
                });
            } else {
                res.status(409).json({
                    "message": "No se pudo borrar la película/serie",
                    "data": {
                        id: idPeliculaOSerie
                    }
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            "message": 'Algo salió mal.',
            "data": {}
        });
    }
}

module.exports = {
    newPeliculaOSerie,
    getPeliculaOSerieManager,
    getDetallePeliculaOSerie,
    editPeliculaOSerie,
    deletePeliculaOSerie
}