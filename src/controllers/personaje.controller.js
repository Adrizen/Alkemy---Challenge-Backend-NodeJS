const Personaje = require('../models/Personaje');
const PeliculaOSerie = require('../models/PeliculaOSerie');

// Dependiendo de si hay query o no, se devuelven todos los personajes (no hay query) o se filtan (hay query)
function getPersonajesManager(req, res) {
    if (JSON.stringify(req.query) === "{}") { // Si no hay query para filtrar personajes, devolver todos los personajes.
        getTodosLosPersonajes(req, res);
    } else {    // Si hay query para filtrar personajes, entonces filtrarlos y luego devolverlos.
        getPersonajesFiltrados(req, res);
    }
}

// Obtener todos los personajes y mostrar sus 'nombre' e 'imagnen'
async function getTodosLosPersonajes(req, res) {
    try {
        const personajes = await Personaje.findAll({
            attributes: ['nombre', 'imagen'],
        });
        res.json({
            data: personajes
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            "message": 'Algo salió mal.',
            "data": {}
        })
    }
}

// Obtener todos los personajes y luego filtrarlos de acuerdo al req.query.
// Esto sería mucho más simple si no hubiera agregado la posibilidad de combinar filtros.
async function getPersonajesFiltrados(req, res) {
    try {
        const filtros = req.query;
        const personajesTotales = await Personaje.findAll({
            raw: true,
            include: {
                model: PeliculaOSerie,
                attributes: ['id', 'imagen', 'titulo'],
                through: { attributes: [] } // Esto evita que se muestren los datos de la function table 'participa'
            }
        });
        const personajesFiltrados = personajesTotales.filter(pj => {
            let esValido = true;   // Al aplicar todos los filtros del for de abajo, siempre debe ser true. Para cumplir todas las condiciones.
            for (key in filtros) {
                //console.log(key, "PJ[key]:", pj[key] , "Filtro[key]:",  filtros[key]);
                esValido = esValido && pj[key] == filtros[key];
            }
            return esValido;    // Si esto resulta true, entonces 'pj' cumplió con todos los filtros propuestos.
        })
        res.status(200).json({
            data: personajesFiltrados
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            "message": 'Algo salió mal.',
            "data": {}
        })
    }
}

// Devuelve toda la info del personaje junto con sus pelis o series.
async function getDetallePersonaje(req, res) {
    try {
        const personaje = await Personaje.findByPk(req.params.id, {
            include: PeliculaOSerie
        });
        if (personaje) {
            res.status(201).json({
                "data": personaje
            })
        } else {
            res.status(409).json({
                "message": 'Personaje no encontrado',
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

// Crear un nuevo personaje.
async function newPersonaje(req, res) {
    try {
        const { imagen, nombre, edad, peso, historia } = req.body;
        const personajeNuevo = await Personaje.create({
            imagen,
            nombre,
            edad,
            peso,
            historia
        });
        if (personajeNuevo) {
            res.status(201).json({
                "message": "Personaje creado con éxito.",
                "data": personajeNuevo
            })
        }

    }
    catch (error) {
        console.log(error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(409).json({
                "message": 'Ese personaje ya existe.',
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


// Editar un personaje dado un id pasado por parámetro.
async function editPersonaje(req, res) {
    try {
        const idPersonaje = req.params.id;
        const { imagen, edad, peso, historia } = req.body;
        Personaje.update({  // Esto devuelve un arreglo con la cantidad de filas actualizadas.
            imagen: imagen,
            edad: edad,
            peso: peso,
            historia: historia
        }, {
            where: { id: idPersonaje }
        }).then(async filasActualizadas => {

            // Si al menos una fila se actualizó, entonces tuve éxito.
            if (filasActualizadas[0] > 0) {
                let personaje = await Personaje.findByPk(idPersonaje);
                res.status(200).json({
                    "message": "Personaje actualizado con éxito.",
                    "data": personaje
                });
            } else {
                res.status(404).json({
                    "message": "No se pudo actualizar el personaje",
                    "data": {}
                });
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            "message": 'Algo salió mal.',
            "data": {}
        });
    }
}


async function deletePersonaje(req, res) {
    try {
        const idPersonaje = req.params.id;
        Personaje.destroy({
            where: { id: idPersonaje }
        }).then(filasBorradas => {
            if (filasBorradas > 0) {
                res.status(200).json({
                    "message": "Personaje borrado con éxito.",
                    "data": { 
                        id: idPersonaje
                     }
                });
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            "message": 'Algo salió mal.',
            "data": {}
        });
    }
}

module.exports = {
    getPersonajesManager,
    getDetallePersonaje,
    deletePersonaje,
    newPersonaje,
    editPersonaje
}