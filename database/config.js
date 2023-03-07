const mongoose = require("mongoose")

const dbConection = async() =>{
    try {
        await mongoose.connect(process.env.DB_CNN)
        console.log("db conectado");
    } catch (error) {
        console.log(error);
        throw new Error("no se pudo iniciar la base de datos")
    }
}

module.exports = { dbConection };