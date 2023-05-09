const express = require("express");
const { dbConection } = require("./database/config");
const app = express();
require("dotenv").config();
const cors = require ("cors");

app.use(express.json());


dbConection();


app.use(cors());

app.use(express.static("public"));

app.use("/auth", require("./routes/auth"));
app.use("/admin",require("./routes/admin"));



app.listen(process.env.PORT, ()=>{
    console.log(`servidor en puerto ${process.env.PORT}`);
})