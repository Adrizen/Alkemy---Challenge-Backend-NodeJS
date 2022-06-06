const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token =  req.headers["x-access-token"]
    if (!token) {
        return res.status(403).send("Se requiere un token de autenticación.")
    }

    try {
        const decoded = jwt.verify(token, "secret");
        req.user = decoded;
    } catch (error) {
        return res.status(401).send(error)
    }
    return next();
}

module.exports = verifyToken;