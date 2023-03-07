const Usuario = require("../model/usuarioModel");
const bcrypt = require("bcrypt")

const crearUsuario = async (req, res) => {
    const {name, email, password} = req.body;

    try {
        let usuario = await Usuario.findOne({email});

        if(usuario){
            return res.status(400).json({
                ok: false,
                msg: "Ya existe un usuario con este correo"
            })
        }
        usuario = new Usuario (req.body);

        //hacer la encriptacion de contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //aca guardo los usuarios en DB
        await usuario.save();

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            rol: usuario.rol,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contactese con el administrador"
        })
    }

    
};

const loginUsuario = async (req,res) =>{

    const {email, password} = req.body;

    try {
        const usuario = await Usuario.findOne({email});

        //validando si existe el usuario
        if(!usuario){
            return res.status(400).json({
                ok: false,
                msg: "El email o contraseña ingresados son incorrectas"
            })
        }

        //ver si las contraseñas coinciden
        const validarContraseña = bcrypt.compareSync(password, usuario.password);

        if(!validarContraseña) {
            return res.status(400).json({
                ok: false,
                msg: "El email o contraseña ingresados son incorrectas"
            })
        }

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            rol: usuario.rol,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contactese con el administrador"
        })
    }

}

module.exports = {
    crearUsuario,
    loginUsuario,
}