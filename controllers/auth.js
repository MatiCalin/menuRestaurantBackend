const Usuario = require("../model/usuarioModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        const payload = {
            id: usuario._id,
            name: usuario.name,
            rol: usuario.rol,
        };

        const token = jwt.sign(payload, process.env.SECRET_JWT,{
            expiresIn: "1h",
        })

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            rol: usuario.rol,
            token,
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

        if(!usuario){
            return res.status(400).json({
                ok: false,
                msg: "El email o contraseña ingresados son incorrectas"
            })
        }

        const validarContraseña = bcrypt.compareSync(password, usuario.password);

        if(!validarContraseña) {
            return res.status(400).json({
                ok: false,
                msg: "El email o contraseña ingresados son incorrectas"
            })
        }

        if(!usuario.active){
            return res.status(401).json({
                ok: false,
                msg: 'El usuario se encuentra bloqueado. Por favor, contacte al administrador',
            });
        }

        const payload = {
            id: usuario._id,
            name: usuario.name,
            rol: usuario.rol,
        };

        const token = jwt.sign(payload, process.env.SECRET_JWT,{
            expiresIn: "1h",
        })

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            rol: usuario.rol,
            token,
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