const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function register(req, res) {
    try {
        // Obtener input.
        const { nombre, email, password } = req.body;
        // Validar input del usuario.
        if (!(email && password && nombre )){
            res.status(400).send("Se requiere rellenar todos los campos: nombre, mail y password");
        }

        // Checkear si el usuario ya existe.
        const oldUser = await User.findOne({ where: { email: email } });
        if (oldUser){
            return res.status(409).send("Este email ya está registrado.")
        }

        // Encriptar la contraseña del usuario.
        encryptedPassword = await bcrypt.hash(password, 10);

        // Crear el usuario en la DB.
        const user = await User.create({
            nombre,
            email: email.toLowerCase(), // Convertir el mail a minúsculas.
            password: encryptedPassword
        });

        // Crear token.
        const token = jwt.sign({ user_id: user.id, email }, "secret", { expiresIn: "10h" });
        // Guardar token.
        user.token = token;
        // Devolver nuevo usuario.
        res.status(201).json({
            "user": user,
            "token": token
        })

    } catch (err) {
        console.log(err);
    }
}

async function login(req, res) {
    try {
        // Obtener input.
        const { email, password } = req.body;

        // Validar input.
        if (!(email && password)){
            res.status(400).send("Se requiere rellenar todos los campos: email y password.")
        }

        // Validar si el usuario existe en la DB.
        const user = await User.findOne({ where: { email: email } });

        if (user && (await bcrypt.compare(password, user.password))){

            // Crear token.
            const token = jwt.sign({ user_id: user.id, email }, "secret", { expiresIn: "10h" });

            // Guardar token.
            user.token = token;

            // Devolver user.
            res.status(201).json({
                "user": user,
                "token": token
            })
        } else {
            res.status(400).send("Credenciales inválidas.")
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    register,
    login
}