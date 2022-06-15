const Personaje = require('../models/Personaje');
const PeliculaOSerie = require('../models/PeliculaOSerie')

// Dependiendo de si hay query o no, se devuelven todos los personajes (no hay query) o se filtan (hay query)
function getPersonajesManager(req, res){
    console.log(req.query)
    if (JSON.stringify(req.query) === "{}"){ // Si no hay query para filtrar personajes, devolver todos los personajes.
        getTodosLosPersonajes(req, res);
    } else {    // Si hay query para filtrar personajes, entonces filtrarlos y luego devolverlos.
        getPersonajesFiltrados(req, res);
    }
}

// Obtener todos los personajes.
async function getTodosLosPersonajes(req, res) {
    try {
        const personajes = await Personaje.findAll({
            include: {
                model: PeliculaOSerie,
                attributes: { exclude: 'participa' }
            },
            attributes: ['nombre', 'imagen']
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

async function getPersonajesFiltrados(req, res) {
    try {
        const filtros = req.query;
        if (filtros == null){
            getPersonajes(req, res);
        }
        const personajesTotales = await Personaje.findAll({ raw: true });
        const personajesFiltrados = personajesTotales.filter(pj => {
            let esValido = true;   // Al aplicar todos los filtros del for de abajo, siempre debe ser true. Para cumplir todas las condiciones.
            for (key in filtros) {
                //console.log(key, "PJ.key:", pj[key] , "Filtro[key]:",  filtros[key]);
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
        })
        if (personajeNuevo) {
            res.status(201).json({
                "message": "Personaje creado con éxito.",
                "data": personajeNuevo
            })
        }

    }
    catch (error) {
        console.log(error);
        if (error.name === 'SequelizeUniqueConstraintError') {  // Habrá una mejor forma de hacer esto?
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


// Editar un personaje.
async function editPersonaje(req, res) {
    try {
        const id = req.body.id;
        const { imagen, nombre, edad, peso, historia } = req.body;
        const body = req.body;
        Personaje.updateOne({ id }, body)

    } catch (error) {

    }
}


module.exports = {
    getPersonajesManager,
    newPersonaje,
    editPersonaje
}