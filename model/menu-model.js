
const {Schema, model} = require("mongoose");

const MenuSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    detalle: {
        type: String,
        requiered: true,
    },
    estado: {
        type: String,
        requiered: true,
    },
    precio: {
        type: String,
        requiered: true,
    },
    categoria: {
        type: String,
        requiered: true,
    },
    imageUrl: {
        type: String,
        requiered: true,
    }
    
});

module.exports = model ('Menu' , MenuSchema);