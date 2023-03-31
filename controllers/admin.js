const Menu = require ('../model/menu-model');
const Usuario = require('../model/usuarioModel');
const crearMenu = async (req,res) =>{
    try {
       let menu = new Menu (req.body);
       await menu.save ();
       res.status(201).json({
            ok: true,
            msg: 'Menu creado',
            menu,
       })

    } catch (error) {
        console.log (error)
        res.status(500).json({
            ok: true,
            msg: 'Pongase en contacto con el administrador',
    
        });
    }


};

const cargarMenus = async (req,res) => {
    try {
        const menus = await Menu.find()
        res.status(200).json({
            ok: true,
            menus,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Comuniquese con el administrador",
        });
    }
};
const cargarUsuarios = async(req, res) => {
    try {
        const Usuarios = await Usuario.find();
        res.status(200).json({
            ok: true,
            Usuarios,
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Comuniquese con el administrador",
        });
    }
};

const verificarRol = async(req, res) => {
    try {
        res.status(200).json({
            ok: true,
            rol: req.rol,
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Comuniquese con el administrador",
        });
    }
};

const verificarAdmin = async(req, res) => {
    try {
        res.status(200).json({
            ok: true,
            
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Comuniquese con el administrador",
        });
    }
};

const eliminarMenu =async (req,res) => {
    try {
        const menuEliminar = await Menu.findById(req.params.id)
            if (!menuEliminar){
                return res.status(404).json({
                    ok: false,
                    msg: 'No existe un Menu con esta ID'
                });              
            }
        await Menu.findByIdAndDelete(req.params.id);
            res.status(200).json ({
                ok: true,
                msg:'menu eliminado',
            });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Comuniquese con el administrador",
        });
    }
};



const editarMenu = async(req,res) =>{
    try {
        const menuEditar = await Menu.findById(req.body._id);
        if (!menuEditar) {
            return res.status(404).json({
                ok: false,
                msg: "No existe ningun producto con esta Id"
            });
        }
     const menuActualizado = await Menu.findByIdAndUpdate(
        req.body._id,
        req.body
     );
     res.status(200).json({
        ok:true,
        menuActualizado,
     });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Comuniquese con el administrador",
        });
        
    }

}
module.exports = {crearMenu, cargarMenus, cargarUsuarios, verificarRol, verificarAdmin, eliminarMenu, editarMenu}