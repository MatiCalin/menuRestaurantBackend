const express = require("express");
const { dbConection } = require("./database/config");
const app = express();
require("dotenv").config();
const cors = require ("cors");

//lectura y parseo del body
app.use(express.json());

//iniciar DB
dbConection();

//cors
app.use(cors());

//directorio publico
app.use(express.static("public"));

app.use("/auth", require("./routes/auth"));
app.use("/admin",require("./routes/admin"));

//llamar servidor

app.listen(process.env.PORT, ()=>{
    console.log(`servidor en puerto ${process.env.PORT}`);
})