
const {Schema, model} = require("mongoose");

const MenuSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    precio: {
        type: String,
        requiered: true,
    },
    cantidad: {
        type: String,
        requiered: true,
    },
    descripcion: {
        type: String,
        requiered: true,
    }
    
});

module.exports = model ('Menu' , MenuSchema);