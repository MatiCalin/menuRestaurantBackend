
const {Schema, model} = require("mongoose");

const MenuSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    detalle: {
        type: String,
        required: true,
    },
    estado: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    categorias: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria'
    },
    imageUrl: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        default: 1
    }
    
});

module.exports = model ('Menu' , MenuSchema);