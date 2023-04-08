const { Schema, model } = require("mongoose");

const PedidosSchema = Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    fecha: {
        type : Date,
        default: Date.now
    },
    menus: {
        type: Schema.Types.Array,
        ref: 'Menu'
    },
    estado: {
        type: String,
        required: true,
    },
    codePedido: {
        type: String,
        required: true,
    },
});

module.exports = model ('Pedidos' , PedidosSchema);