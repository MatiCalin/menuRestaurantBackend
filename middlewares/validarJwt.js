const express = require ("express");
const jwt = require ("jsonwebtoken");

const validarJWT = (req, res, next) =>{
    const token = req.header("x-token");

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: "No hay token en la peticion",
        })
    }

    try {
        const payload = jwt.verify(token, process.env.SECRET_JWT)
        req.rol = payload.rol;
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "token no valido",
        })
    }

    next();
}

module.exports = {
    validarJWT,
}