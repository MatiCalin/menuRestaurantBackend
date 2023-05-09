const express = require("express");
const { check } = require("express-validator");
const { crearUsuario, loginUsuario } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validarCampos");
const routerAuth = express.Router();
const { verificarEstado} = require("../middlewares/verificarEstado");


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
); 

routerAuth.post("/",
    [
        check ("email","el email es obligatorio").not().isEmpty().isEmail(),
        check ("password","debes ingresar tu contraseña").not().isEmpty(),

        validarCampos, verificarEstado,
    ] 
    
    ,loginUsuario); 
    

module.exports = routerAuth;