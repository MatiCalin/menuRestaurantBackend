const express = require("express");
const { check } = require("express-validator");
const { crearUsuario, loginUsuario } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validarCampos");
const routerAuth = express.Router();


//creo mi sistema de rutas (una para registro y otra para login)

routerAuth.post(
    "/new", 
    [
        check ("name","el nombre es obligatorio").not().isEmpty(),
        check ("email","el email es obligatorio").not().isEmpty().isEmail(),
        check ("password","la contraseña debe ser mayor a 5 caracteres").isLength({
            min: 5,
        }),

        validarCampos,
    ],
    crearUsuario
); //ruta para el registro de usuario

routerAuth.post("/",
    [
        check ("email","el email es obligatorio").not().isEmpty().isEmail(),
        check ("password","debes ingresar tu contraseña").not().isEmpty(),

        validarCampos,
    ] 
    
    ,loginUsuario); //ruta para login de usuario

module.exports = routerAuth;