const express = require("express");
const { check } = require("express-validator");
const {
    crearCategoria,
    cargarCategorias,
    crearPedido,
    cargarPedidos,
    crearMenu,
    cargarMenus,
    cargarUsuarios,
    verificarRol,
    verificarAdmin,
    eliminarMenu,
    editarMenu } = require("../controllers/admin");
const { validarCampos } = require("../middlewares/validarCampos");
const { validarJWT } = require("../middlewares/validarJwt");
const { validarJWTAdmin } = require("../middlewares/validarJwtAdmin");
const {Schema} = require("mongoose");
const routerAdmin = express.Router();

routerAdmin.post ("/categoriaNew",
    [
        //validarJWT,
        check ("nombre","El nombre es obligatorio").not().isEmpty(),
        check ("estado","El estado es obligatoria").not().isEmpty(),
        validarCampos
    ],
    crearCategoria
);

routerAdmin.post ("/pedidoNew", crearPedido);

routerAdmin.post ("/new", 
[   
    validarJWT,
    check ("nombre","el nombre es obligatorio").not().isEmpty(),
    check ("detalle","el detalle es obligatorio").not().isEmpty(),
    check ("estado","el estado es obligatoria").not().isEmpty(),
    check ("precio","el precio es obligatoria").not().isEmpty(),
    check ("categorias","la categoria es obligatoria").not().isEmpty(),
    check ("imageUrl","la url de la imagen es obligatoria").not().isEmpty(),
    validarCampos
],
crearMenu
);

routerAdmin.get('/Categorias', validarJWT, cargarCategorias);
routerAdmin.get('/Pedidos', validarJWT, cargarPedidos);
routerAdmin.get('/Menus', validarJWT, cargarMenus);
routerAdmin.get('/Usuarios',validarJWTAdmin ,cargarUsuarios);

routerAdmin.get("/nav", validarJWT ,verificarRol);
routerAdmin.get("/verificar", validarJWTAdmin ,verificarAdmin);

routerAdmin.delete("/eliminar/:id", validarJWT, eliminarMenu);
routerAdmin.put("/editar",validarJWT, editarMenu);





module.exports = routerAdmin;