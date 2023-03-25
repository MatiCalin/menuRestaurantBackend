const express = require ("express");
const jwt = require ("jsonwebtoken");

const validarJWTAdmin = (req, res, next) =>{
    const token = req.header("x-token");

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: "No hay token en la peticion",
        })
    }

    try {
        const payload = jwt.verify(token, process.env.SECRET_JWT);
        if (payload.rol === "usuario"){
            return res.status(404).json({
                ok: false,
                msg: "usuario no tiene rol de admin",
            });
        }
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "token no valido",
        })
    }

    next();
}

module.exports = {
    validarJWTAdmin,
}