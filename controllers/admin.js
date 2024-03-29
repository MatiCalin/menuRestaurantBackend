const Menu = require ('../model/menu-model');
const Usuario = require('../model/usuarioModel');
const Categoria = require('../model/categoriaModel');
const Pedido = require('../model/pedidosModel');



const actualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const { active } = req.body;
  
    try {
      const updatedUser = await Usuario.findByIdAndUpdate(
        id,
        { active },
        { new: true }
      );
  
      res.json(updatedUser);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Hubo un error al actualizar el usuario" });
    }
  };

const cargarCategorias = async (req,res) => {
    try {
        const categorias = await Categoria.find();
        res.status(200).json({
            ok: true,
            categorias,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Comuníquese con el administrador",
        });
    }
};


const crearCategoria = async (req,res) =>{
    try {
        let categoria = new Categoria (req.body);
        await categoria.save ();
        res.status(201).json({
            ok: true,
            msg: 'Categoría creada',
            categoria,
        })

    } catch (error) {
        console.log (error)
        res.status(500).json({
            ok: true,
            msg: 'Póngase en contacto con el administrador',
        });
    }
};


const editarCategoria = async (req, res) => {
    try {
        const editCategory = await Categoria.findById(req.body._id);

        if (!editCategory) {
            return res.status(404).json({
                ok: false,
                msg: "No existe ninguna categoría con esta Id"
            });
        }
        const updateCategory = await Categoria.findByIdAndUpdate(
            req.body._id,
            req.body
        );
        res.status(200).json({
            ok:true,
            updateCategory,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Comuníquese con el administrador",
        });
    }
}


const eliminarCategoria = async (req, res) => {
    try {
        let menu = [];
        const deleteCategory = await Categoria.findById(req.params.id);
        menu = await Menu.find({});
        const menuFilter = menu.filter((menu) => menu.categorias == req.params.id);

        if(menuFilter.length > 0 ) {
            return res.status(200).json({
                ok: false,
                msg: 'No es posible eliminar la categoría ya que se encuentra relacionada a un menú'
            });
        }

        if (!deleteCategory){
            return res.status(404).json({
                ok: false,
                msg: 'No existe una categoría con esta ID'
            });
        }
        await Categoria.findByIdAndDelete(req.params.id);
        res.status(200).json ({
            ok: true,
            msg:'¡Categoría eliminada!',
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Comuníquese con el administrador",
        });
    }
}

const crearPedido = async (req,res) =>{
    try {
        const user = await Usuario.find();
        const userId = user.filter(username => username.name === req.body.usuario);

        let pedido = new Pedido ({
            "usuario": userId[0]._id,
            "fecha": req.body.fecha,
            "menus": req.body.menus,
            "estado": req.body.estado,
            "codePedido": req.body.codePedido
        });
        await pedido.save ();
        res.status(201).json({
            ok: true,
            msg: 'Pedido creado',
            pedido,
        })

    } catch (error) {
        console.log (error)
        res.status(500).json({
            ok: true,
            msg: 'Pongase en contacto con el administrador',
        });
    }
};

const cargarPedidos = async (req,res) => {
    try {
        const pedidos = await Pedido.find({}).populate("usuario", '-password -rol');
        res.status(200).json({
            ok: true,
            pedidos,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Comuníquese con el administrador",
        });
    }
};

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

const editarPedido = async (req, res) => {
    try {
        const respOrder = await Pedido.findById(req.body._id);
        if (!respOrder) {
            return res.status(404).json({
                ok: false,
                msg: "No existe ningún pedido con esta Id"
            });
        }

        const statusChange = { estado: req.body.orderFilter[0].estado}
        const updateOrder = await Pedido.findByIdAndUpdate(
            req.body._id,
            statusChange
        );

        res.status(200).json({
            ok:true,
            updateOrder,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Comuníquese con el administrador",
        });
    }
}

const eliminarPedido = async (req, res) => {
    try {
        let order = [];
        const deleteOrder = await Pedido.findById(req.params.id);

        if (!deleteOrder){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un pedido con esta ID'
            });
        }
        await Pedido.findByIdAndDelete(req.params.id);
        res.status(200).json ({
            ok: true,
            msg:'¡Pedido eliminado!',
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Comuníquese con el administrador",
        });
    }
}

const cargarMenus = async (req,res) => {
    try {
        const menus = await Menu.find({}).populate('categorias')
        res.status(200).json({
            ok: true,
            menus
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

module.exports = {
    actualizarUsuario,
    cargarCategorias,
    crearCategoria,
    editarCategoria,
    eliminarCategoria,
    crearPedido,
    cargarPedidos,
    editarPedido,
    eliminarPedido,
    crearMenu,
    cargarMenus,
    cargarUsuarios,
    verificarRol,
    verificarAdmin,
    eliminarMenu,
    editarMenu
}