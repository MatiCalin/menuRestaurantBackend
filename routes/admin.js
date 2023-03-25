const express = require("express");
const { check } = require("express-validator");
const { crearMenu, cargarMenus, cargarUsuarios, verificarRol, verificarAdmin, } = require("../controllers/admin");
const { validarCampos } = require("../middlewares/validarCampos");
const { validarJWT } = require("../middlewares/validarJwt");
const { validarJWTAdmin } = require("../middlewares/validarJwtAdmin");
const routerAdmin = express.Router();

routerAdmin.post ("/new", 
[
    check ("name","el nombre es obligatorio").not().isEmpty(),
    check ("precio","el precio es obligatorio").not().isEmpty(),
    check ("cantidad","la cantidad es obligatoria").not().isEmpty(),
    check ("descripcion","la descripcion es obligatoria").not().isEmpty(),


    
    validarCampos
],
crearMenu
);

routerAdmin.get('/Menus', cargarMenus);
routerAdmin.get('/Usuarios',validarJWTAdmin ,cargarUsuarios);

routerAdmin.get("/nav", validarJWT ,verificarRol);
routerAdmin.get("/verificar", validarJWTAdmin ,verificarAdmin);





module.exports = routerAdmin;