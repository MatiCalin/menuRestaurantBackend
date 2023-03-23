const express = require("express");
const { check } = require("express-validator");
const { crearMenu, cargarMenus, cargarUsuarios, } = require("../controllers/admin");
const { validarCampos } = require("../middlewares/validarCampos");
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

routerAdmin.get ('/Menus', cargarMenus);
routerAdmin.get ('/Usuarios', cargarUsuarios);





module.exports = routerAdmin;